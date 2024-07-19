"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function RemoveSocial({ social }: { social: any }) {
  const user = await currentUser();
  const userId = user?.id;
  const { type } = social;
  console.log(social);

  if (!userId) {
    return { error: "You must be logged in to update your profile" };
  }

  const findSocial = await db.socials.findFirst({
    where: {
      userId: userId,
      type: type,
    },
  });
  if (!findSocial) {
    return { error: "Social not found." };
  }

  await db.socials.deleteMany({
    where: {
      userId: userId,
      type: type,
    },
  });

  return { success: "Profile updated." };
}
