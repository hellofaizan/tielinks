"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function RemoveBanner() {
  const userid = await currentUser();
  const id = userid?.id;

  if (!id) {
    return { error: "You must be logged in to update your profile" };
  }

  // update name
  await db.user.update({
    where: { id: id },
    data: {
      banner: null,
    },
  });

  return { success: "Profile updated." };
}
