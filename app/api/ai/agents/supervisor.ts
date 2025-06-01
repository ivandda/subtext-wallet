import { createSupervisor } from "@langchain/langgraph-supervisor";
import { walletAgent, infoAgent } from "./agents"; // Import the updated walletAgent and infoAgent
import { checkpointer } from "./checkpointer";
import { llm } from "./agents"; // Reuse the same LLM instance

const supervisorPrompt = `You are a supervisor for SubText Wallet's AI assistant.
Your primary role is to coordinate tasks related to cryptocurrency wallet operations.
Delegate tasks to the 'subtext_wallet_assistant' for creating wallets, checking balances, listing tokens, and providing wallet-specific information.
If the user asks for general information that the 'subtext_wallet_assistant' can handle with its 'get_general_info' tool, you can delegate to it.
If there's a very simple request for general info, you can also consider the 'info_assistant'.
Ensure the user's requests are handled efficiently and accurately.`;

export const supervisor = createSupervisor({
  agents: [walletAgent, infoAgent], // Include the walletAgent and infoAgent
  llm: llm,
  prompt: supervisorPrompt,
});


// Compile the full multi-agent graph, injecting the Postgres checkpointer for persistence.
// This allows the supervisor to manage state across multiple threads and agents.
export const supervisorGraph = supervisor.compile({
  checkpointer, // so that each thread’s memory is stored in Postgres
});
