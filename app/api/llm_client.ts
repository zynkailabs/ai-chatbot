import { OpenAI } from 'openai'

class LLMClient {
    private openai: OpenAI

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || ''
        })
    }

    async generateResponse(
        instructions: string,
        prompt: string
    ): Promise<string | null> {
        try {
            const completions = await this.openai.chat.completions.create({
                messages: [
                    { role: 'system', content: instructions },
                    { role: 'user', content: prompt }
                ],
                model: 'gpt-4o-mini'
            })

            let llmResponse = completions.choices[0].message.content
            console.log(llmResponse)
            return llmResponse
        } catch (error) {
            console.error('Error in LLM API chat completion:', error)
            throw error
        }
    }
}

export default LLMClient
