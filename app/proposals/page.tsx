import React from "react";
import PeopleDataTable from "./data-table";
import { proposal, proposalRecieved } from "@/proposal";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columnsRecieved } from "./columnsRecieved";

type Props = {};

const People = (props: Props) => {
  return (
    <Tabs defaultValue="account" className="w-[400px] md:w-full">
      <TabsList>
        <TabsTrigger value="account">Proposals made</TabsTrigger>
        <TabsTrigger value="password">Proposals Recieved</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="container py-10 mx-auto">
          <PeopleDataTable columns={columns} data={proposal} />
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="container py-10 mx-auto">
          <PeopleDataTable columns={columnsRecieved} data={proposalRecieved} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default People;
