import { createPublicClient, http } from "viem";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});
