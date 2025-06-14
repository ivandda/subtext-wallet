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
import { checkpointer } from "./checkpointer"; // Import the checkpointer

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY must be set in .env.local");
}

export const llm = await initChatModel("openai:gpt-4.1-mini");

// Combine all tools for the single agent
const allTools = [...subtextWalletTools];

// Single Agent with access to all tools
export const subtextAgent = createReactAgent({
  llm,
  tools: allTools,
  prompt: `You are the SubText Wallet.
You are responsible for all tasks including:
- Creating wallets. 
- Add tokens to wallet.
- Checking balances.
- Listing supported tokens and chains.
- Sending tokens.
- Bridging tokens.
- Swapping tokens.
- Providing general information about this project (It is a hackathon project).
Rules:
- Always infer the userId from the configuration when a tool requires it.
- Be clear and helpful in your responses.
- Guide users through wallet operations and provide information about the app.
- User the message history context for a correct choice and use of tools.
- If you are answering the first message in a thread, provide a brief introduction to the wallet (SubText wallet) and its features.
- Only provide the wallet Mnemonic and Private Key when explicitly requested by the user, and always warn about the risks of sharing this information.
- For all the tools that require wallet information, try to use an already created wallet if it exists, otherwise create a new one.
- If you are unsure how to proceed or if a user's request is ambiguous, ask for clarification.`,
  name: "subtext_assistant",
  checkpointer: checkpointer,
});