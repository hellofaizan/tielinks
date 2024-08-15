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
import SocialsComponent from "./components/socials";

export default async function ProfilePage() {
  const session = await currentUser();
  const user = await userData(session?.id as string);
  const socials = user?.Socials;

  return (
    <div className="mb-3 flex h-full w-full p-1">
      <div className="lg:mx-2 mt-3 h-full w-full flex-col gap-2 lg:flex-1">
        <p className="text-center text-4xl font-bold mb-4">Add Links</p>
        <SocialsComponent data={socials} />
      </div>
      <div className="lg:mx-2 mt-3 hidden items-center justify-center lg:flex lg:flex-1">
        {/* <iframe
        src={`${process.env.NEXT_PUBLIC_Website_URL}/${session?.username}`}
        className="h-full w-full border-0"
        title="Preview"
      /> */}
        {/* TODO: Preview */}
        comming soon
      </div>
    </div>
  );
}
