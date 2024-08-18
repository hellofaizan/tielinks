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
          <main className="flex w-full flex-1 items-start pl-2">
            <div className="w-full flex-auto md:w-[40%] lg:w-[50%]">
              <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-2 border-b px-4 sm:static sm:h-16 sm:px-6 bg-transparent backdrop-blur-xl">
                <MobileNav />
                {/* <LayoutHeader session={session} /> */}
                <h2 className="w-full text-lg font-semibold">
                  👋 {firstName}!
                </h2>
                <div className="right-0 flex w-full items-center justify-end space-x-2">
                  <ModeToggle btnClass={"hover:bg-muted"} />
                  <Link href="https://discord.gg/QuNdFzdKMx" prefetch={false}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted"
                    >
                      <IconBrandDiscord className="h-5 w-5" />
                    </Button>
                  </Link>
                  <ProfileComponent session={session} />
                </div>
              </header>
              {children}
            </div>
            <div className="hidden min-h-[90vh] items-center justify-center border-l lg:flex lg:flex-auto">
              {session?.user?.username ? (
                <iframe
                  src={`${process.env.NEXT_PUBLIC_Website_URL}/${session?.user.username}`}
                  className="min-h-screen h-full w-full"
                  title="Preview"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold">Welcome to Tielinks</h2>
                  <Link href="/dashboard/username" className="mt-2">
                    <Button variant="outline">
                      {" "}
                      ✨ Choose unique username
                    </Button>
                  </Link>
                </div>
              )}
            </div>
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
        <Button size="icon" variant="outline" className="px-2 md:hidden">
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
