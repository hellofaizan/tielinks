import React from "react";
import { getUserByUsername } from "~/server/user";

export default async function page({ params }: { params: { username: string } }) {
  const username = params.username;
  const user = await getUserByUsername(username);
  // get username from the URL
  return <div>Your Username: {JSON.stringify(user)}</div>;
}
