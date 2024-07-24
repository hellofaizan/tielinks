"use client";

import React from "react";
import Link from "next/link";
import ShareLink from "./sharelink";

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
        </div>
      ))}
    </>
  );
}