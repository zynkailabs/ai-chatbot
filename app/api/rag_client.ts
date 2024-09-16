import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'

interface Match {
    score: number;
    metadata: {
      text?: string;
    };
  }


class RAGClient {
    private pc_client: Pinecone
    private index: any // Use the correct type from Pinecone if available
    private openai: OpenAI

    constructor(indexName: string) {
        this.pc_client = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY as string
        })
        this.index = this.pc_client.index(indexName)
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || ''
        })
    }

    async getNearestNeighborsText(
        query_emb: number[],
        k: number,
        similarity_threshold: number = 0.3
    ): Promise<string> {
        try {
            const queryResponse = await this.index.query({
                vector: query_emb,
                topK: k,
                includeMetadata: true
            })
            console.log('Query Response:', queryResponse)
            const text_context: string[] = queryResponse.matches
            .filter(
                (match: Match) => match.score >= similarity_threshold
            )
            .map(
                (match: Match) => match.metadata.text
            )
            return text_context.join('\n\n')
        } catch (error) {
            console.error('Error in get_nearest_neighbors:', error)
            throw error
        }
    }

    async getQueryEmb(
        query: string,
        model: string = 'text-embedding-3-small'
    ): Promise<number[]> {
        try {
            const embedding = await this.openai.embeddings.create({
                model: model,
                input: query,
                encoding_format: 'float'
            })
            console.log('OpenAI Embedding Response:', embedding)
            return embedding.data[0].embedding
        } catch (error) {
            console.error('Error in get_query_emb:', error)
            throw error
        }
    }

    async fetchRAGContext(query: string, k: number = 3, similarity_threshold: number = 0.3): Promise<string> {
        try {
            const embedding = await this.getQueryEmb(query)
            const rag_context = await this.getNearestNeighborsText(embedding, k)
            console.log('RAG Context:', rag_context)
            return rag_context
        } catch (error) {
            console.error('Error in RAG pipeline:', error)
            throw error
        }
    }
}

export default RAGClient
