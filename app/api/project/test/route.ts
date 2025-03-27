import { NextResponse } from 'next/server';

import { NeonPostgres } from "@langchain/community/vectorstores/neon";
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
import { getSharedData } from '../database/route';
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { HumanMessage } from "@langchain/core/messages";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { Annotation, StateGraph } from "@langchain/langgraph";


export async function GET(req: Request){

    // 文档嵌入
    const embeddings = new AlibabaTongyiEmbeddings({});

    // // Initialize a NeonPostgres instance to store embedding vectors
    // const vectorStore = await NeonPostgres.initialize(embeddings, {
    //     connectionString: process.env.DATABASE_URL as string,
    // });
    
    // // You can add documents to the store, strings in the `pageContent` field will be embedded
    // // and stored in the database
    // const documents = [
    //     { pageContent: "Hello world", metadata: { topic: "greeting" } },
    //     { pageContent: "Bye bye", metadata: { topic: "greeting" } },
    //     {
    //     pageContent: "Mitochondria is the powerhouse of the cell",
    //     metadata: { topic: "science" },
    //     },
    // ];
    // const idsInserted = await vectorStore.addDocuments(documents);
    
    // // You can now query the store for similar documents to the input query
    // const resultOne = await vectorStore.similaritySearch("hola", 1);
    // console.log(resultOne);
    // /*
    // [
    //     Document {
    //     pageContent: 'Hello world',
    //     metadata: { topic: 'greeting' }
    //     }
    // ]
    // */
    
    // // You can also filter by metadata
    // const resultTwo = await vectorStore.similaritySearch("Irrelevant query", 2, {
    //     topic: "science",
    // });
    // console.log(resultTwo);
    // /*
    // [
    //     Document {
    //     pageContent: 'Mitochondria is the powerhouse of the cell',
    //     metadata: { topic: 'science' }
    //     }
    // ]
    // */
    
    // // Metadata filtering with IN-filters works as well
    // const resultsThree = await vectorStore.similaritySearch("Irrelevant query", 2, {
    //     topic: { in: ["greeting"] },
    // });
    // console.log(resultsThree);
    // /*
    // [
    //     Document { pageContent: 'Bye bye', metadata: { topic: 'greeting' } },
    //     Document {
    //     pageContent: 'Hello world',
    //     metadata: { topic: 'greeting' }
    //     }
    // ]
    // */
    
    // // Upserting is supported as well
    // await vectorStore.addDocuments(
    //     [
    //     {
    //         pageContent: "ATP is the powerhouse of the cell",
    //         metadata: { topic: "science" },
    //     },
    //     ],
    //     { ids: [idsInserted[2]] }
    // );
    
    // const resultsFour = await vectorStore.similaritySearch(
    //     "powerhouse of the cell",
    //     1
    // );
    // console.log(resultsFour);


    

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
        temperature: 1,
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
   
       let inputs = { question: "请参考文档帮我模拟生成/admin-api/system/user/profile/update这个接口的请求参数，并返回json格式" };
   
       const result = await graph.invoke(inputs);
       console.log(result.answer);
    


    
    const data = {
        success: true,
    }
    return NextResponse.json(data);
}