import React from "react";
import { currentUser } from "~/server/user";
import PageLink from "./components/pagelink";
import DashboardComponent from "./components/dashoard";

export default async function page() {
  const session = await currentUser();
  console.log(session);

  return (
    <div className="flex flex-col gap-3 p-2 md:p-4">
      <PageLink />
      <DashboardComponent />
    </div>
  );
}
