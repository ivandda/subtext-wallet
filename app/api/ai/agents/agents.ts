// import { createReactAgent } from "@langchain/langgraph/prebuilt";
// import { subtextWalletTools, getInfo } from "./tools"; // Import all wallet tools and getInfo
// import { initChatModel } from "langchain/chat_models/universal";

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("OPENAI_API_KEY must be set in .env.local");
// }

// export const llm = await initChatModel("openai:gpt-4.1-mini");

// // Wallet Agent with access to all subtextWalletTools
// export const walletAgent = createReactAgent({
//   llm,
//   tools: subtextWalletTools, // Use the comprehensive list of wallet tools
//   prompt: `You are a specialized assistant for SubText Wallet.
// You can create wallets, check balances, list supported tokens, get general information about the wallet and other wallet-related tasks.
// Always infer the userId from the configuration when a tool requires it.
// Be clear and concise in your responses.`,
//   name: "subtext_wallet_assistant",
// });


// export const infoAgent = createReactAgent({
//   llm,
//   tools: [getInfo],
//   prompt: "You are an information assistant for SubText Wallet. Your task is to answer general questions about the app, its features, and how to use it effectively. If a question is related to wallet operations, delegate it to the wallet agent.",
//   name: "info_assistant",
// });

import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { subtextWalletTools, getInfo } from "./tools"; // Import all wallet tools and getInfo
import { initChatModel } from "langchain/chat_models/universal";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY must be set in .env.local");
}

export const llm = await initChatModel("openai:gpt-4.1-mini");

// Combine all tools for the single agent
const allTools = [...subtextWalletTools, getInfo];

// Single Agent with access to all tools
export const subtextAgent = createReactAgent({
  llm,
  tools: allTools,
  prompt: `You are the SubText Wallet AI assistant.
You are responsible for all tasks including:
- Creating wallets. 
- Add tokens to wallet.
- Checking balances.
- Listing supported tokens and chains.
- Sending tokens.
- Bridging tokens.
- Providing general information about this project (It is a hackathon project).

Always infer the userId from the configuration when a tool requires it.
Be clear, concise, and helpful in your responses.
Guide users through wallet operations and provide information about the app.
User the context for a correct choice and use of tools.
If you are unsure how to proceed or if a user's request is ambiguous, ask for clarification.`,
  name: "subtext_assistant", // You can name it as you see fit
});