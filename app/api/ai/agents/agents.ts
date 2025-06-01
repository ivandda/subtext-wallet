import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { subtextWalletTools, getInfo } from "./tools"; // Import all wallet tools and getInfo
import { initChatModel } from "langchain/chat_models/universal";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY must be set in .env.local");
}

export const llm = await initChatModel("openai:gpt-4.1-mini");

// Wallet Agent with access to all subtextWalletTools
export const walletAgent = createReactAgent({
  llm,
  tools: subtextWalletTools, // Use the comprehensive list of wallet tools
  prompt: `You are a specialized assistant for SubText Wallet.
You can help users create wallets, check balances, list supported tokens, and get general information about the wallet.
Always infer the userId from the configuration when a tool requires it.
Be clear and concise in your responses.`,
  name: "subtext_wallet_assistant",
});


export const infoAgent = createReactAgent({
  llm,
  tools: [getInfo],
  prompt: "You are an information assistant for SubText Wallet. Use the get_general_info tool to provide general information when asked.",
  name: "info_assistant",
});