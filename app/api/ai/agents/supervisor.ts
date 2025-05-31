// lib/supervisor.ts
import { createSupervisor } from "@langchain/langgraph-supervisor";
import { flightAgent, hotelAgent } from "./agents";
import { checkpointer } from "./checkpointer";
import { llm } from "./agents"; // Reuse the same LLM instance

const supervisorPrompt = 'You are a supervisor managing travel bookings.';

export const supervisor = createSupervisor({
  agents: [flightAgent, hotelAgent],
  llm: llm,
  prompt: supervisorPrompt,
});


// Compile the full multi-agent graph, injecting the Postgres checkpointer for persistence.
// This allows the supervisor to manage state across multiple threads and agents.
export const supervisorGraph = supervisor.compile({
  checkpointer, // so that each thread’s memory is stored in Postgres
});
