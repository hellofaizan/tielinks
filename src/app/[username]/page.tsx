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
import { Link } from "lucide-react";

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
        return <IconBrandTwitter size={35} className="ml-1 text-[#1DA1F2] hover:scale-105" />;
      case "instagram":
        return <IconBrandInstagram size={35} className="ml-1 text-[#E1306C] hover:scale-105" />;
      case "facebook":
        return <IconBrandFacebook size={35} className="ml-1 text-[#4267B2] hover:scale-105" />;
      case "github":
        return <IconBrandGithub size={30} className="ml-1" />;
      case "telegram":
        return <IconBrandTelegram size={35} className="ml-1 text-[#24A1DE] hover:scale-105" />;
      case "tiktok":
        return <IconBrandTiktok size={35} className="ml-1 text-[#ff0050] hover:scale-105" />;
      case "youtube":
        return <IconBrandYoutube size={35} className="ml-1 text-[#FF0000] hover:scale-105" />;
      case "discord":
        return <IconBrandDiscord size={35} className="ml-1 text-[#5865F2] hover:scale-105" />;
      case "reddit":
        return <IconBrandReddit size={35} className="ml-1 text-[#FF5700] hover:scale-105" />;
      case "spotify":
        return <IconBrandSpotify size={35} className="ml-1 text-[#1DB954] hover:scale-105" />;
      case "twitch":
        return <IconBrandTwitch size={35} className="ml-1 text-[#6441a5] hover:scale-105" />;
      default:
        return <Link size={30} className="ml-1" />;
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col md:w-1/3">
        <img
          src={user?.banner || ""}
          className="gradient-mask-b-0 w-full bg-cover bg-center"
        />
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
          <div className="mt-4 flex w-full flex-col">
            <p className="text-center font-sans text-base font-normal">
              {user?.about || ""}
            </p>
          </div>
          {/* icons */}
          <div className="mt-4 flex w-full flex-row justify-center">
            {user?.Socials?.map((social) => (
              <a
                href={social.handle}
                target="_blank"
                rel="noreferrer"
                key={social.type}
              >
                {socialIcons(social.type)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
