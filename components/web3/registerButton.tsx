"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getLendingPoolContract } from "@/contract";
import { ethers } from "ethers";

const Home = () => {
  const { address, isConnected } = useAccount();
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

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

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setLoading(true);
      const contract = getLendingPoolContract(provider);
      const amountWei = ethers.utils.parseEther(amount);
      const collateralAmountWei = amountWei.mul(70).div(100);

      const tx = await contract.requestLoan(amountWei, parseInt(duration), {
        value: collateralAmountWei,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md min-w-screen-lg">
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full p-2 md:max-w-3xl"
        >
          <Card>
            <CardHeader className="text-center">
              <h2 className="text-3xl font-semibold leading-none tracking-tight">
                Publish a Loan Request Now!
              </h2>
              <CardDescription>
                View loan requests?{" "}
                <a
                  className="text-primary hover:underline underline-offset-4"
                  href="#"
                >
                  Click Here
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-5 text-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <Label className="text-lg">
                    How much do you want to borrow?
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter loan amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="text-foreground"
                    required
                  />
                  <Label className="text-lg">
                    When will you pay back? (in days)
                  </Label>
                  <Input
                    type="number"
                    value={duration}
                    onChange={handleDurationChange}
                    placeholder="Enter loan duration"
                    className="text-foreground"
                    required
                  />

                  {isConnected ? (
                    <Button
                      className="mt-3 col-span-2"
                      onClick={requestLoan}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Request Loan"}
                    </Button>
                  ) : (
                    <ConnectButton />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Home;
