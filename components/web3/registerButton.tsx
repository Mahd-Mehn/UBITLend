"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { wagmiAbi } from "../../abi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const contractConfig = {
  address: "0x35bb9b7e79c5Cc9Dad01eB0366B0dB6363fc3c49",
  wagmiAbi,
} as const;

const Home = () => {
  const [mounted, setMounted] = React.useState(true);
  React.useEffect(() => setMounted(true), []);

  const [totalLoans, setTotalLoans] = React.useState(0);
  const { isConnected } = useAccount();

  const [loanAmount, setLoanAmount] = React.useState("");
  const [interestRate, setInterestRate] = React.useState("");

  const {
    data: hash,
    writeContract: createLoanRequest,
    isPending: isUserRegistrationPending,
    isSuccess: isUserRegistrationSuccessful,
    error: registerError,
  } = useWriteContract();

  const { data: totalLoansSupply } = useReadContract({
    ...contractConfig,
    functionName: "loanRequests",
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  React.useEffect(() => {
    if (totalLoansSupply) {
      setTotalLoans(totalLoans);
    }
  }, [totalLoans, totalLoansSupply]);

  const isMinted = txSuccess;

  const handleLoanAmountChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLoanAmount(e.target.value);
  };

  const handleInterestRateChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInterestRate(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createLoanRequest?.({
      ...contractConfig,
      functionName: "createLoanRequest",
      abi: wagmiAbi,
      args: [loanAmount, interestRate],
    });
  };

  return (
    <div className="rounded-md min-w-screen-lg">
      <div>
        <form onSubmit={handleSubmit} className="w-full p-2 max-w-3xl">
          <div className="">
            {/* Card */}
            <Card>
              <CardHeader className="text-center">
                <h2 className="text-3xl font-semibold leading-none tracking-tight">
                  Publish a Loan Request Now!
                </h2>
                <CardDescription>
                  View loan request?{" "}
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
                  {/* Grid */}
                  <div className="grid grid-cols-2 gap-8">
                    <Label className="text-lg">
                      How much do you want to borrow?
                    </Label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={handleLoanAmountChange}
                      className="text-foreground"
                      required
                    />
                    <Label className="text-lg">
                      When will you pay back? (in weeks)
                    </Label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={handleInterestRateChange}
                      className="text-foreground"
                      required
                    />

                    {isConnected ? (
                      <Button
                        type="submit"
                        disabled={
                          !createLoanRequest ||
                          isUserRegistrationPending ||
                          isUserRegistrationSuccessful
                        }
                        className="mt-3 col-span-2"
                        data-mint-loading={isUserRegistrationPending}
                        data-mint-started={isUserRegistrationSuccessful}
                      >
                        {isUserRegistrationPending && "Waiting for approval"}
                        {isUserRegistrationSuccessful && "Minting..."}
                        {!isUserRegistrationPending &&
                          !isUserRegistrationSuccessful &&
                          "Publish Loan Request"}
                      </Button>
                    ) : (
                      <ConnectButton />
                    )}
                  </div>
                  {/* Grid End */}
                </div>
              </CardContent>
            </Card>
            {/* End Card */}
          </div>
        </form>
        {/* {mounted && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Loan Amount (in wei):
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  className="text-foreground"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Interest Rate:
                <Input
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="text-foreground"
                  required
                />
              </label>
            </div>
            <Button
              type="submit"
              disabled={
                !createLoanRequest ||
                isUserRegistrationPending ||
                isUserRegistrationSuccessful
              }
              className="my-2"
              data-mint-loading={isUserRegistrationPending}
              data-mint-started={isUserRegistrationSuccessful}
            >
              {isUserRegistrationPending && "Waiting for approval"}
              {isUserRegistrationSuccessful && "Minting..."}
              {!isUserRegistrationPending &&
                !isUserRegistrationSuccessful &&
                "Make Loan Request"}
            </Button>
          </form>
        )} */}
      </div>
    </div>
  );
};

export default Home;
