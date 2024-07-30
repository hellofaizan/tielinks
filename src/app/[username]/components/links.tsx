"use client";

import React from "react";
import Link from "next/link";
import ShareLink from "./sharelink";
import { Spotify } from "react-spotify-embed";

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
            link?.url.includes("open.spotify.com/track") && link?.embed === true ? (
              <div className="relative w-full overflow-hidden rounded-md border bg-[#171717] hover:scale-[1.02]">
                <Spotify wide link={link?.url} />
              </div>
            ) : link?.url.includes("youtu.be/") && link?.embed === true ? (
              <div className="relative min-h-max w-full overflow-hidden rounded-md border bg-[#171717] hover:scale-[1.02]">
                <iframe
                  width={"100%"}
                  src={`https://www.youtube.com/embed/${link?.url.split("/").pop()}`}
                  title={link?.title}
                  allowFullScreen
                  className="md:h-[300px] h-[200px] w-full"
                ></iframe>
              </div>
            ) : (
              <div className="relative flex h-[52px] w-full items-center justify-center rounded-lg border bg-[#171717] hover:scale-[1.02]">
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
