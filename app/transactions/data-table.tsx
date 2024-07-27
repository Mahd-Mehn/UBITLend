// hooks/useTransactions.ts
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getLendingPoolContract } from "@/contract";
import { Transaction } from "@/types/transaction";

export function useTransactions(
  provider: ethers.providers.Web3Provider | null
) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (provider) {
        setLoading(true);
        try {
          const contract = getLendingPoolContract(provider);

          const filterLoanRequested = contract.filters.LoanRequested();
          const filterLoanProposed = contract.filters.LoanProposed();
          const filterLoanAccepted = contract.filters.LoanAccepted();
          const filterLoanRepaid = contract.filters.LoanRepaid();
          const filterCollateralRefunded =
            contract.filters.CollateralRefunded();
          const filterCollateralDefaulted =
            contract.filters.CollateralDefaulted();

          const loanRequestedEvents = await contract.queryFilter(
            filterLoanRequested
          );
          const loanProposedEvents = await contract.queryFilter(
            filterLoanProposed
          );
          const loanAcceptedEvents = await contract.queryFilter(
            filterLoanAccepted
          );
          const loanRepaidEvents = await contract.queryFilter(filterLoanRepaid);
          const collateralRefundedEvents = await contract.queryFilter(
            filterCollateralRefunded
          );
          const collateralDefaultedEvents = await contract.queryFilter(
            filterCollateralDefaulted
          );

          const allEvents = [
            ...loanRequestedEvents,
            ...loanProposedEvents,
            ...loanAcceptedEvents,
            ...loanRepaidEvents,
            ...collateralRefundedEvents,
            ...collateralDefaultedEvents,
          ];

          const txs: Transaction[] = allEvents
            .map((event) => {
              if (!event.args) return null;

              switch (event.event) {
                case "LoanRequested":
                  return {
                    id: event.args.loanRequestId.toString(),
                    amount: event.args.amount.toString(),
                    type: "LoanRequested",
                    address: event.args.borrower,
                    duration: event.args.duration.toString(),
                    expiringDate: "",
                    hasExpired: false,
                    collateral: event.args.deposit.toString(),
                    interest: "",
                    status: "Active",
                  };
                // Add cases for other events here
                default:
                  return null;
              }
            })
            .filter((tx) => tx !== null);

          setTransactions(txs);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [provider]);

  return { transactions, loading };
}
