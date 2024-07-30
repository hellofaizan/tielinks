import React from "react";
import { getUserByUsername } from "~/server/user";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Pencil, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "~/components/ModeToogle";
import { auth } from "~/server/auth";
import type { Metadata, ResolvingMetadata } from "next";
import LinksComponent from "./links";
import SocialsComponent from "./socials";
import ShareProfile from "./shareprofile";
import { headers } from "next/headers";
import VisitCouter from "~/actions/visitCounter";
import { TotalViews } from "~/actions/getAnalytics";

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.username;

  // fetch data
  const user = await getUserByUsername(id);

  return {
    title: user?.name + "'s Profile | Tielinks",
    description:
      user?.about +
      " | " +
      user?.name +
      " is on Tielinks | A fancy and cool link in bio | Share all links in one place",
    icons: [
      {
        url: user?.image || "",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: user?.image || "",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: user?.image || "",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    applicationName: "Tielinks",
    creator: "HelloFaizan",
    twitter: {
      site: "@tielinksgg",
      creator: "@hellofaizaan",
      card: "summary_large_image",
      title: user?.name + "'s Profile | Tielinks",
      description:
        user?.about +
        " | Tielinks | A fancy and cool link in bio | Share all links in one place",
    },
    openGraph: {
      title: user?.name + "'s Profile | Tielinks",
      description:
        user?.about +
        " | Tielinks | A fancy and cool link in bio | Share all links in one place",
    },
  };
}

export default async function page({ params }: Props) {
  const username = params.username;
  const user = await getUserByUsername(username);
  const session = await auth();
  const currentUser = session?.user;
  const request_headers = headers();
  const totalViews = TotalViews({ userId: user?.id || "" });

  await VisitCouter({ userId: user?.id || "", request_headers }).catch(
    (err) => {
      console.log;
    },
  );

  if (!user) {
    return (
      <>
        <div className="flex min-h-dvh items-center justify-center">
          <h1 className="font-sans text-2xl font-semibold">User Not Found</h1>
        </div>
      </>
    );
  }

  return (
    <div
      className="flex min-h-dvh justify-center md:min-h-screen mb-6"
    >
      {user?.username === currentUser?.username ? (
        <div className="fixed bottom-0 right-0 z-10 mb-4 mr-4">
          <Link href="/dashboard" target="_blank">
            <Button variant={"outline"}>
              <Pencil size={15} className="mr-1" /> Edit Profile
            </Button>
          </Link>
        </div>
      ) : null}

      {/* Share Button and theme toggle */}

      <div className="flex w-full flex-col md:w-1/3">
        {user?.banner ? (
          <div className="relative">
            <Image
              src={user?.banner || ""}
              className="w-full bg-cover bg-center gradient-mask-b-60"
              alt="Banner"
              width={500}
              height={200}
              priority
            />
            <div className="fixed right-0 top-0 z-10 mr-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <ShareProfile username={username} />
              <ModeToggle
                btnClass={"dark:hover:text-gray-300 hover:text-gray-700"}
              />
            </div>
            <div className="absolute left-0 top-0 z-10 ml-3 mt-3 flex rounded-full border border-gray-500/20 bg-gray-500/15 backdrop-blur-3xl">
              <p className="flex p-1 px-2 text-xs">
                <Eye size={15} className="mr-1" /> {totalViews || ""}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative h-32 bg-gradient-to-r from-[#FF0080] to-[#7928CA] gradient-mask-b-10">
            <div className="absolute right-0 top-0 z-10 mr-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <ShareProfile username={username} />
              <ModeToggle
                btnClass={"dark:hover:text-gray-300 hover:text-gray-700"}
              />
            </div>
            <div className="absolute left-0 top-0 z-10 ml-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <p className="flex p-1 px-2 text-xs">
                <Eye size={15} /> 6969
              </p>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col justify-center px-2 md:px-4">
          <div className="-mt-6 flex h-full w-full flex-row items-center justify-center">
            <Avatar className="h-24 w-24 md:h-28 md:w-28">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>TIE</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex h-full flex-row items-center justify-center">
              <div className="flex w-full flex-col">
                <h1 className="font-sans text-2xl font-semibold md:text-2xl">
                  {user?.name}
                </h1>
                <p className="font-mono text-base font-extralight text-gray-500">
                  <span className="mr-2">{user?.Status?.emoji || ""}</span>
                  {user?.Status?.status || ""}
                </p>
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="mt-4 flex w-full flex-col">
            <p className="text-center font-sans text-base font-normal">
              {user?.about || ""}
            </p>
          </div>
          {/* icons */}
          <SocialsComponent socials={user?.Socials || []} />
          {/* Links */}
          <LinksComponent
            links={user?.Links || []}
            username={username || ""}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  );
}
