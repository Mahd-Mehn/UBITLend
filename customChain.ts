import { defineChain } from "viem";

export const ubit = defineChain({
  id: 90002,
  name: "UBIT SMARTCHAIN",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14914.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "USC", symbol: "USC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.ubitscan.io/"] },
  },
  blockExplorers: {
    default: { name: "UBITscan", url: "https://ubitscan.io" },
  },
});
