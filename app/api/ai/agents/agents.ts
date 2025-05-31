// import { ChatOpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { bookFlight, bookHotel } from "./tools";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY must be set in .env.local");
}


export const llm = new ChatOpenAI({ 
    modelName: "gpt-4.1",
    streaming: false,
});


console.log("Using LLM:", llm);

export const flightAgent = createReactAgent({
  llm,
  tools: [bookFlight],
  prompt: "You are a flight booking assistant. Always use the book_flight tool when booking flights.",
  name: "flight_assistant",
});

export const hotelAgent = createReactAgent({
  llm,
  tools: [bookHotel],
  prompt: "You are a hotel booking assistant. Always use the book_hotel tool when booking hotels.",
  name: "hotel_assistant",
});