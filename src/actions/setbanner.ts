"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function SetBanner(data: any) {
  const userid = await currentUser();
  const id = userid?.id;
  const banner = data?.banner;

  if (!id) {
    return { error: "You must be logged in to update your profile" };
  }

  // update name
  await db.user.update({
    where: { id: id },
    data: {
      banner: banner,
    },
  });

  return { success: "Profile updated." };
}
