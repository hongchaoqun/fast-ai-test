// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { NeonPostgres } from "@langchain/community/vectorstores/neon";
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RedisVectorStore } from "@langchain/redis";

import { createClient } from "redis";



export async function middleware(req: NextRequest, res: NextResponse) {

  // // 如果 vectorStore 已经初始化，直接返回
  // if (global.vectorStore) {
  //   console.log("vectorStore 已经初始化");
  //   return NextResponse.next();
  // }

  // // 初始化 vectorStore
  // try {
  //   const embeddings = new AlibabaTongyiEmbeddings({});
  //   global.vectorStore = await NeonPostgres.initialize(embeddings, {
  //     connectionString: process.env.DATABASE_URL as string,
  //   });

  //   console.log('VectorStore initialized');
  // } catch (error) {
  //   console.error('Failed to initialize VectorStore:', error);
  //   return new NextResponse('Internal Server Error', { status: 500 });
  // }

  // 继续处理请求
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // 只对 API 路由生效
};

// 导出 vectorStore
// export { vectorStore };