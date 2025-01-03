import { BellIcon, BriefcaseIcon, Calendar, ChevronsRightIcon, FileTextIcon, HomeIcon, LayoutGridIcon, MenuIcon, UserIcon, Users } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/server/auth'
import ProfileComponent from "./components/profile"
import { ModeToggle } from "~/components/ModeToogle"
import { IconGraph, IconGraphFilled } from "@tabler/icons-react"
import { RoleGate } from '~/components/rolegate'
import { USERROLE } from '@prisma/client'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <RoleGate allowedRoles={USERROLE.ADMIN}>
        <div className="flex min-h-screen w-full">
          <Sidebar session={session} />
          <div className="flex flex-1 flex-col overflow-x-hidden">
            <LayoutHeader session={session} />
            {children}
          </div>
        </div>
      </RoleGate>
    </SessionProvider>
  )
}

function Sidebar({ session }: { session: any }) {
  return (
    <div className="hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href="#" className="font-bold" prefetch={false}>
          Tielinks
        </Link>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col space-y-1 p-2">
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <IconGraph className="mr-3 h-5 w-5" />
            Stats
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <Users className="mr-3 h-5 w-5" />
            Users
          </Link>
        </div>
      </nav>
    </div>
  )
}

function LayoutHeader({ session }: { session: any }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b bg-background px-4 shadow-sm md:px-6">
      <div className="flex flex-1 items-center space-x-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h2 className="text-lg font-semibold">Tielinks Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <ProfileComponent session={session} />
      </div>
    </header>
  )
}