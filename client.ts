import { createPublicClient, http } from "viem";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";
import { ubit } from "./customChain";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: ubit,
  transport: custom(window.ethereum!),
});
