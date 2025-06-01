import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { LangGraphRunnableConfig } from "@langchain/langgraph";

// Wallet interaction imports
import { createWalletForUser } from "../../wallet/create";
import { loadWalletData } from "../../wallet/export";
import { getAllTokenBalances, getTokenBalanceForUser, UserBalances, TokenBalance } from "../../wallet/balance";
import { SUPPORTED_TOKENS, TokenInfo } from "../../wallet/supported-tokens";
import { sendTransfer } from "../../wallet/transfer";
import { crossChainBridge } from "../../wallet/xcm-bridge";

/**
 * Get general information tool.
 * Input: nothing
 * Runtime Args: not used
 * Output: Information string.
 */
export const getInfo = tool(
  async (_input: unknown, _config?: LangGraphRunnableConfig) => {
    return generalInfo;
  },
  {
    name: "get_general_info",
    description: "Retrieve general information about the SubText Wallet services.",
    schema: z.object({}), // No input required
  }
);

const generalInfo = "SubText Wallet is a crypto wallet service that allows you to perform operations on the Polkadot Network, including managing assets and interacting with different parachains.";

/**
 * Create Wallet tool.
 * Input: nothing
 * Runtime Args: userId (from config)
 * Output: Wallet creation confirmation: Address.
 */
export const createWallet = tool(
  async (_input: unknown, config?: LangGraphRunnableConfig) => {
    const userId = config?.configurable?.userId as string | undefined;
    if (!userId) {
      return "Error: User ID is required to create a wallet.";
    }
    try {
      const walletInfo = await createWalletForUser(userId);
      if(walletInfo.new) {
        return `Successfully created wallet for user ${userId}. Address: ${walletInfo.address}.`;
      } 
      return `Wallet already exists for user ${userId}. Address: ${walletInfo.address}.`;
      // For actual use, you might return walletInfo directly if the agent needs to process it.
      // return walletInfo;
    } catch (error: any) {
      console.error(`Error creating wallet for user ${userId}:`, error);
      return `Error creating wallet: ${error.message}`;
    }
  },
  {
    name: "create_wallet",
    description: "Creates a new Polkadot wallet for the user. The user ID is automatically inferred.",
    schema: z.object({}),
  }
);

/**
 * Load Wallet Data tool.
 * Input: nothing (userId is derived from config)
 * Runtime Args: userId (from config)
 * Output: Wallet data (mnemonic, address, public key, private key).
 */
export const getWalletDetails = tool(
  async (_input: unknown, config?: LangGraphRunnableConfig) => {
    const userId = config?.configurable?.userId as string | undefined;
    if (!userId) {
      return "Error: User ID is required to load wallet data.";
    }
    try {
      const walletData = await loadWalletData(userId);
      return `Wallet data for user ${userId}: Address: ${walletData.address}, PublicKey: ${walletData.publicKey}, Mnemonic: ${walletData.mnemonic}, PrivateKey: ${walletData.privateKey}`
    } catch (error: any) {
      console.error(`Error loading wallet data for user ${userId}:`, error);
      return `Error loading wallet data: ${error.message}`;
    }
  },
  {
    name: "get_wallet_details",
    description: "Loads and returns the wallet data (address, public key) for the user. The user ID is automatically inferred.",
    schema: z.object({}),
  }
);

/**
 * Get All Token Balances tool.
 * Input: nothing (userId is derived from config)
 * Runtime Args: userId (from config)
 * Output: UserBalances object or error string.
 */
export const listAllTokenBalances = tool(
  async (_input: unknown, config?: LangGraphRunnableConfig): Promise<UserBalances | string> => {
    const userId = config?.configurable?.userId as string | undefined;
    if (!userId) {
      return "Error: User ID is required to fetch balances.";
    }
    try {
      const balances = await getAllTokenBalances(userId);
      return balances;
    } catch (error: any) {
      console.error(`Error fetching all token balances for user ${userId}:`, error);
      return `Error fetching all token balances: ${error.message}`;
    }
  },
  {
    name: "list_all_token_balances",
    description: "Retrieves all token balances for the supported tokens for the user. The user ID is automatically inferred.",
    schema: z.object({}),
  }
);

