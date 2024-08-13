"use client";

import React from "react";
import Link from "next/link";
import ShareLink from "./sharelink";
import { Spotify } from "react-spotify-embed";
import SpotifyPreview from "../../../components/SpotifyPreview";
import Image from "next/image";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function LinksComponent({
  links,
  username,
  userId,
}: {
  links: any;
  username: string;
  userId: string;
}) {
  return (
    <>
      {links?.map((link: any) => (
        <div
          className="mt-5 flex w-full flex-col items-center gap-3 px-2"
          key={link?.id}
        >
          {
            // is link in a youtube video, embed it
            link?.url.includes("open.spotify.com/track") &&
            link?.embed === true ? (
              <div className="relative w-full overflow-hidden rounded-md hover:scale-[1.02] dark:bg-[#171717]">
                <div className="relative w-full overflow-hidden rounded-lg border hover:scale-[1.02] dark:bg-[#171717]">
                  {/* <ShareLink
                    link={link?.url}
                    title={link?.title}
                    username={username}
                    className="top-1"
                  /> */}
                  <SpotifyPreview
                    url={link?.url}
                    userId={userId}
                    linkId={link?.id}
                    linkURL={link?.url}
                  />
                </div>
              </div>
            ) : link?.url.includes("youtu.be/") && link?.embed === true ? (
              <div className="relative min-h-max w-full overflow-hidden rounded-lg border hover:scale-[1.02] dark:bg-[#171717]">
                <ShareLink
                  link={link?.url}
                  title={link?.title}
                  username={username}
                  className="top-2"
                />
                <Link
                  ping={`/api/visitCounter?id=${userId}&link=${link?.id}`}
                  href={link?.url}
                  target="_blank"
                  className="relative flex h-full w-full items-center justify-center text-center"
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src={`https://img.youtube.com/vi/${link?.url.split("/").pop().split("?").shift()}/maxresdefault.jpg`}
                      width={1920}
                      height={1080}
                      alt="Youtube Video"
                      className="inset-0"
                    />
                    <IconPlayerPlayFilled
                      size={37}
                      className="absolute z-10 -mt-4 items-center justify-start rounded-full border border-white p-1 text-white shadow-2xl"
                    />
                  </div>
                  <div className="absolute bottom-0 h-[35%] w-full bg-gradient-to-b from-black/0 to-black"></div>
                  <span className="longtext absolute bottom-0 left-0 mb-5 max-w-[90%] overflow-y-auto pl-5 font-mono text-white md:text-xl">
                    {link?.title}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="relative flex h-[52px] w-full items-center justify-center rounded-lg border hover:scale-[1.02] dark:bg-[#171717]">
                <Link
                  ping={`/api/visitCounter?id=${userId}&link=${link?.id}`}
                  href={link?.url}
                  target="_blank"
                  className="flex h-full w-full items-center justify-center text-center"
                >
                  {link?.title}
                </Link>

                <ShareLink
                  link={link?.url}
                  title={link?.title}
                  username={username}
                />
              </div>
            )
          }
        </div>
      ))}
    </>
  );
}
