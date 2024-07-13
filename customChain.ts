import { defineChain } from "viem";

export const ubit = defineChain({
  id: 44433,
  name: "UBIT SMART CHAIN",
  nativeCurrency: {
    decimals: 18,
    name: "UBIT SMART CHAIN",
    symbol: "USC",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.ubitscan.io/api"],
      webSocket: undefined,
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.ubitscan.io/" },
  },
  contracts: {
    multicall3: {
      address: "0xDb55d4edC07D86450Cd9BF5052700adb599e810C",
    },
  },
});
