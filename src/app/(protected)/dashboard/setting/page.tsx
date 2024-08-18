import React from "react";
import { userSettings } from "~/server/userdata";
import { currentUser } from "~/server/user";

export default async function page() {
  const session = await currentUser();
  const user = await userSettings(session?.id as string);
  console.log(user);
  return <div>Settings</div>;
}
