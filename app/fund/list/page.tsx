"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getLendingPoolContract } from "@/contract"; // Ensure this path is correct

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {loanRequests.map((request, index) => (
            <li key={index}>
              <div>Borrower: {request.borrower}</div>
              <div>Amount: {request.amount} ETH</div>
              <div>Deposit: {request.deposit} ETH</div>
              <div>Duration: {request.duration} days</div>
              <div>Start Time: {request.startTime}</div>
              <div>Status: {request.active ? "Active" : "Inactive"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanRequests;
