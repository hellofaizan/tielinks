import React from "react";
import { currentUser, fullUserData } from "~/server/user";
import PageLink from "./components/pagelink";
import DashboardComponent from "./components/dashoard";
import Graphs from "./components/Graphs";
import LinkTable from "./components/linkClick";

export default async function page() {
  const session = await currentUser();
  const user = await fullUserData(session?.id || "");

  return (
    <div className="flex flex-col gap-3 p-2 md:p-4 w-full">
      <PageLink />
      <DashboardComponent userId={user?.id || ""} />
      <Graphs />
      <LinkTable />
    </div>
  );
}
