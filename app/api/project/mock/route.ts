import { NextResponse } from "next/server";
import { getSharedData } from '../database/route';
import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { Annotation, StateGraph } from "@langchain/langgraph";


export async function POST(req: Request) {
    // 返回到页面
    const body = await req.json();
    console.log(" body 接口路径", body.path);

    const vectorStore = await getSharedData();
    if(vectorStore){
        console.log("vectorStore");
        console.log("这里。。。。。。。。。。。。。。。。。。。。。");
    }else{
        console.log("vectorStore is null");
    }

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
    let inputs = { question: `请参考文档帮我模拟生成${body.path}这个接口的请求参数，并返回json格式`};
    // let inputs = { question: `请从知识库中帮我获取一个接口的请求的参数，接口路径为${body.path}，并返回json格式`};

    const result = await graph.invoke(inputs);
    console.log(result.answer);

    const data = {
        filePath: result.answer,
        success: true,
    }
    
    return NextResponse.json(data);
}