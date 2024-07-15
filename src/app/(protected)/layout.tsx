import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import ProfileComponent from "./dashboard/components/profile";
import { ModeToggle } from "~/components/ModeToogle";
import { Toaster } from "~/components/ui/toaster";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/ui/accordion";
import { IconFileAnalytics } from "@tabler/icons-react";
import Sidebar from "./dashboard/components/sidebar";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  BellIcon,
  BriefcaseIcon,
  Calendar,
  ChevronsRightIcon,
  FileTextIcon,
  HomeIcon,
  LayoutGridIcon,
  LinkIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import SidebarMobile from "./dashboard/components/sidebarmob";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      {/* <div className="flex min-h-screen w-full">
        <Sidebar session={session} />
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <LayoutHeader session={session} />
          {children}
          <Toaster />
        </div>
      </div> */}
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <SidebarLayout />
        <div className="flex flex-col md:pl-64">
          <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-4 sm:static sm:h-16 sm:border-0 sm:px-6">
            <MobileNav />
            {/* <LayoutHeader session={session} /> */}
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="flex items-center justify-end space-x-4 right-0 w-full">
              <ModeToggle />
              <ProfileComponent session={session} />
            </div>
          </header>
          <main className="flex-1 items-start px-2 sm:py-0 md:gap-4">
            {children}
          </main>
        </div>
        {/* <Analytics /> */}
      </main>
    </SessionProvider>
  );
}

async function SidebarLayout() {
  const session = await auth();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 h-screen w-64 flex-col border-r bg-background hidden md:flex">
      <nav className="h-full flex-col items-center gap-4 px-2">
        <Sidebar session={session} />
      </nav>
    </aside>
  );
}

async function MobileNav() {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs p-0 py-2 pl-2 h-full">
        <SidebarMobile session={session} />
      </SheetContent>
    </Sheet>
  );
}
