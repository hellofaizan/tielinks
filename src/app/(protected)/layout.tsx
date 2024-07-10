import React from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { auth } from '~/server/auth'

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div>
        {/* Common Side Bar Here */}
        {children}
      </div>
    </SessionProvider>
  )
}