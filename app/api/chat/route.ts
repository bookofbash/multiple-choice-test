import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const requestedOutputStructure = [
  {
    Question: 'What is the main idea of the article?',
    Answers: [
      {
        1: 'How to be a good friend',
        2: 'Who killed Rodger Rabbit',
        3: 'Where the wild things are',
        4: 'Don\'t lie to your parents'
      }
    ],
    Correct: 1
  }
]

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { vibe, bio } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Create 5 multiple-choice questions based on ${bio}${bio.slice(-1) === '.' ? '' : '.'}. Each question should be less than 160 characters and labeled from "1." to "5.". Follow the structure indicated by ${requestedOutputStructure}. Ensure the questions are appropriate for students in ${vibe}.
        `,
      },
    ],
  });
    

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);


  // Respond with the stream
  return new StreamingTextResponse(stream);
}
