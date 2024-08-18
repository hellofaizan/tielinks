import React from "react";
import { userData } from "~/server/userdata";
import { currentUser } from "~/server/user";
import LinksComponent from "./components/links";
import { Separator } from "~/components/ui/separator";

export default async function ProfilePage() {
  const session = await currentUser();
  const user = await userData(session?.id as string);
  const links = user?.Links;

  return (
    <div className="mb-3 flex h-full w-full p-1">
      <div className="lg:mx-2 mt-3 h-full w-full flex-col gap-2 lg:flex-1">
        <p className="text-center text-4xl font-bold">Add Links</p>
        <LinksComponent data={links} />
      </div>
    </div>
  );
}
