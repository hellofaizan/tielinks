// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function HideLink({ id }: { id: number }) {
  const session = await currentUser();
  const userid = session?.id;

  console.log("hide " + id);

  if (!userid) {
    return { error: "You must be logged in to save the link" };
  }

  // edit the link
  if (id) {
    await db.links.update({
      where: {
        id: id,
      },
      data: {
        hidden: true,
      },
    });
  }

  return { success: "Link has been saved to your profile!!" };
}
