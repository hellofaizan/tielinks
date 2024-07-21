// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function EditLink({
  data,
  id,
}: {
  data: any;
  id: number;
}) {
  const session = await currentUser();
  const userid = session?.id;

  if (!userid) {
    return { error: "You must be logged in to save the link" };
  }

  if (!data) {
    return { error: "Enter a valid link and title" };
  }

  // edit the link
  if (data && id) {
    await db.links.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        url: data.url,
      },
    });
  }

  return { success: "Link has been saved to your profile!!" };
}
