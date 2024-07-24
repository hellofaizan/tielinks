"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  HomeIcon,
  LinkIcon,
  Settings,
  MessageSquare,
  ChartLine,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export default function Sidebar({ session }: { session: any }) {
  const username = session?.user?.username;
  const path = usePathname();
  return (
    <div className="hidden h-full w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href="#" className="font-bold" prefetch={false}>
          Tielinks
        </Link>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col space-y-1 p-2">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              path === "/dashboard" && "bg-muted text-foreground",
            )}
            prefetch={false}
          >
            <HomeIcon className="mr-3 h-5 w-5" />
            Home
          </Link>

          <Link
            href="/dashboard/analytics"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              path === "/dashboard/analytics" && "bg-muted text-foreground",
            )}
            prefetch={false}
          >
            <ChartLine className="mr-3 h-5 w-5" />
            <div className="flex items-center justify-between w-full">
              Analytics <Badge variant="outline">Premium</Badge>
            </div>
          </Link>
          <Link
            href="/dashboard/whisper"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              path === "/dashboard/whisper" && "bg-muted text-foreground",
            )}
            prefetch={false}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            <div className="flex items-center justify-between w-full">
              Whisper <Badge variant="outline">Soon...</Badge>
            </div>
          </Link>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="projects">
              <AccordionTrigger className="flex items-center gap-3 rounded-md px-3 py-0 hover:bg-muted hover:text-foreground">
                <div className="flex items-center rounded-md py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-8">
                  <Link
                    href="/dashboard/links"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      path === "/dashboard/links" &&
                        "bg-muted/60 text-foreground",
                    )}
                    prefetch={false}
                  >
                    <span>Links</span>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      path === "/dashboard/profile" &&
                        "bg-muted/60 text-foreground",
                    )}
                    prefetch={false}
                  >
                    <span>Profile</span>
                  </Link>

                  <Link
                    href="/dashboard/username"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      path === "/dashboard/username" &&
                        "bg-muted/60 text-foreground",
                    )}
                    prefetch={false}
                  >
                    <span>Username</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* more sidebar items */}
        </div>
      </nav>
      {username != null ? (
        <div
          className="flex shrink-0 items-center border-t p-4"
          title="Go to your profile"
        >
          <Link
            href={`/${session?.user.username}`}
            target="_blank"
            className="group flex w-full items-center space-x-4"
            prefetch={false}
          >
            <Avatar>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>TIE</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name || "NULL"}
              </p>
              <p className="text-xs text-muted-foreground">
                {session?.user?.email || "NULL"}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      ) : (
        <div
          className="flex shrink-0 items-center border-t p-4"
          title="Go to your profile"
        >
          <Link
            href={`/dashboard/username`}
            className="group flex w-full items-center space-x-4"
            prefetch={false}
          >
            <LinkIcon size={15} className="mr-2" /> Setup your profile
          </Link>
        </div>
      )}
    </div>
  );
}
