import React from "react";
import PageVisitGraph from "./pageVisitGraph";

export default function () {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <PageVisitGraph className="h-max w-full" />
    </div>
  );
}
