"use server";

import { db } from "~/server/db";
import { getUserById, getUserSettings } from "~/server/user";

export const ToggleEmailCollect = async ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  const user = await getUserById(id);
  if (!user) return { error: "Session expired, Login again!" };

  const settings = await db.settings.findUnique({
    where: {
      userId: id,
    },
  });

  if (settings === null) {
    await db.settings.create({
      data: {
        userId: id,
        collectEmail: enabled,
      },
    });

    return { success: "Email collection enabled!" };
  }

  await db.settings.update({
    where: {
      userId: id,
    },
    data: {
      collectEmail: enabled,
    },
  });

  return { success: "Account deleted successfully!" };
};
