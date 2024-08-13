import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import SpotifyComponent from "~/app/[username]/components/spotifycomponent";
import Link from "next/link";
import PlaySong from "./Play";
import getSpotifyMetadata from "~/actions/getSpotify";
import axios from "axios";

export default async function SpotifyPreview({
  url,
  userId,
  linkId,
  linkURL,
}: {
  url: string;
  userId: string;
  linkId: string;
  linkURL: string;
}) {
  const data = await axios(
    `${process.env.NEXT_PUBLIC_Website_URL}/api/spotifydata?url=${encodeURIComponent(url)}`,
  ).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  });
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <>
        <Link
          ping={`/api/visitCounter?id=${userId}&link=${linkId}`}
          href={linkURL}
          target="_blank"
          className="relative flex h-full w-full items-center overflow-hidden"
        >
          <SpotifyComponent data={data} />
        </Link>
        <PlaySong url={data?.props.preview_url} />
      </>
    </Suspense>
  );
}
