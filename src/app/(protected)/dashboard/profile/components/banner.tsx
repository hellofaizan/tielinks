"use client";

import { CheckCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import SetBanner from "~/actions/setbanner";
import RemoveBanner from "~/actions/removeBanner";
import { GifPicker } from "~/components/GifPicker";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function banner(data: any) {
  const { toast } = useToast();
  const router = useRouter();
  const user = data?.user;
  const [gif, setGif] = React.useState(null);
  const banner = user?.banner;

  const setBanner = async () => {
    SetBanner({ banner: gif })
      .then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            title: res.error,
          });
          return;
        } else {
          toast({
            title: "Banner updated successfully! 🎉",
            description:
              "It might take a few minutes for the changes to reflect.",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      });
  };

  const removeBanner = async () => {
    RemoveBanner()
      .then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            title: res.error,
          });
          return;
        } else {
          toast({
            title: "Banner removed successfully! 🎉",
            description:
              "It might take a few minutes for the changes to reflect.",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      });
  };

  return (
    <div>
      {banner ? (
        <div className="flex flex-col overflow-hidden">
          <img src={banner} alt="gif" className="rounded-md bg-cover" />
          <Button
            variant={"outlinedestructive"}
            onClick={removeBanner}
            className="m-3"
          >
            Remove Banner
          </Button>
        </div>
      ) : gif ? (
        <div className="flex flex-col">
          <img src={gif} alt="gif" className="rounded-md bg-cover" />
          <Button onClick={setBanner} className="mx-3 mt-3">
            <CheckCheck className="mr-2" />
            Set as Banner
          </Button>
          <GifPicker setGif={setGif} btnText="Choose Different Banner"/>
        </div>
      ) : (
        <div className="flex flex-col">
          <Skeleton className="flex h-36 w-full items-center justify-center rounded-none">
            <span className="">Banner Placeholder</span>
          </Skeleton>
          <GifPicker setGif={setGif} />
        </div>
      )}
    </div>
  );
}
