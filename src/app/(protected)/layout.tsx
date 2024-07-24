import { Button } from "~/components/ui/button";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import ProfileComponent from "./dashboard/components/profile";
import { ModeToggle } from "~/components/ModeToogle";
import { Toaster } from "~/components/ui/toaster";
import Sidebar from "./dashboard/components/sidebar";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import SidebarMobile from "./dashboard/components/sidebarmob";
import Link from "next/link";
import { IconBrandDiscord } from "@tabler/icons-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <SidebarLayout />
        <div className="flex flex-col md:pl-64">
          <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-2 border-b bg-background px-4 sm:static sm:h-16 sm:border-0 sm:px-6">
            <MobileNav />
            {/* <LayoutHeader session={session} /> */}
            <h2 className="w-full text-lg font-semibold">
              Welcome! {firstName}
            </h2>
            <div className="right-0 flex w-full items-center justify-end space-x-2">
              <ModeToggle btnClass={"hover:bg-muted"}/>
              <Link href="https://discord.gg/QuNdFzdKMx" prefetch={false}>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <IconBrandDiscord className="h-5 w-5" />
                </Button>
              </Link>
              <ProfileComponent session={session} />
            </div>
          </header>
          <main className="flex-1 items-start px-2 sm:py-0 md:gap-4">
            {children}
            <Toaster />
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden h-screen w-64 flex-col border-r bg-background md:flex">
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
        <Button size="icon" variant="outline" className="md:hidden px-2">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full p-0 py-2 sm:max-w-xs">
        <nav className="h-full flex-col items-center gap-4 px-2">
          <SidebarMobile session={session} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
