// pages/proposals/index.tsx
import ProposalsOverview from "@/components/proposaloverview";
import React from "react";

const ProposalsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Loan Proposals</h1>
      <ProposalsOverview />
    </div>
  );
};

export default ProposalsPage;
