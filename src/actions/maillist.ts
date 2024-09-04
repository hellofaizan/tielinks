"use server";

import { db } from "~/server/db";
import { onMaillist } from "~/server/user";

export default async function Maillist({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  if (!email) {
    return { error: "A valid email id is required" };
  }

  const alreadySigned = await onMaillist(email, id);

  if (alreadySigned) return { error: "You are already on the mailing list" };

  await db.maillist.create({
    data: {
      email,
      userId: id,
    },
  });

  return { success: "You have been added to the mailing list" };
}
