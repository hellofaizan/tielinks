import React, { Suspense } from "react";
import { currentUser, fullUserData } from "~/server/user";
import PageLink from "./components/pagelink";
import DashboardComponent from "./components/dashoard";
import Graphs from "./components/Graphs";
import LinkTable from "./components/linkClick";
import { Loader } from "lucide-react";

export default async function page() {
  const session = await currentUser();
  const user = await fullUserData(session?.id || "");

  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="flex w-full flex-col gap-3 p-2">
        <PageLink />
        <DashboardComponent userId={user?.id || ""} />
        <Graphs />
        <LinkTable />
      </div>
    </Suspense>
  );
}
