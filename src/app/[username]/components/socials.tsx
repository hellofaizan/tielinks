import React from "react";
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
  IconBrandProducthunt,
} from "@tabler/icons-react";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default function SocialsComponent({ socials }: { socials: any }) {
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
            className="ml-1 text-[#ee2a7b] hover:scale-105"
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
        return <IconBrandGithub size={35} className="ml-1 hover:scale-105" />;
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
      case "producthunt":
        return (
          <IconBrandProducthunt
            size={35}
            className="ml-1 text-[#da552f] hover:scale-105"
          />
        );
      case "peerlist":
        return (
          <img
            className="ml-1 h-[32px] w-[32px] hover:scale-105"
            src="/assets/peerlistlogo.svg"
            alt="peerlist"
          />
        );
      default:
        return <LinkIcon size={35} className="ml-1" />;
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
        return "https://t.me/" + social?.handle;
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
      case "producthunt":
        return "https://producthunt.com/@" + social?.handle;
      case "whatsapp":
        return "https://wa.me/" + social?.handle;
      case "peerlist":
        return "https://peerlist.io/" + social?.handle;
      default:
        return "";
    }
  };

  return (
    <div className="mt-4 flex w-full flex-row justify-center">
      {socials?.map((social: any) => (
        <Link
          href={socialLinks({ social })}
          target="_blank"
          rel="noreferrer"
          key={social.type}
        >
          {socialIcons(social.type)}
        </Link>
      ))}
    </div>
  );
}
