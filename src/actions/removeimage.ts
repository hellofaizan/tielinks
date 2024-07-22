// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";
import { userData } from "~/server/userdata";

export default async function RemoveImage() {
  const userid = await currentUser();
  const id = userid?.id;

  if (!id) {
    return { error: "You must be logged in to update your profile" };
  }

  // update name
  await db.user.update({
    where: { id: id },
    data: {
      image: null,
    },
  });

  return { success: "Profile updated." };
}