/**
 * Get Specific Token Balance tool.
 * Input: { tokenSymbol: string, chain: string } (userId is derived from config)
 * Runtime Args: userId (from config)
 * Output: TokenBalance object or error string.
 */
export const getSpecificTokenBalance = tool(
  async (input: { tokenSymbol: string; chain: string }, config?: LangGraphRunnableConfig): Promise<TokenBalance | string | null> => {
    const userId = config?.configurable?.userId as string | undefined;
    if (!userId) {
      return "Error: User ID is required to fetch token balance.";
    }
    try {
      const balance = await getTokenBalanceForUser(userId, input.tokenSymbol, input.chain);
      return balance;
    } catch (error: any) {
      console.error(`Error fetching token balance for ${input.tokenSymbol} on ${input.chain} for user ${userId}:`, error);
      return `Error fetching token balance: ${error.message}`;
    }
  },
  {
    name: "get_specific_token_balance",
    description: "Retrieves the balance for a specific token on a specific chain for the user. The user ID is automatically inferred.",
    schema: z.object({
      tokenSymbol: z.enum(Array.from(new Set(SUPPORTED_TOKENS.map(token => token.symbol))) as [string, ...string[]]).describe("The symbol of the token to check balance for (e.g., 'PAS', 'DOT')"),
      chain: z.enum(Array.from(new Set(SUPPORTED_TOKENS.map(token => token.chain))) as [string, ...string[]]).describe("The chain name where the token resides (e.g., 'paseo', 'paseo-asset-hub', 'hydradx-paseo')"),
    }),
  }
);

/**
 * Provide Faucet to get PAS tokens.
 * Input: nothing
 * Output: A link to the faucet
 */
export const getFaucet = tool(
  async (_input: unknown, _config?: LangGraphRunnableConfig): Promise<string> => {
    return 'https://faucet.polkadot.io';
  },
  {
    name: "get_faucet_tokens",
    description: "Provides a link to the PAS faucet to get test tokens for the Paseo network.",
    schema: z.object({}),
  }
);

/**
 * List Supported Tokens tool.
 * Input: nothing
 * Output: Array of TokenInfo objects.
 */
export const listSupportedTokens = tool(
  async (_input: unknown, _config?: LangGraphRunnableConfig): Promise<TokenInfo[]> => {
    try {
      return SUPPORTED_TOKENS;
    } catch (error: any) {
      console.error(`Error listing supported tokens:`, error);
      // This case should ideally not happen as SUPPORTED_TOKENS is a static import.
      return [];
    }
  },
  {
    name: "list_supported_tokens",
    description: "Lists all crypto tokens supported by the wallet, along with their details like symbol, chain, and type.",
    schema: z.object({}),
  }
);

/**
 * List Supported Chains tool.
 * Input: nothing
 * Output: Array of Chains objects.
 */
export const listSupportedChains = tool(
  async (_input: unknown, _config?: LangGraphRunnableConfig): Promise<{chainId: string, chainName: string}[]> => {
    try {
      return new Set(SUPPORTED_TOKENS.map(token => ({
        chainId: token.chain.toLowerCase(),
        chainName: token.chainVerbose ?? token.chain
      }))).values().toArray();
    } catch (error: any) {
      console.error(`Error listing supported chains:`, error);
      // This case should ideally not happen as SUPPORTED_TOKENS is a static import.
      return [];
    }
  },
  {
    name: "list_supported_chains",
    description: "Lists all supported chains for the wallet, including their IDs and names.",
    schema: z.object({}),
  }
);

/**
 * Create a cross-chain bridge transfer.
 * Input: { sourceChain: string, destChain: string, senderId: string, tokenSymbol: string, amount: number }
 * Output: Transaction hash or error string.
 * Comment: This tool allows users to bridge tokens from one chain to another within the wallet, automatically inferring the user ID from the config.
 *  If the user mentions 'Asset Hub', it will use assethub-paseo chain.
 *  If the user mentions 'HydraDx', 'Hydration' or an intent to Swap tokens, it will use hydradx-paseo chain.
 */
