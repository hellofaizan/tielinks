// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";
import { userData } from "~/server/userdata";

export default async function SaveLinks(data: any) {
  const userid = await currentUser();
  const id = userid?.id;
  const user = await userData(id as string);
  console.log(data);

  if (!id) {
    return { error: "You must be logged in to update your profile" };
  }

  // if both is existing social being updatd and new socials being created
  // then we need to remove the old socials that are not in the new socials

  return { success: "Link has been saved to your profile!!" };
}
