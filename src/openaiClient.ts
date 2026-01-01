// import { createOpenAI} from "@ai-sdk/openai";
import OpenAI from "openai";

export const openaiClient = new OpenAI({
    apiKey:import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    
});