export const createXcBridge = tool(
  async (input: {sourceChain: string, destChain: string, tokenSymbol: string, amount: number}, config?: LangGraphRunnableConfig): Promise<string> => {
    const userId = config?.configurable?.userId as string | undefined;
    if (!userId) {
      return "Error: User ID is required to create a transfer.";
    }
    try {
      const bridgeResult = await crossChainBridge({
        sourceChain: input.sourceChain, 
        destChain: input.destChain, 
        senderId: userId, 
        assetName: input.tokenSymbol, 
        amountHuman: input.amount});
      const link = `https://${input.sourceChain}.subscan.io/extrinsic/${bridgeResult}`;
      return `Bridged ${input.amount} ${input.tokenSymbol} from ${input.sourceChain} to ${input.destChain} successfully! Transaction hash: ${bridgeResult}. You can view it here: ${link}`;
    } catch (error: any) {
      console.error(`Error creating transfer for user ${userId}:`, error);
      return `Error creating transfer: ${error.message}`;
    }
  },
  {
    name: "create_xc_bridge_transfer",
    description: "Creates a cross-chain transfer of tokens from one chain to another within the user wallet. The user ID is automatically inferred.",
    schema: z.object({
      sourceChain: z.enum(Array.from(new Set(SUPPORTED_TOKENS.map(token => token.chain.toLowerCase()))) as [string, ...string[]]).describe("The source chain from which the tokens will be sent"),
      destChain: z.enum(Array.from(new Set(SUPPORTED_TOKENS.map(token => token.chain.toLowerCase()))) as [string, ...string[]]).describe("The destination chain to which the tokens will be sent"),
      tokenSymbol: z.enum(Array.from(new Set(SUPPORTED_TOKENS.map(token => token.symbol))) as [string, ...string[]]).describe("The symbol of the token to be transferred"),
      amount: z.number().describe("The amount of tokens to transfer (e.g., 10.5 for 10.5 PAS)"),
    }),
  }
);

/**
 * Create a trasfer
 * Input: { tokenSymbol: string, to: string, amountHuman: number } (userId is derived from config)
 * Output: Transaction hash or error string.
 */
export const createTransfer = tool(
  async (input: {tokenSymbol: string, to: string, amountHuman: number}, config?: LangGraphRunnableConfig): Promise<string> => {
    const userId = config?.configurable?.userId as string | undefined;
    if (!userId) {
      return "Error: User ID is required to create a transfer.";
    }
    try {
      const transferResult = await sendTransfer(userId, input.tokenSymbol, input.to, input.amountHuman);
      const link = `https://${transferResult.chain}.subscan.io/extrinsic/${transferResult.trasactionHash}`;
      return `Transfer to ${input.to} of ${input.amountHuman} ${input.tokenSymbol} was successful! Transaction hash: ${transferResult.trasactionHash}. You can view it here: ${link}`;
    } catch (error: any) {
      console.error(`Error creating transfer for user ${userId}:`, error);
      return `Error creating transfer: ${error.message}`;
    }
  },
  {
    name: "create_transfer",
    description: "Creates a transfer of tokens from the user's wallet to another address. The user ID is automatically inferred.",
    schema: z.object({
      tokenSymbol: z.enum(Array.from(new Set(SUPPORTED_TOKENS.map(token => token.symbol))) as [string, ...string[]]).describe("The symbol of the token to be transferred (e.g., 'PAS', 'DOT')"),
      to: z.string().describe("The recipient address to which the tokens will be sent."),
      amountHuman: z.number().describe("The amount of tokens to send (e.g., 10.5 for 10.5 PAS)."),
    }),
  }
);

// You would then export these tools for your agent:
export const subtextWalletTools = [
  createWallet,
  getWalletDetails,
  listAllTokenBalances,
  getSpecificTokenBalance,
  getFaucet,
  listSupportedTokens,
  listSupportedChains,
  createXcBridge,
  createTransfer
];