// app/transactions/page.tsx
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";
import { useTransactions } from "./data-table";

const TransactionsPage = () => {
  const { transactions, loading } = useTransactions(null); // Replace `null` with provider if available

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "expiringDate",
      header: "Expiring Date",
    },
    {
      accessorKey: "hasExpired",
      header: "Has Expired",
    },
    {
      accessorKey: "collateral",
      header: "Collateral",
    },
    {
      accessorKey: "interest",
      header: "Interest Rate",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <div className="container py-10 mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length > 0 ? (
        <Table>
          <TableHeader>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessorKey}>
                    {tx[column.accessorKey as keyof Transaction] ?? "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransactionsPage;
