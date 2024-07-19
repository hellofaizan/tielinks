import { currentUser } from "./user";
import { db } from "./db";

export const SocialsData = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return null;
  }

  const socials = await db.socials.findMany({
    where: {
      userId,
    },
  });

  return socials;
};
