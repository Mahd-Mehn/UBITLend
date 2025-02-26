"use client";
import PeopleDataTable from "./data-table";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getLendingPoolContract } from "@/contract";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
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

  const fetchLoanRequests = async () => {
    if (provider) {
      setLoading(true);
      try {
        const contract = getLendingPoolContract(provider);
        const loanRequestId = await contract.nextLoanRequestId(); // Fetch the total number of requests

        const requests = [];
        for (let i = 0; i < loanRequestId; i++) {
          const request = await contract.loanRequests(i); // Fetch each loan request by ID
          requests.push({
            ...request,
            amount: ethers.utils.formatEther(request.amount), // Convert BigNumber to string
            deposit: ethers.utils.formatEther(request.deposit), // Convert BigNumber to string
            duration: request.duration.toString(), // Convert BigNumber to string
            startTime: new Date(
              request.startTime.toNumber() * 1000
            ).toLocaleString(), // Format timestamp
            status: request.active ? "Active" : "Inactive", // Add status field
            id: i, // Add id field
          });
        }

        setLoanRequests(requests);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanRequests();
  }, [provider]);

  const columns: ColumnDef<any, any>[] = [
    {
      header: "Borrower",
      accessorKey: "borrower",
    },
    {
      header: "Amount (ETH)",
      accessorKey: "amount",
    },
    {
      header: "Deposit (ETH)",
      accessorKey: "deposit",
    },
    {
      header: "Duration (days)",
      accessorKey: "duration",
    },
    {
      header: "Start Time",
      accessorKey: "startTime",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div>
          <button
            onClick={() => router.push(`/proposals/${row.original.id}`)}
            className="mr-2"
          >
            View Proposals
          </button>
          <button
            onClick={() => router.push(`/make-proposal/${row.original.id}`)}
          >
            Make Proposal
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container py-10 mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PeopleDataTable columns={columns} data={loanRequests} />
      )}
    </div>
  );
};

export default LoanRequests;
