import { db } from './db';
import { auth } from './auth';

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            include: {
                Socials: true
            }
        });
        return user;
    } catch (error) {
        return null;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (error) {
        return null;
    }
}

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
}

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
}

export const currentUsername = async () => {
    const session = await auth();

    return session?.user?.username;
}