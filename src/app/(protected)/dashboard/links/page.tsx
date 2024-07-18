import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { userData } from "~/server/userdata";
import { currentUser } from "~/server/user";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import SocialsComponent from "./components/socials";

export default async function ProfilePage() {
  const session = await currentUser();
  const user = await userData(session?.id as string);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card className="m-2 w-full rounded-md lg:w-2/5">
        <CardHeader className="px-4 pb-0 pt-6">
          <CardTitle>Socials</CardTitle>
          <CardDescription>
            Link your social media accounts to your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <SocialsComponent />
        </CardContent>
      </Card>

      <Card className="m-2 w-full rounded-md lg:w-2/5">
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Add links to your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Add Socials</Button>

          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
}
