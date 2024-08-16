// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function UnHideLink({
  id,
  data,
}: {
  id: number;
  data: any;
}) {
  const session = await currentUser();
  const userid = session?.id;

  if (!userid) {
    return { error: "You must be logged in to save the link" };
  }

  // edit the link
  if (id) {
    await db.links.update({
      where: {
        id: id,
        userId: userid,
      },
      data: {
        hidden: data.hidden,
      },
    });
    return { success: true };
  }

  return { success: false };
}

export async function HideLink({
  id,
  data,
}: {
  id: number;
  data: any;
}) {
  const session = await currentUser();
  const userid = session?.id;

  if (!userid) {
    return { error: "You must be logged in to save the link" };
  }

  // edit the link
  if (id) {
    await db.links.update({
      where: {
        id: id,
        userId: userid,
      },
      data: {
        hidden: data.hidden,
      },
    });
    return { success: true };
  }

  return { success: false };
}
