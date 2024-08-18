import { db } from "./db";
import { auth } from "./auth";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        Socials: true,
        Status: true,
        Links: {
          include: {
            linkClicks: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserSettings = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        Settings: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const fullUserData = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        Socials: true,
        Links: {
          where: {
            hidden: false,
          },
          include: {
            linkClicks: true,
          },
        },
        pageVisits: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        Socials: true,
        Status: true,
        Links: {
          where: {
            hidden: false,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const currentUsername = async () => {
  const session = await auth();

  return session?.user?.username;
};
