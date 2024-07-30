// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";

export default async function SaveLinks(data: any) {
  const userid = await currentUser();
  const id = userid?.id;

  if (!id) {
    return { error: "You must be logged in to save the link" };
  }

  if (!data) {
    return { error: "Enter a valid link and title" };
  }

  if (data) {
    await db.links.create({
      data: {
        title: data.title,
        url: data.url,
        embed: data.embed,
        user: {
          connect: {
            id: id,
          },
        },
      },
    });
  }

  return { success: "Link has been saved to your profile!!" };
}
