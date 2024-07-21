"use server";

import { db } from "~/server/db";
import { currentUser, getUserById } from "~/server/user";

export default async function SetStatus({ data }: { data: any }) {
  const usersession = await currentUser();
  const userid = usersession?.id;
  const user = getUserById(userid as string);
  console.log(data);

  if (!userid) {
    return { error: "You must be logged in to update your profile" };
  }

  const status = await db.user.findUnique({
    where: { id: userid },
    select: { Status: true },
  });
  const statusData = status?.Status;

  // if there is status just update that, dont create a new one
  if (status?.Status) {
    await db.status.update({
      where: {
        id: statusData?.id,
      },
      data: {
        emoji: data.emoji,
        status: data.status,
      },
    });

    return { success: "Profile updated." };
  }

  await db.status.create({
    data: {
      emoji: data.emoji,
      status: data.status,
      userId: userid,
    },
  });

  return { success: "Profile updated." };
}
