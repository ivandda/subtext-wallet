import { ApiPromise, WsProvider } from '@polkadot/api';
import { exportWalletKeys } from './export';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { SUPPORTED_TOKENS, TokenInfo } from './supported-tokens';

export type TokenBalance = {
  symbol: string;
  chain: string;
  balance: string;
  decimals: number;
  type: 'native' | 'asset' | 'foreign';
};

export type UserBalances = {
  userId: string;
  address: string;
  totalTokens: number;
  balances: TokenBalance[];
};

/**
 * Get balance for a specific token on a specific chain
 */
const getTokenBalance = async (
  api: ApiPromise, 
  address: string, 
  token: TokenInfo
): Promise<string> => {
  try {
    if (token.type === 'native') {
      // For native tokens, use system.account
      const balanceData: any = await api.query.system.account(address);
      if (balanceData.isEmpty) {
        return '0';
      }
      console.log(`Balance for ${token.symbol} on ${token.chain}:`, balanceData["data"]["free"].toString());
      return balanceData["data"]["free"].toString();
    } else if (token.type === 'asset' && token.assetId !== undefined) {
      // For assets, use assets.account
      const assetBalance = await api.query.assets.account(token.assetId, address);
      console.log(`Asset balance for ${token.symbol} on ${token.chain}:`, (assetBalance as any).unwrap().balance);
      if (!assetBalance.isEmpty) {
        return (assetBalance as any).unwrap().balance.toString();
      }
      return '0';
    } else if (token.type === 'foreign') {
      // For foreign assets, might need different query depending on the pallet
      // This is a simplified approach - you might need to adjust based on specific chain implementations
      try {
        const foreignBalance = await api.query.tokens.accounts(address, token.assetId)
        console.log(`Foreign asset balance for ${token.symbol} on ${token.chain}:`, foreignBalance.toHuman());
        if (!foreignBalance?.isEmpty) {
          return (foreignBalance as any).free.toString();
        }
      } catch (error) {
        console.warn(`Foreign asset balance query failed for ${token.symbol} on ${token.chain}:`, error);
      }
      return '0';
    }
    return '0';
  } catch (error) {
    console.error(`Error getting balance for ${token.symbol} on ${token.chain}:`, error);
    return '0';
  }
};

/**
 * Get balances for all supported tokens for a user
 */
export const getAllTokenBalances = async (userId: string): Promise<UserBalances> => {

  await cryptoWaitReady(); // inicializa crypto WASM
  
  // First, get the user's wallet from the database
  const pair = await exportWalletKeys(userId);


  const balances: TokenBalance[] = [];
  const apiConnections = new Map<string, ApiPromise>();

  try {
    // Group tokens by RPC endpoint to minimize connections
    const tokensByRpc = SUPPORTED_TOKENS.reduce((acc, token) => {
      if (!acc[token.rpc]) {
        acc[token.rpc] = [];
      }
      acc[token.rpc].push(token);
      return acc;
    }, {} as Record<string, TokenInfo[]>);

    // Connect to each unique RPC endpoint and query balances
    for (const [rpc, tokens] of Object.entries(tokensByRpc)) {
      try {
        console.log(`Connecting to ${rpc}...`);
        const provider = new WsProvider(rpc, 5000, {}, 10000); // 5s retry, 10s timeout
        
        // Create API with timeout
        const apiPromise = ApiPromise.create({ 
          provider,
          throwOnConnect: true,
          throwOnUnknown: true
        });
        
        // Add a timeout wrapper
        const api = await Promise.race([
          apiPromise,
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error(`Connection timeout to ${rpc}`)), 15000)
          )
        ]);
        
        apiConnections.set(rpc, api);
        console.log(`Connected to ${rpc} successfully`);

        // Query balance for each token on this chain
        for (const token of tokens) {
          const balance = await getTokenBalance(api, pair.address, token);

          const formatedBalance = formatBalance(balance, token.decimals);
          
          balances.push({
            symbol: token.symbol,
            chain: token.chain,
            balance: formatedBalance,
            decimals: token.decimals,
            type: token.type,
          });
        }
      } catch (error) {
        console.error(`Failed to connect to ${rpc}:`, error);
        // Add zero balances for tokens on this failed RPC
        for (const token of tokens) {
          balances.push({
            symbol: token.symbol,
            chain: token.chain,
            balance: '0',
            decimals: token.decimals,
            type: token.type,
          });
        }
      }
    }

    return {
      userId,
      address: pair.address,
      totalTokens: balances.length,
      balances,
    };
  } finally {
    // Close all API connections
    for (const api of apiConnections.values()) {
      await api.disconnect();
    }
  }
};

/**
 * Get balance for a specific token for a user
 */
export const getTokenBalanceForUser = async (
  userId: string, 
  tokenSymbol: string, 
  chain: string
): Promise<TokenBalance | null> => {
  const pair = await exportWalletKeys(userId);
  const token = SUPPORTED_TOKENS.find(
    t => t.symbol === tokenSymbol && t.chain === chain
  );

  if (!token) {
    throw new Error(`Token ${tokenSymbol} on ${chain} not supported`);
  }

  let api: ApiPromise | null = null;
  try {
    const provider = new WsProvider(token.rpc);
    api = await ApiPromise.create({ provider });
    
    const balance = await getTokenBalance(api, pair.address, token);
    
    return {
      symbol: token.symbol,
      chain: token.chain,
      balance,
      decimals: token.decimals,
      type: token.type,
    };
  } finally {
    if (api) {
      await api.disconnect();
    }
  }
};

/**
 * Helper function to format balance from raw units to human readable
 */
export const formatBalance = (balance: string, decimals: number): string => {
  const balanceBigInt = BigInt(balance);
  const divisor = BigInt(10 ** decimals);
  const wholePart = balanceBigInt / divisor;
  const fractionalPart = balanceBigInt % divisor;
  
  if (fractionalPart === BigInt(0)) {
    return wholePart.toString();
  }
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '');
  
  return `${wholePart}.${trimmedFractional}`;
};