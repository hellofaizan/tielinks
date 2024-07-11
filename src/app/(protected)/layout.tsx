import { BellIcon, BriefcaseIcon, Calendar, ChevronsRightIcon, FileTextIcon, HomeIcon, LayoutGridIcon, LinkIcon, MenuIcon, Settings, UserIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/server/auth'
import ProfileComponent from "./dashboard/components/profile"
import { ModeToggle } from "~/components/ModeToogle"
import { Toaster } from "~/components/ui/toaster"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion"
import { IconFileAnalytics } from "@tabler/icons-react"
import Sidebar from "./dashboard/components/sidebar"

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
          <Toaster />
        </div>
      </div>
    </SessionProvider>
  )
}

function LayoutHeader({ session }: { session: any }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b bg-background px-4 shadow-sm md:px-6">
      <div className="flex flex-1 items-center space-x-4">
        <Button variant="ghost" size="icon">
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