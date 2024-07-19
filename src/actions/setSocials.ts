// get name from form
"use server";

import { db } from "~/server/db";
import { currentUser } from "~/server/user";
import { userData } from "~/server/userdata";

export default async function SetSocials(data: any) {
  const userid = await currentUser();
  const id = userid?.id;
  const user = await userData(id as string);
  const socialsData = data.socials;

  if (!id) {
    return { error: "You must be logged in to update your profile" };
  }

  const socials = await db.socials.findMany({
    where: {
      userId: id,
    },
  });

  // update the socials if they exist
  socialsData.forEach(async (social: any) => {
    const existingSocial = socials.find((s) => s.type === social.type);
    if (existingSocial) {
      await db.socials.update({
        where: {
          id: existingSocial.id,
        },
        data: {
          handle: social.handle,
        },
      });
    } else {
      await db.socials.create({
        data: {
          ...social,
          userId: id,
        },
      });
    }
    return;
  });

  // if both is existing social being updatd and new socials being created
  // then we need to remove the old socials that are not in the new socials

  return { success: "Socials Created." };
}
