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
} from "@tabler/icons-react";
import { LinkIcon, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const user = await getUserByUsername(username);

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
        return "https://discord.com/" + social?.handle;
      case "reddit":
        return "https://reddit.com/" + social?.handle;
      case "spotify":
        return "https://spotify.com/" + social?.handle;
      case "twitch":
        return "https://twitch.com/" + social?.handle;
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
    <div className="flex min-h-dvh justify-center md:min-h-screen">
      {user?.username === username ? (
        <div className="absolute bottom-0 right-0 z-10 mb-4 mr-4">
          <Link href="/dashboard">
            <Button variant={"outline"}>
              <Pencil size={15} className="mr-1" /> Edit Profile
            </Button>
          </Link>
        </div>
      ) : null}

      {/* Share Button and theme toggle */}
      
      <div className="flex w-full flex-col md:w-1/3">
        {user?.banner ? (
          <img
            src={user?.banner || ""}
            className="w-full bg-cover bg-center gradient-mask-b-60"
          />
        ) : (
          <div className="h-40 bg-gradient-to-r from-[#FF0080] to-[#7928CA] gradient-mask-b-10"></div>
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
                  className="flex h-12 w-full items-center justify-center rounded-full border text-center hover:scale-[1.02]"
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
