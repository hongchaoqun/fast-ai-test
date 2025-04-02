import { NextResponse } from 'next/server';
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
import { NeonPostgres } from "@langchain/community/vectorstores/neon";

import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { Annotation, StateGraph } from "@langchain/langgraph";
// import { vectorStore } from '../../../../middleware'; // 导入中间件中的 
import fs from 'fs';
import path from 'path';
import axios from 'axios';

let vectorStore: NeonPostgres | null = null;

export async function getSharedData() {
  if (!vectorStore) {
      // 初始化 vectorStore
    try {
        const embeddings = new AlibabaTongyiEmbeddings({});
        vectorStore = await NeonPostgres.initialize(embeddings, {
        connectionString: process.env.DATABASE_URL as string,
        });

        console.log('VectorStore initialized');
    } catch (error) {
        console.error('Failed to initialize VectorStore:', error);
    }
  }
  return vectorStore;
}

export async function POST(req: Request) {

    // 返回到页面
    const body = await req.json();
    console.log(" body 文件路径", body.filePath);
    const filePath = body.filePath;
    if(!filePath) {
        return new Response("请上传文件", { status: 400 });
    }

    vectorStore = await getSharedData();
    if(vectorStore){
        console.log("vectorStore");
    }else{
        console.log("vectorStore is null");
    }

  // 定义本地文件路径
  const localFilePath = path.join(process.cwd(), 'temp', path.basename(filePath));

  try {
    // 创建临时目录（如果不存在）
    const tempDir = path.dirname(localFilePath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // 使用 axios 下载文件
    const response = await axios.get(filePath, {
      responseType: 'stream', // 以流的形式接收文件
    });

    // 将文件流写入本地文件
    await new Promise((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(localFilePath))
        .on('finish', resolve)
        .on('error', reject);
    });

    console.log("文件已下载到:", localFilePath);

    // 示例：加载文件内容
    // const fileContent = fs.readFileSync(localFilePath, 'utf-8');
    // console.log("文件内容:", fileContent);

    
    // 文档加载
    const loader = new JSONLoader(localFilePath);
    const docs = await loader.load();
    console.log("文档加载");

    // 文档拆分
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const allSplits = await splitter.splitDocuments(docs);
    console.log("文档拆分");
    console.log(`Split blog post into ${allSplits.length} sub-documents.`);
    

    // 文档嵌入
    // const vectorStore = new MemoryVectorStore(embeddings);
    if(vectorStore){
        await vectorStore.addDocuments(allSplits);
        console.log("文档嵌入成功");
        // 成功后处理数据，把enabled设置为true


          // Define prompt for question-answering
    const promptTemplate = await pull<ChatPromptTemplate>("rlm/rag-prompt");

    // Define state for application
    const InputStateAnnotation = Annotation.Root({
        question: Annotation<string>,
    });

    const StateAnnotation = Annotation.Root({
        question: Annotation<string>,
        context: Annotation<Document[]>,
        answer: Annotation<string>,
    });
   
    // Define application steps
    const retrieve = async (state: typeof InputStateAnnotation.State) => {
        if(vectorStore){
            const retrievedDocs = await vectorStore.similaritySearch(state.question)
            return { context: retrievedDocs };
        }
        return { context: null };
    };

    const qwenTurbo = new ChatAlibabaTongyi({
        model: "qwen-plus", // Available models: qwen-turbo, qwen-plus, qwen-max
        temperature: 0,
        alibabaApiKey: process.env.ALIBABA_API_KEY, // In Node.js defaults to process.env.ALIBABA_API_KEY
    });
   
   
    const generate = async (state: typeof StateAnnotation.State) => {
        const docsContent = state.context.map(doc => doc.pageContent).join("\n");
        const messages = await promptTemplate.invoke({ question: state.question, context: docsContent });
        const response = await qwenTurbo.invoke(messages);
        return { answer: response.content };
    };

   
    // Compile application and test
    const graph = new StateGraph(StateAnnotation)
    .addNode("retrieve", retrieve)
    .addNode("generate", generate)
    .addEdge("__start__", "retrieve")
    .addEdge("retrieve", "generate")
    .addEdge("generate", "__end__")
    .compile();

    // let inputs = { question: `请参考文档帮我模拟生成/admin-api/system/user/profile/update这个接口的请求参数，并返回json格式`};
    let inputs = { question: `请参考文档帮我模拟生成/public/test/create这个接口的请求参数,根据/public/test/create 接口的请求参数requestBody生成我要的结果，并返回json格式`};
    // let inputs = { question: `请从知识库中帮我获取一个接口的请求的参数，接口路径为${body.path}，并返回json格式`};

    const result = await graph.invoke(inputs);
    console.log(result.answer);



    }else{
        console.log("vectorStore is null");
        return new NextResponse('vectorStore is null，文档嵌入失败', { status: 500 });
    }

  } catch (error) {
    console.error('文件处理失败:', error);
    return new NextResponse('文件处理失败', { status: 500 });
  } finally {
    // 删除文件
    // if (fs.existsSync(localFilePath)) {
    //   fs.unlinkSync(localFilePath);
    //   console.log("文件已删除:", localFilePath);
    // }
  }

  const data = {
    filePath: body.filePath,
    success: true,
  }

  return NextResponse.json(data);
}
