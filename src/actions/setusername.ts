// get username from form
"use server";

import { currentUser } from "~/server/user";
import { db } from "~/server/db";

export default async function SetUsername(data: any) {
  const userid = await currentUser();
  const id = userid?.id;
  const username = data?.username;

  if (!id) {
    return { error: "You must be logged in to set your username." };
  }

  if (!username) {
    return { error: "Username must not be empty." };
  }

  // check if resently updated the username from usernameUpdatedAt from same user
  const user = await db.user.findFirst({
    where: { id: id },
  });

  if (user?.usernameUpdatedAt) {
    const updatedAt = user.usernameUpdatedAt;
    const now = new Date();
    const diff = Math.abs(now.getTime() - updatedAt.getTime());
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return {
        error:
          "You can update username only once a week. You can now change again after " +
          (7 - diffDays) +
          " days.",
      };
    }
  }

  if (username === userid?.username) {
    return { error: "Username is the same." };
  }

  // check if username is already taken
  const existingUser = await db.user.findFirst({
    where: { username: username },
  });

  if (existingUser) {
    return { error: "Username is already taken." };
  }

  // update username
  const newusername = await db.user.update({
    where: { id: id },
    data: {
      username: username,
      usernameUpdatedAt: new Date(),
    },
  });

  await db.settings.create({
    data: {
      userId: id,
    },
  });

  return { success: "Username updated." };
}
