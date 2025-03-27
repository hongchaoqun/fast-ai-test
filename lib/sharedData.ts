import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
import { NeonPostgres } from "@langchain/community/vectorstores/neon";

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
