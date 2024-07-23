import React from "react";
import { currentUser, fullUserData } from "~/server/user";
import PageLink from "./components/pagelink";
import DashboardComponent from "./components/dashoard";
import { PageVisitGraph } from "./components/pageVisitGraph";

export default async function page() {
  const session = await currentUser();
  const user = await fullUserData(session?.id || "");

  return (
    <div className="flex flex-col gap-3 p-2 md:p-4 w-full">
      <PageLink />
      <DashboardComponent />
    </div>
  );
}
