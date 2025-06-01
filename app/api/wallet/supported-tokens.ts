export type TokenInfo = {
  symbol: string;
  chain: string;
  chainVerbose?: string;
  rpc: string;
  type: 'native' | 'asset' | 'foreign';
  decimals: number;
  assetId?: number;
  parachainId?: number;
  multiLocation: {
    Concrete: {
      interior: string; // e.g. "Here" or "X1(Parachain(1000))"
      parents: number; // Number of parents in the MultiLocation
    };
  };
};

export const SUPPORTED_TOKENS: TokenInfo[] = [
  {
    symbol: "PAS", // PAS on Relay Chain (Paseo)
    chain: "paseo",
    chainVerbose: "Paseo Relay Chain",
    rpc: "wss://paseo.rpc.amforc.com",
    type: "native",
    decimals: 10,
    multiLocation: {
      Concrete: {
        interior: "Here",
        parents: 0
      }
    }
  },
  {
    symbol: "PAS", // PAS on Asset Hub (assethub-paseo, parachainId 1000)
    chain: "assethub-paseo",
    chainVerbose: "Asset Hub Paseo",
    rpc: "wss://asset-hub-paseo.dotters.network",
    type: "native",
    decimals: 10,
    parachainId: 1000,
    multiLocation: {
      Concrete: {
        interior: "Here",
        parents: 1 // From Asset Hub, PAS is from relay (parents: 1)
      }
    }
  },
  {
    symbol: "DOT", // PAS on HydraDX (hydradx, parachainId 2034)
    chain: "hydradx-paseo",
    chainVerbose: "HydraDX Paseo",
    rpc: "wss://paseo.rpc.hydration.cloud",
    type: "foreign",
    decimals: 10,
    parachainId: 2034,
    assetId: 5,
    multiLocation: {
      Concrete: {
        interior: "Here",
        parents: 1
      }
    }
  },
  {
    symbol: "HDX", // HDX native on HydraDX (hydradx-paseo, parachainId 2034)
    chain: "hydradx-paseo",
    chainVerbose: "HydraDX Paseo",
    rpc: "wss://paseo.rpc.hydration.cloud",
    type: "native",
    decimals: 12,
    parachainId: 2034,
    multiLocation: {
      Concrete: {
        interior: "Here",
        parents: 0
      }
    }
  }
];
