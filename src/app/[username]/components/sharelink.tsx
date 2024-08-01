"use client";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "~/hooks/use-media-query";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandReddit,
  IconBrandWhatsapp,
  IconBrandLinkedin,
  IconBrandGmail,
} from "@tabler/icons-react";
import { Separator } from "~/components/ui/separator";
import { EllipsisVertical } from "lucide-react";
import { Copy, Check, LinkIcon, Flag, ArrowUpRight } from "lucide-react";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { cn } from "~/lib/utils";

interface ShareLinkProps {
  link: string;
  username: string;
  title: string;
  className?: string;
}

export default function ShareLink({
  link,
  username,
  title,
  className,
}: ShareLinkProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const shareSocialMedia = (link: string) => {
    return (
      <div className={"mb-2 max-h-64 overflow-y-scroll text-lg"}>
        <Link
          href={`https://twitter.com/intent/tweet?text=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandTwitter className="text-[#1DA1F2] hover:scale-105" />
          Share on Twitter
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandFacebook className="text-[#4267B2] hover:scale-105" />
          Share on Facebook
        </Link>
        <Link
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandLinkedin className="text-[#0a66c2] hover:scale-105" />
          Share on LinkedIn
        </Link>
        <Link
          href={`https://api.whatsapp.com/send?text=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandWhatsapp className="text-[#25D366] hover:scale-105" />
          Share on WhatsApp
        </Link>
        <Link
          href={`https://t.me/share/url?url=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandTelegram className="text-[#0088cc] hover:scale-105" />
          Share on Telegram
        </Link>
        <Link
          href={`https://www.reddit.com/submit?url=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandReddit className="text-[#FF4500] hover:scale-105" />
          Share on Reddit
        </Link>
        <Link
          href={`mailto:?body=${title} - ${link}`}
          target="_blank"
          className="flex w-full gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <IconBrandGmail className="text-[#C71610] hover:scale-105" />
          Share via Email
        </Link>
        <div
          onClick={() => {
            // open share menu of device
            if (navigator.share) {
              navigator.share({
                title: title,
                text: "Check out this link!",
                url: link,
              });
            }
          }}
          className="flex w-full cursor-pointer gap-2 rounded-lg p-2 hover:bg-muted"
        >
          <LinkIcon className="hover:scale-105" />
          More Options
        </div>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={
              className +
              " absolute right-2 z-10 cursor-pointer rounded-md p-[6px] hover:bg-muted"
            }
          >
            <EllipsisVertical size={20} className="" />
          </Button>
        </DialogTrigger>
        {/* // input field for gif search */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>
              Edit the link to share with your audience.
            </DialogDescription>
          </DialogHeader>

          <Separator />

          {/* Link Input */}
          <div className="flex w-full gap-2">
            <Input value={link || ""} readOnly className="w-full text-center" />
            <Button
              variant="outline"
              size={"icon"}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopy(true);
              }}
            >
              {copy ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Copy size={20} />
              )}
            </Button>
          </div>

          <Separator />

          {/* Social Media Share */}
          <div className="flex flex-col gap-2">{shareSocialMedia(link)}</div>

          <Separator />

          {/* Report Link */}
          <Link
            href={`/report?u=${username}&l=${link}`}
            target="_blank"
            className="flex items-center justify-between rounded-lg p-2 hover:bg-muted"
          >
            <span className="flex w-full gap-2">
              <Flag className="text-red-500 hover:scale-105" />
              Report this link
            </span>
            <ArrowUpRight className="text-gray-500" />
          </Link>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={className + " absolute right-2 z-10 cursor-pointer rounded-md p-[6px]"}
        >
          <EllipsisVertical size={20} className="" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Share this link!</DrawerTitle>
          <DrawerDescription>
            Share this link with your friends and family.
          </DrawerDescription>
        </DrawerHeader>
        {/* Link Input */}
        <div className="mb-4 flex w-full gap-2">
          <Input value={link || ""} readOnly className="w-full text-center" />
          <Button
            variant="outline"
            size={"icon"}
            onClick={() => {
              navigator.clipboard.writeText(link);
              setCopy(true);
            }}
          >
            {copy ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <Copy size={20} />
            )}
          </Button>
        </div>
        <Separator />

        {/* Social Media Share */}
        <div className="mt-4 flex flex-col gap-2">{shareSocialMedia(link)}</div>
        <Separator />
        {/* Report Link */}
        <Link
          href={`/report?u=${username}&l=${link}`}
          target="_blank"
          className="mt-4 flex items-center justify-between rounded-lg p-2 hover:bg-muted"
        >
          <span className="flex w-full gap-2">
            <Flag className="text-red-500 hover:scale-105" />
            Report this link
          </span>
          <ArrowUpRight className="text-gray-500" />
        </Link>
      </DrawerContent>
    </Drawer>
  );
}
