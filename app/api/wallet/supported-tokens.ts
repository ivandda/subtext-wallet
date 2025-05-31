export type TokenInfo = {
  symbol: string;
  chain: string;
  rpc: string;
  type: 'native' | 'asset' | 'foreign';
  decimals: number;
  assetId?: number;
  parachainId?: number;
  multiLocation: {
    Concrete: {
      interior: string; // "Here" or "X1(Parachain(1000))"
      parents: number; // Number of parents in the MultiLocation
    };
  };
};

// Suported chains
export const SUPPORTED_CHAINS = [
  "paseo",
  "paseo-asset-hub",
  "hydradx-paseo"
];


export const SUPPORTED_TOKENS: TokenInfo[] = [
  {
    symbol: "PAS", // PAS on Relay Chain (Paseo)
    chain: "paseo",
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
    symbol: "PAS", // PAS on Asset Hub (paseo-asset-hub, parachainId 1000)
    chain: "paseo-asset-hub",
    rpc: "wss://asset-hub-paseo-rpc.dwellir.com",
    type: "foreign",
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
    symbol: "PAS", // PAS on HydraDX (hydradx, parachainId 2034)
    chain: "hydradx-paseo",
    rpc: "wss://paseo.rpc.hydration.cloud",
    type: "foreign",
    decimals: 12,
    parachainId: 2034,
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
  },
  {
    symbol: "HDX", // HDX on Asset Hub (foreign asset)
    chain: "paseo-asset-hub",
    rpc: "wss://paseo-asset-hub-rpc.polkadot.io",
    type: "foreign",
    decimals: 10,
    parachainId: 1000,
    multiLocation: {
      Concrete: {
        interior: "X1(Parachain(2034))",
        parents: 1 // From Asset Hub, it’s 1 parent up (relay), then to parachain
      }
    }
  },
  {
    symbol: "DOT", // DOT (Asset Hub test version on Paseo)
    chain: "paseo-asset-hub",
    rpc: "wss://paseo-asset-hub-rpc.polkadot.io",
    type: "asset",
    decimals: 10,
    parachainId: 1000,
    assetId: 0, // Usually DOT is assetId: 0 in test asset hubs
    multiLocation: {
      Concrete: {
        interior: "X2(PalletInstance(50), GeneralIndex(0))",
        parents: 0
      }
    }
  }
];
