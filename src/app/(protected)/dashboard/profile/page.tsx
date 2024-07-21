import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import UserPage from "./components/userdata";
import { userData } from "~/server/userdata";
import { currentUser } from "~/server/user";
import PFPImage from "./components/pfpimage";
import Banner from "./components/banner";
import StatusComponent from "./components/status";

export default async function ProfilePage() {
  const session = await currentUser();
  const user = await userData(session?.id as string);

  return (
    <div className="my-2 flex w-full flex-col items-center justify-center">
      <Card className="m-2 w-full rounded-md lg:w-2/5">
        <CardContent className="p-0">
          <Banner user={user} />
        </CardContent>
      </Card>

      <Card className="m-2 w-full rounded-md lg:w-2/5">
        <CardContent className="p-4">
          <PFPImage user={user} />
        </CardContent>
      </Card>

      <Card className="m-2 w-full rounded-md lg:w-2/5">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserPage user={user} />
        </CardContent>
      </Card>

      <Card className="m-2 w-full rounded-md lg:w-2/5">
        <CardHeader>
          <CardTitle>Edit Status</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusComponent user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
