"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "next/navigation";
import { getLendingPoolContract } from "@/contract";
import { ColumnDef } from "@tanstack/react-table";
import PeopleDataTable from "@/app/requests/data-table";
import { toast } from "react-toastify"; // Import toast notifications for better UX

const ProposalsList = ({ params }: { params: { id: string } }) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

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

  const fetchProposals = async () => {
    if (provider && params.id) {
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
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [provider, params.id]);

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
          <button
            onClick={() => acceptProposal(lender)}
            disabled={loading || accepted}
            className={`${
              accepted ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            {accepted ? "Accepted" : "Accept"}
          </button>
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
