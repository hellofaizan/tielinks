// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function RemoveLink(id: any) {
  const session = await currentUser();
  const userid = session?.id;

  if (!userid) {
    return { error: "You must be logged in to delete the link" };
  }

  if (!id) {
    return { error: "Enter a valid link id" };
  }

  await db.links.delete({
    where: {
      id: id,
    },
  });

  return { success: "Link has been removed successfully!" };
}
