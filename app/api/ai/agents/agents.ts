import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { bookFlight, bookHotel } from "./tools";
import { initChatModel } from "langchain/chat_models/universal";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY must be set in .env.local");
}

export const llm = await initChatModel("openai:gpt-4.1");

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