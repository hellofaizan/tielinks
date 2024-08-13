"use client";

import React, { Suspense } from "react";
import { Loader, Music } from "lucide-react";
import Image from "next/image";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function spotifycomponent({ data }: { data: any }) {
  const allData = data?.props;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="flex items-center p-3 overflow-hidden">
        <div className="flex-none items-cente justify-centerr relative flex">
          <Image
            src={allData?.cover_image}
            width={500}
            height={500}
            alt="Youtube Video"
            className="h-16 w-16 rounded-md"
          />
          <IconPlayerPlayFilled
            size={15}
            className="absolute left-[50%] top-[50%] z-10 -ml-2 -mt-2 items-center justify-start rounded-full border border-white p-1 text-white shadow-2xl"
          />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="flex flex-grow items-center pl-3 font-semibold md:text-xl">
            <Music size={18} className="mr-2 flex-none" />{" "}
            <span className="longtext flex-1 truncate whitespace-nowrap overflow-x-scroll max-w-max">{allData?.title}</span>
          </span>
          <span className="pl-3 text-base">{allData?.artist}</span>
        </div>
      </div>
    </Suspense>
  );
}
