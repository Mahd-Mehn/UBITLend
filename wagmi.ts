import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ubit } from "./customChain";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [ubit],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
