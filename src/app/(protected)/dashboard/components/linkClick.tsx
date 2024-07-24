import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { currentUser } from "~/server/user";
import { userData } from "~/server/userdata";
import { TotalLinkClicks } from "~/actions/getAnalytics";
import LinkStats from "./linkTable";

export default async function LinkTable() {
  const session = await currentUser();
  const user = await userData(session?.id || "");
  const totalLinkClicks = await TotalLinkClicks({ userId: user?.id || "" });

  return (
    <div>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Link Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <LinkStats data={totalLinkClicks}/>
        </CardContent>
      </Card>
    </div>
  );
}
