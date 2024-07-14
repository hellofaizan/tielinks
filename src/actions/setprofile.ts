// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";
import { userData } from "~/server/userdata";

export default async function SetProfile(data: any) {
  const userid = await currentUser();
  const id = userid?.id;
  const user = await userData(id as string);
  const name = data?.name;
  const about = data?.about;

  if (!id) {
    return { error: "You must be logged in to update your profile" };
  }

  if (name === user?.name) {
    // update about
    await db.user.update({
      where: { id: id },
      data: {
        about: about,
      },
    });

    return { success: "About section updated." };
  }

  // update name
  await db.user.update({
    where: { id: id },
    data: {
      name: name,
      about: about,
    },
  });

  return { success: "Profile updated." };
}
