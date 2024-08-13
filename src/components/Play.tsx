"use client";

import { Loader, Play, Pause } from "lucide-react";
import React from "react";

export default function PlaySong({ url }: { url: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <button
      className="absolute bottom-0 right-0 z-20 mb-[14px] mr-4 flex cursor-pointer items-center gap-1 rounded-full border border-green-500/40 bg-green-500/15 p-[1px] px-3 text-sm"
      onClick={() => {
        // play aayah audio from data.audio.primary
        const audio = new Audio(url);
        // if loadind show loading else show play icon
        setIsLoading(true);
        if (isPlaying === true) {
          setIsPlaying(false);
          setIsLoading(false);
          audio.pause();
          return;
        } else {
          if (audio.readyState === 4) {
            setIsLoading(false);
            setIsPlaying(true);
            audio.play();
          } else {
            audio.oncanplay = () => {
              setIsLoading(false);
              setIsPlaying(true);
              audio.play();
            };
          }
        }

        audio.onended = () => {
          setIsLoading(false);
          setIsPlaying(false);
          return;
        };
      }}
    >
      {isLoading ? (
        <Loader className="animate-spin" size={15} />
      ) : isPlaying ? (
        <Pause size={15} />
      ) : (
        <Play size={15} />
      )}
      preview
    </button>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full rounded-lg border border-gray-300">
      <div
        className="h-4 rounded-lg bg-blue-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
