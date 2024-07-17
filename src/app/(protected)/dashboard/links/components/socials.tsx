"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { ReactSortable } from "react-sortablejs";
import { GripHorizontal, Link, PlusIcon, TrashIcon } from "lucide-react";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

interface ItemType {
  id: number;
  label: string;
  icon: any;
  placeholder: string;
}

export default function SocialsComponent() {
  const [allSocials] = useState([
    {
      id: 1,
      key: "twitter",
      label: "Twitter",
      icon: "twitter",
      placeholder: "@twitter",
    },
    {
      id: 2,
      key: "instagram",
      label: "Instagram",
      icon: "instagram",
      placeholder: "@instagram",
    },
    {
      id: 3,
      key: "facebook",
      label: "Facebook",
      icon: "facebook",
      placeholder: "facebook",
    },
    {
      id: 4,
      key: "github",
      label: "Github",
      icon: "github",
      placeholder: "github",
    },
  ]);

  const [socials, setSocials] = useState<ItemType[]>(allSocials);
  const [activeSocials, setActiveSocials] = useState<ItemType[]>([]);

  const socialIconsSmall = (icon: string) => {
    switch (icon) {
      case "twitter":
        return <IconBrandTwitter size={15} className="ml-1" />;
      case "instagram":
        return <IconBrandInstagram size={15} className="ml-1" />;
      case "facebook":
        return <IconBrandFacebook size={15} className="ml-1" />;
      case "github":
        return <IconBrandGithub size={15} className="ml-1" />;
      default:
        return <Link size={15} className="ml-1" />;
    }
  };
  const socialIconsBig = (icon: string) => {
    switch (icon) {
      case "twitter":
        return <IconBrandTwitter size={28} className="ml-1" />;
      case "instagram":
        return <IconBrandInstagram size={28} className="ml-1" />;
      case "facebook":
        return <IconBrandFacebook size={28} className="ml-1" />;
      case "github":
        return <IconBrandGithub size={28} className="ml-1" />;
      default:
        return <Link size={28} className="ml-1" />;
    }
  };

  function addSocial(social: ItemType) {
    setActiveSocials((prevSocials) => {
      return [...prevSocials, social];
    });
  }

  function removeSocial(social: ItemType) {
    setActiveSocials((prevSocials) => {
      return prevSocials.filter((item) => item.id !== social.id);
    });
  }

  const availableSocials = socials.filter(
    (socials) => !activeSocials.includes(socials),
  );

  return (
    <div className="flex max-h-96 w-full overflow-y-hidden">
      <div className="flex w-full flex-col gap-3 overflow-scroll p-2">
        <div className="flex w-full flex-wrap gap-2">
          {availableSocials.map((social, index) => {
            return (
              <Button
                key={index}
                onClick={() => addSocial(social)}
                className="h-fit w-fit rounded-md border bg-[#171717] p-1 text-white hover:bg-[#242424]"
              >
                {socialIconsSmall(social.icon)}
                <span className="mx-1">{social.label}</span>
                <PlusIcon size={12} />
              </Button>
            );
          })}
        </div>
        <ReactSortable
          list={activeSocials}
          setList={setActiveSocials}
          className={cn(
            "flex w-full flex-col",
            activeSocials.length > 0 && "border-t",
            availableSocials.length === 0 && "border-none",
          )}
        >
          {activeSocials.map((social, index) => {
            return (
              <div
                key={index}
                className="mt-3 flex cursor-grab items-center justify-between gap-2"
              >
                <GripHorizontal size={20} />
                <div className="flex w-full items-center gap-2 overflow-hidden rounded-[6px] border pl-1">
                  {socialIconsBig(social.icon)}
                  <input
                    className="w-full p-2 lowercase focus-visible:outline-none"
                    placeholder={social.placeholder}
                  />
                </div>
                <Button
                  onClick={() => {
                    removeSocial(social);
                  }}
                  className="rounded-md border border-red-500/40 p-1 dark:hover:bg-[#171717]"
                  variant={"outline"}
                  size={"icon"}
                >
                  <TrashIcon size={17} className="" />
                </Button>
              </div>
            );
          })}
        </ReactSortable>
        <Button className="mt-1 w-full">Save</Button>
      </div>
    </div>
  );
}
