import React from "react";
import { getUserByUsername } from "~/server/user";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandDiscord,
  IconBrandTwitch,
  IconBrandReddit,
  IconBrandSpotify,
  IconBrandWhatsapp,
  IconShare,
} from "@tabler/icons-react";
import { LinkIcon, Pencil, BarChart } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ModeToogle";
import { auth } from "~/server/auth";
import type { Metadata, ResolvingMetadata } from "next";

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
      " | " + user?.name + " is on Tielinks | A fancy and cool link in bio | Share all links in one place",
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

  const socialIcons = (type: string) => {
    switch (type) {
      case "twitter":
        return (
          <IconBrandTwitter
            size={35}
            className="ml-1 text-[#1DA1F2] hover:scale-105"
          />
        );
      case "instagram":
        return (
          <IconBrandInstagram
            size={35}
            className="ml-1 text-[#E1306C] hover:scale-105"
          />
        );
      case "facebook":
        return (
          <IconBrandFacebook
            size={35}
            className="ml-1 text-[#4267B2] hover:scale-105"
          />
        );
      case "github":
        return <IconBrandGithub size={30} className="ml-1" />;
      case "telegram":
        return (
          <IconBrandTelegram
            size={35}
            className="ml-1 text-[#24A1DE] hover:scale-105"
          />
        );
      case "tiktok":
        return (
          <IconBrandTiktok
            size={35}
            className="ml-1 text-[#ff0050] hover:scale-105"
          />
        );
      case "youtube":
        return (
          <IconBrandYoutube
            size={35}
            className="ml-1 text-[#FF0000] hover:scale-105"
          />
        );
      case "discord":
        return (
          <IconBrandDiscord
            size={35}
            className="ml-1 text-[#5865F2] hover:scale-105"
          />
        );
      case "reddit":
        return (
          <IconBrandReddit
            size={35}
            className="ml-1 text-[#FF5700] hover:scale-105"
          />
        );
      case "spotify":
        return (
          <IconBrandSpotify
            size={35}
            className="ml-1 text-[#1DB954] hover:scale-105"
          />
        );
      case "twitch":
        return (
          <IconBrandTwitch
            size={35}
            className="ml-1 text-[#6441a5] hover:scale-105"
          />
        );
      case "whatsapp":
        return (
          <IconBrandWhatsapp
            size={35}
            className="ml-1 text-[#25D366] hover:scale-105"
          />
        );
      default:
        return <LinkIcon size={30} className="ml-1" />;
    }
  };

  const socialLinks = ({ social }: { social: any }) => {
    switch (social?.type) {
      case "twitter":
        return "https://twitter.com/" + social?.handle;
      case "instagram":
        return "https://instagram.com/" + social?.handle;
      case "facebook":
        return "https://facebook.com/" + social?.handle;
      case "github":
        return "https://github.com/" + social?.handle;
      case "telegram":
        return "https://telegram.com/" + social?.handle;
      case "tiktok":
        return "https://tiktok.com/" + social?.handle;
      case "youtube":
        return "https://youtube.com/" + social?.handle;
      case "discord":
        return "https://discordapp.com/users/" + social?.handle;
      case "reddit":
        return "https://reddit.com/" + social?.handle;
      case "spotify":
        return "https://spotify.com/" + social?.handle;
      case "twitch":
        return "https://twitch.com/" + social?.handle;
      case "whatsapp":
        return "https://wa.me/" + social?.handle;
      default:
        return "";
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="mb-8 flex min-h-dvh justify-center md:min-h-screen">
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
            <img
              src={user?.banner || ""}
              className="w-full bg-cover bg-center gradient-mask-b-60"
            />
            <div className="fixed right-0 top-0 z-10 mr-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-transparent hover:text-gray-700 dark:hover:text-black"
              >
                <IconShare size={20} />{" "}
              </Button>
              <ModeToggle
                btnClass={"dark:hover:text-black hover:text-gray-700"}
              />
            </div>
            <div className="absolute left-0 top-0 z-10 ml-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <p className="flex p-1 px-2 text-xs">
                <BarChart size={15} /> 6969
              </p>
            </div>
          </div>
        ) : (
          <div className="relative h-32 bg-gradient-to-r from-[#FF0080] to-[#7928CA] gradient-mask-b-10">
            <div className="absolute right-0 top-0 z-10 mr-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-transparent hover:text-gray-700 dark:hover:text-black"
              >
                <IconShare size={20} />{" "}
              </Button>
              <ModeToggle
                btnClass={"dark:hover:text-black hover:text-gray-700"}
              />
            </div>
            <div className="absolute left-0 top-0 z-10 ml-3 mt-3 flex rounded-full border bg-gray-500/15 backdrop-blur-3xl">
              <p className="flex p-1 px-2 text-xs">
                <BarChart size={15} /> 6969
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
          <div className="mt-4 flex w-full flex-row justify-center">
            {user?.Socials?.map((social) => (
              <a
                href={socialLinks({ social })}
                target="_blank"
                rel="noreferrer"
                key={social.type}
              >
                {socialIcons(social.type)}
              </a>
            ))}
          </div>
          {/* Links */}
          <div>
            <div className="mt-5 flex w-full flex-col items-center gap-3 px-2">
              {user?.Links?.map((link) => (
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.id}
                  className="flex h-12 w-full items-center justify-center rounded-lg border text-center hover:scale-[1.02] bg-[#171717]"
                >
                  <span className="rounded-md px-2 py-1">
                    {link.title || ""}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
