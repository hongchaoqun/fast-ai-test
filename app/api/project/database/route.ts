import { NextResponse } from 'next/server';
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { HumanMessage } from "@langchain/core/messages";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { NeonPostgres } from "@langchain/community/vectorstores/neon";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { vectorStore } from '../../../../middleware'; // 导入中间件中的 

import https from 'https';
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
    console.log(body.filePath);
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
    const fileContent = fs.readFileSync(localFilePath, 'utf-8');
    // console.log("文件内容:", fileContent);

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


    // // 文档加载
    // const loader = new JSONLoader("D:\\knowledge\\system.openapi.json");
    // const docs = await loader.load();
    // console.log("文档加载");
    // console.log(docs);

    // // 文档拆分
    // const splitter = new RecursiveCharacterTextSplitter({
    //     chunkSize: 1000,
    //     chunkOverlap: 200,
    // });
    // const allSplits = await splitter.splitDocuments(docs);
    // console.log("文档拆分");
    // console.log(`Split blog post into ${allSplits.length} sub-documents.`);
    

    // // 文档嵌入
    // const embeddings = new AlibabaTongyiEmbeddings({});
    // // const vectorStore = new MemoryVectorStore(embeddings);
    // if(vectorStore){
    //     await vectorStore.addDocuments(allSplits);
    // }else{
    //     console.log("vectorStore is null");
    //     return new NextResponse('vectorStore is null，文档嵌入失败', { status: 500 });
    // }


  const data = {
    filePath: body.filePath,
    success: true,
  }

  return NextResponse.json(data);
}
