import { BellIcon, BriefcaseIcon, Calendar, ChevronsRightIcon, FileTextIcon, HomeIcon, LayoutGridIcon, LinkIcon, MenuIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/server/auth'
import ProfileComponent from "./dashboard/components/profile"
import { ModeToggle } from "~/components/ModeToogle"
import { IconLink } from "@tabler/icons-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen w-full">
        <Sidebar session={session} />
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <LayoutHeader session={session} />
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}

function Sidebar({ session }: { session: any }) {
  const username = session?.user?.username
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
            <HomeIcon className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <LayoutGridIcon className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <BriefcaseIcon className="mr-3 h-5 w-5" />
            Projects
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UserIcon className="mr-3 h-5 w-5" />
            Team
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <Calendar className="mr-3 h-5 w-5" />
            Calendar
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <FileTextIcon className="mr-3 h-5 w-5" />
            Documents
          </Link>
        </div>
      </nav>
      {username != null ? (
        <div className="flex shrink-0 items-center border-t p-4" title="Go to your profile">
          <Link href={`/${session?.user.username}`} className="group flex w-full items-center space-x-4" prefetch={false}>
            <Avatar>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>TIE</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user?.name || "NULL"}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email || "NULL"}</p>
            </div>
            <ChevronsRightIcon className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      ) : (
        <div className="flex shrink-0 items-center border-t p-4" title="Go to your profile">
          <Link href={`/dashboard/username`} className="group flex w-full items-center space-x-4" prefetch={false}>
            <LinkIcon size={15} className="mr-2" /> Setup your profile
          </Link>
        </div>
      )}
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
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <ProfileComponent session={session} />
      </div>
    </header>
  )
}