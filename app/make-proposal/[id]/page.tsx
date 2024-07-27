"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { getLendingPoolContract } from "@/contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAccount } from "wagmi";
import { toast } from "react-toastify"; // Import toast notifications for better UX

const ProposalForm = ({ params }: { params: { id: string } }) => {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const router = useRouter();

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

  useEffect(() => {
    const fetchLoanRequest = async () => {
      if (provider && params.id) {
        try {
          const contract = getLendingPoolContract(provider);
          const request = await contract.loanRequests(params.id);
          setAmount(ethers.utils.formatEther(request.amount));
          setDuration(request.duration.toString());
        } catch (error) {
          console.error("Error fetching loan request:", error);
        }
      }
    };

    fetchLoanRequest();
  }, [provider, params.id]);

  const handleProposal = async () => {
    if (!isConnected || !provider || !address) {
      console.error("Please connect your wallet.");
      return;
    }

    setLoading(true);
    try {
      const signer = provider.getSigner();
      const contract = getLendingPoolContract(provider);
      const formattedAmount = ethers.utils.parseEther(amount);

      console.log("Submitting proposal with values:", {
        loanRequestId: params.id,
        interestRate,
        amount: formattedAmount.toString(),
      });

      const tx = await contract.proposeLoan(params.id, interestRate, {
        value: formattedAmount,
      });

      await tx.wait();
      toast.success("Loan proposal submitted successfully!");
      router.push(`/proposals/${params.id}`);
    } catch (error) {
      console.error("Error making proposal:", error);
      toast.error("Failed to submit loan proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 mx-auto grid gap-2">
      <h1>Make a Proposal</h1>
      <div className="form-group">
        <Label>Amount (ETH)</Label>
        <Input type="text" value={amount} disabled />
      </div>
      <div className="form-group">
        <Label>Duration (days)</Label>
        <Input type="text" value={duration} disabled />
      </div>
      <div className="form-group">
        <Label>Interest Rate (%)</Label>
        <Input
          type="text"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <Button onClick={handleProposal} disabled={loading}>
          {loading ? "Submitting..." : "Submit Proposal"}
        </Button>
      </div>
    </div>
  );
};

export default ProposalForm;
