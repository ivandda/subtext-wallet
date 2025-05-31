// lib/supervisor.ts
import { createSupervisor } from "@langchain/langgraph-supervisor";
import { flightAgent, hotelAgent } from "./agents";
import { checkpointer } from "./checkpointer";
import { llm } from "./agents"; // Reuse the same LLM instance

// Create a supervisor that coordinates the flight and hotel agents.
export const supervisor = createSupervisor({
  agents: [flightAgent, hotelAgent],
  llm: llm, // We can reuse the same LLM instance
  prompt: `You manage both a flight booking assistant and a hotel booking assistant. 
When a user asks for flights, delegate to the flight_assistant. 
When a user asks for hotels, delegate to the hotel_assistant. 
If they ask for both in the same request, handle them sequentially.`,
});

// Compile the full multi-agent graph, injecting the Postgres checkpointer for persistence.
export const supervisorGraph = supervisor.compile({
  checkpointer, // so that each thread’s memory is stored in Postgres
});
