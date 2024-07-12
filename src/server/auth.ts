import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "~/server/auth.config"
import { db } from "./db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "./user"
import { USERROLE } from "@prisma/client"

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  interface Session {
    user: {
      /** The user's postal address. */
      role: USERROLE, // eslint-disable-line @typescript-eslint/no-explicit-any
      username: string, // eslint-disable-line @typescript-eslint/no-explicit-any
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth({
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        }
      })
    }
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as USERROLE
      }
      if (token.username && session.user) {
        session.user.username = token.username as string
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token;

      token.role = existingUser.role
      token.username = existingUser.username

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})