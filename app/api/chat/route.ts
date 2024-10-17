import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "mistralai/mistral-7b-instruct-v0.3",
    messages,
    stream: true,
    max_tokens: 1024,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}