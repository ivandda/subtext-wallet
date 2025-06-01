// import { createSupervisor } from "@langchain/langgraph-supervisor";
// import { walletAgent, infoAgent } from "./agents"; // Import the updated walletAgent and infoAgent
// import { checkpointer } from "./checkpointer";
// import { llm } from "./agents"; // Reuse the same LLM instance
// import { subtextWalletTools } from "./tools"; // Import the tools for wallet operations

// const supervisorPrompt = `You are a supervisor for SubText Wallet's AI assistant.
// Your primary role is to **route** user requests to the appropriate specialist agent.
// Based on the user's request, **decide which of the following agents should handle it and use that agent**:
// - 'subtext_wallet_assistant': For tasks related to creating wallets, checking balances, listing tokens, sending tokens, bridging tokens, and other cryptocurrency wallet operations.
// - 'info_assistant': For general information about the SubText Wallet app, its features, or Polkadot.


// For example:
// If the user asks: "What is my PAS token balance?"
// Your should route to: subtext_wallet_assistant

// If the user asks: "What is SubText Wallet? Why should I use it?"
// You should route to: info_assistant

// Ensure all wallet-related tasks are routed to 'subtext_wallet_assistant'.
// If a task clearly falls under general information, route it to 'info_assistant'.`;


// export const supervisor = createSupervisor({
//   agents: [walletAgent, infoAgent],
//   llm: llm,
//   prompt: supervisorPrompt,
//   // tools: subtextWalletTools,
// });


// // Compile the full multi-agent graph, injecting the Postgres checkpointer for persistence.
// // This allows the supervisor to manage state across multiple threads and agents.
// export const supervisorGraph = supervisor.compile({
//   checkpointer, // so that each thread’s memory is stored in Postgres
// });
