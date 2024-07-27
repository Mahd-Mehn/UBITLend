"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useParams } from "next/navigation";
import { getLendingPoolContract } from "@/contract";
import { ColumnDef } from "@tanstack/react-table";
import PeopleDataTable from "@/app/requests/data-table";
import { toast } from "react-toastify"; // Import toast notifications for better UX
import { Button } from "./ui/button";

const ProposalsList = ({ params }: { params: { id: string } }) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [repaymentAmount, setRepaymentAmount] = useState<string>("");
  const [dataFetched, setDataFetched] = useState<boolean>(false); // Flag to check if data is fetched

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

  const fetchProposals = useCallback(async () => {
    if (provider && params.id && !dataFetched) {
      setLoading(true);
      try {
        const contract = getLendingPoolContract(provider);
        console.log(
          "Fetching lender addresses for loan request ID:",
          params.id
        );

        const lenderAddresses = await contract.getLenderAddresses(params.id);
        console.log("Lender addresses:", lenderAddresses);

        if (lenderAddresses.length === 0) {
          console.log("No lender addresses found for this loan request.");
          setLoading(false);
          return;
        }

        const proposalPromises = lenderAddresses.map((lender: string) =>
          contract.getLoanProposal(params.id, lender)
        );
        const loanProposals = await Promise.all(proposalPromises);

        const formattedProposals = loanProposals.map(
          (proposal: any, index: number) => ({
            lender: lenderAddresses[index],
            interestRate: proposal.interestRate.toString(),
            amount: ethers.utils.formatEther(proposal.amount),
            accepted: proposal.accepted,
          })
        );

        console.log("Formatted proposals:", formattedProposals);
        setProposals(formattedProposals);
        setDataFetched(true); // Set the flag to true after data is fetched
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
      setLoading(false);
    }
  }, [provider, params.id, dataFetched]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const acceptProposal = async (lender: string) => {
    if (provider && params.id) {
      setLoading(true);
      try {
        const signer = provider.getSigner();
        const contract = getLendingPoolContract(provider);
        const transaction = await contract.acceptLoan(params.id, lender);
        await transaction.wait();

        toast.success("Loan proposal accepted successfully!");
        fetchProposals(); // Refresh the proposals after accepting one
      } catch (error) {
        console.error("Error accepting proposal:", error);
        toast.error("Failed to accept loan proposal.");
      }
      setLoading(false);
    }
  };

  const repayLoan = async (loanRequestId: string) => {
    if (provider && repaymentAmount) {
      setLoading(true);
      try {
        const signer = provider.getSigner();
        const contract = getLendingPoolContract(provider);

        // Convert repayment amount from Ether to Wei
        const amountInWei = ethers.utils.parseEther(repaymentAmount);

        // Call the repayLoan function on the contract
        const transaction = await contract.repayLoan(loanRequestId, {
          value: amountInWei,
        });

        // Wait for the transaction to be mined
        await transaction.wait();

        toast.success("Loan repaid successfully!");
        // Optionally, refresh the proposals list here
        // fetchProposals();
      } catch (error) {
        console.error("Error repaying loan:", error);
        toast.error("Failed to repay loan.");
      }
      setLoading(false);
    } else {
      toast.error("Repayment amount is required.");
    }
  };

  const columns: ColumnDef<any, any>[] = [
    {
      header: "Lender",
      accessorKey: "lender",
    },
    {
      header: "Amount (ETH)",
      accessorKey: "amount",
    },
    {
      header: "Interest Rate (%)",
      accessorKey: "interestRate",
    },
    {
      header: "Accepted",
      accessorKey: "accepted",
      cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
    },
    {
      header: "Actions",
      accessorKey: "lender",
      cell: ({ row }) => {
        const { lender, accepted } = row.original;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => acceptProposal(lender)}
              disabled={loading || accepted}
              className={`${
                accepted ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {accepted ? "Accepted" : "Accept"}
            </button>
            {accepted && (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="any"
                  placeholder="Repayment Amount (ETH)"
                  value={repaymentAmount}
                  onChange={(e) => setRepaymentAmount(e.target.value)}
                  className="border border-gray-300 rounded p-2"
                />
                <Button
                  onClick={() => repayLoan(params.id)}
                  disabled={loading || !repaymentAmount}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Repay
                </Button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="container py-10 mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : proposals.length > 0 ? (
        <PeopleDataTable columns={columns} data={proposals} />
      ) : (
        <p>No proposals available for this loan request. {params.id}</p>
      )}
    </div>
  );
};

export default ProposalsList;
