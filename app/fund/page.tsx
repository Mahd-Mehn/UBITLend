"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { getLendingPoolContract } from "@/contract"; // Ensure this path is correct
import { useRouter } from "next/navigation";

export default function BorrowLend() {
  const { address, isConnected } = useAccount();
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const [open, setOpen] = useState<string>("deposit");
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>(""); // Added state for duration
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // State for loan requests
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
        } catch (error) {
          console.error("Error requesting accounts:", error);
        }
      }
    };

    initializeProvider();
  }, []);

  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };

  const priceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const requestLoan = async () => {
    if (!isConnected || !provider) {
      console.error("Please connect your wallet.");
      return;
    }

    try {
      const contract = getLendingPoolContract(provider);

      // Convert amount to wei if not already
      const amountWei = ethers.utils.parseEther(amount);

      // Calculate 70% of the loan amount as collateral
      const collateralAmountWei = amountWei.mul(70).div(100); // 70% of the loan amount

      // Prepare the transaction to include the collateral amount as the value
      const tx = await contract.requestLoan(amountWei, parseInt(duration), {
        value: collateralAmountWei, // Send the collateral as part of the transaction
      });

      await tx.wait();

      console.log("Loan request submitted successfully.");
      alert("Loan request submitted successfully!");
      router.push("/requests");
    } catch (error) {
      console.error("Error submitting loan request:", error);
      alert(
        "Failed to submit loan request. Please check the console for details."
      );
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter loan amount"
        value={amount}
        onChange={priceHandler}
      />
      <input
        type="number"
        placeholder="Enter loan duration"
        value={duration}
        onChange={handleDurationChange}
      />
      <button onClick={requestLoan}>Request Loan</button>
    </div>
  );
}
