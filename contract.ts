import { ethers } from "ethers";
import { wagmiAbi } from "./abi";
import abi from "@/abi.json";

export const LENDING_POOL_ADDRESS =
  "0x6eBeE513DA3Ec8aA26f1995a19d6f94c76ED9ee6";

export function getLendingPoolContract(
  provider: ethers.providers.Web3Provider
) {
  return new ethers.Contract(LENDING_POOL_ADDRESS, abi, provider.getSigner());
}
