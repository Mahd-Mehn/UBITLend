import React from "react";
import PeopleDataTable from "./data-table";
import { transactions } from "@/transactions";
import { columns } from "./columns";

type Props = {};

const People = (props: Props) => {
  return (
    <div className="container py-10 mx-auto">
      <PeopleDataTable columns={columns} data={transactions} />
    </div>
  );
};

export default People;
