"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { ReactSortable } from "react-sortablejs";
import { GripHorizontal, Link, PlusIcon, TrashIcon, XIcon } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { z } from "zod";
import socialFormSchema from "~/actions/schema";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import SetSocials from "~/actions/setSocials";
import { useToast } from "~/components/ui/use-toast";
import RemoveSocial from "~/actions/removeSocial";
import { useRouter } from "next/navigation";

type formValues = z.infer<typeof socialFormSchema>;

interface ItemType {
  id: number;
  label: string;
  placeholder: string;
  type: string;
}

export default function SocialsComponent({ data }: { data: any }) {
  const [disabled, setDisabled] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { control, handleSubmit, register } = useForm<formValues>({
    resolver: zodResolver(socialFormSchema),
    mode: "onChange",
    defaultValues: {
      socials: [
        ...data.map((item: any) => {
          return {
            handle: item.handle,
            type: item.type,
          };
        }),
      ],
    },
  });

  const { append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const [allSocials] = useState([
    {
      id: 1,
      type: "twitter",
      label: "Twitter",
      placeholder: "twitter ",
    },
    {
      id: 2,
      type: "instagram",
      label: "Instagram",
      placeholder: "instagram",
    },
    {
      id: 3,
      type: "facebook",
      label: "Facebook",
      placeholder: "facebook",
    },
    {
      id: 4,
      type: "github",
      label: "Github",
      placeholder: "github",
    },
    {
      id: 5,
      type: "telegram",
      label: "Telgram",
      placeholder: "telegram",
    },
    {
      id: 6,
      type: "tiktok",
      label: "TikTok",
      placeholder: "tiktok",
    },
    {
      id: 7,
      type: "youtube",
      label: "YouTube",
      placeholder: "youtube handle",
    },
    {
      id: 8,
      type: "discord",
      label: "Discord",
      placeholder: "discord id",
    },
    {
      id: 9,
      type: "reddit",
      label: "Reddit",
      placeholder: "reddit",
    },
    {
      id: 10,
      type: "spotify",
      label: "Spotify",
      placeholder: "spotify",
    },
    {
      id: 11,
      type: "twitch",
      label: "Twitch",
      placeholder: "twitch",
    },
    {
      id: 12,
      type: "whatsapp",
      label: "Whatsapp",
      placeholder: "+91 9876543210",
    },
    {
      id: 13,
      type: "peerlist",
      label: "Peerlist",
      placeholder: "peerlist",
    },
    {
      id: 14,
      type: "producthunt",
      label: "ProductHunt",
      placeholder: "producthunt",
    },
  ]);
  const [socials, setSocials] = useState<ItemType[]>([
    ...allSocials.filter((item) => {
      return !data.some((social: any) => social.type === item.type);
    }),
  ]);
  const [activeSocials, setActiveSocials] = useState<ItemType[]>([
    ...data.map((item: any, index: number) => {
      return {
        id: index,
        type: item.type,
        label: item.type.charAt(0).toUpperCase() + item.type.slice(1),
        placeholder: item.type.charAt(0).toUpperCase() + item.type.slice(1),
      };
    }),
  ]);

  const socialIconsSmall = (type: string) => {
    switch (type) {
      case "twitter":
        return <IconBrandTwitter size={15} className="ml-1 text-[#1DA1F2]" />;
      case "instagram":
        return (
          <IconBrandInstagram
            size={15}
            className="relative ml-1 text-[#ee2a7b]"
          />
        );

      case "facebook":
        return <IconBrandFacebook size={15} className="ml-1 text-[#4267B2]" />;
      case "github":
        return <IconBrandGithub size={15} className="ml-1" />;
      case "telegram":
        return <IconBrandTelegram size={15} className="ml-1 text-[#24A1DE]" />;
      case "tiktok":
        return <IconBrandTiktok size={15} className="ml-1 text-[#ff0050]" />;
      case "youtube":
        return <IconBrandYoutube size={15} className="ml-1 text-[#FF0000]" />;
      case "discord":
        return <IconBrandDiscord size={15} className="ml-1 text-[#5865F2]" />;
      case "reddit":
        return <IconBrandReddit size={15} className="ml-1 text-[#FF5700]" />;
      case "spotify":
        return <IconBrandSpotify size={15} className="ml-1 text-[#1DB954]" />;
      case "twitch":
        return <IconBrandTwitch size={15} className="ml-1 text-[#6441a5]" />;
      case "whatsapp":
        return <IconBrandWhatsapp size={15} className="ml-1 text-[#25D366]" />;
      case "producthunt":
        return (
          <IconBrandProducthunt size={15} className="ml-1 text-[#da552f]" />
        );
      case "peerlist":
        return (
          <img
            className="ml-1 h-[15px] w-[15px]"
            src="/assets/peerlistlogo.svg"
            alt="peerlist"
          />
        );
      default:
        return <Link size={15} className="ml-1" />;
    }
  };
  const socialIconsBig = (type: string) => {
    switch (type) {
      case "twitter":
        return <IconBrandTwitter size={28} className="ml-1 text-[#1DA1F2]" />;
      case "instagram":
        return <IconBrandInstagram size={28} className="ml-1 text-[#ee2a7b]" />;
      case "facebook":
        return <IconBrandFacebook size={28} className="ml-1 text-[#4267B2]" />;
      case "github":
        return <IconBrandGithub size={28} className="ml-1" />;
      case "telegram":
        return <IconBrandTelegram size={28} className="ml-1 text-[#24A1DE]" />;
      case "tiktok":
        return <IconBrandTiktok size={28} className="ml-1 text-[#ff0050]" />;
      case "youtube":
        return <IconBrandYoutube size={28} className="ml-1 text-[#FF0000]" />;
      case "discord":
        return <IconBrandDiscord size={28} className="ml-1 text-[#5865F2]" />;
      case "reddit":
        return <IconBrandReddit size={28} className="ml-1 text-[#FF5700]" />;
      case "spotify":
        return <IconBrandSpotify size={28} className="ml-1 text-[#1DB954]" />;
      case "twitch":
        return <IconBrandTwitch size={28} className="ml-1 text-[#6441a5]" />;
      case "whatsapp":
        return <IconBrandWhatsapp size={28} className="ml-1 text-[#25D366]" />;
      case "producthunt":
        return (
          <IconBrandProducthunt size={28} className="ml-1 text-[#da552f]" />
        );
      case "peerlist":
        return (
          <img
            className="ml-1 h-[28px] w-[28px]"
            src="/assets/peerlistlogo.svg"
            alt="peerlist"
          />
        );
      default:
        return <Link size={28} className="ml-1" />;
    }
  };

  function addSocial(social: ItemType) {
    append({ handle: "", type: social.type });
    setActiveSocials((prevSocials) => {
      return [...prevSocials, social];
    });
  }
  function removeSocial(social: ItemType) {
    const index = activeSocials.findIndex((item) => item.type === social.type);
    remove(index);
    setActiveSocials((prevSocials) => {
      return prevSocials.filter((item) => item.type !== social.type);
    });
    setSocials((prevSocials) => {
      return [...prevSocials, social];
    });
    RemoveSocial({ social })
      .then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            title: res.error,
          });
          router.refresh();
          return;
        }
        toast({
          title: "Social removed successfully! 🎉",
          description:
            "It might take a few minutes for the changes to reflect.",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      });
  }

  const availableSocials = socials.filter(
    (socials) => !activeSocials.includes(socials),
  );

  const onSubmit = async (data: formValues) => {
    setDisabled(true);

    // if form is invalid, toast the error
    if (data.socials.length === 0) {
      setDisabled(false);
      toast({
        variant: "destructive",
        title: "Please add the socials you want to link.",
      });
      return;
    }

    SetSocials(data)
      .then((res) => {
        if (res.error) {
          setDisabled(false);
          toast({
            variant: "destructive",
            title: res.error,
          });
          return;
        }
        setDisabled(false);
        toast({
          title: "Socials updated successfully! 🎉",
          description:
            "It might take a few minutes for the changes to reflect.",
        });
      })
      .catch((err) => {
        setDisabled(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      });
  };

  return (
    <div className="flex w-full flex-col overflow-y-hidden">
      <div
        className={cn(
          "mb-2 flex items-center justify-between rounded-lg bg-blue-50 p-2 px-2 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400",
          hideAlert && "hidden",
        )}
        role="alert"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-start">
            <span className="font-medium hidden md:block">Information!</span> Don't use '@' or `https://` in
            your username.
          </div>
        </div>
        <XIcon size={20} onClick={() => setHideAlert(true)} className="cursor-pointer hover:bg-gray-700/45 rounded-md" />
      </div>
      <div className="flex w-full flex-col gap-3 overflow-y-scroll p-2">
        <div className="flex w-full flex-wrap gap-2">
          {availableSocials.map((social, index) => {
            return (
              <Button
                key={index}
                onClick={() => addSocial(social)}
                className="h-fit w-fit rounded-md border bg-[#171717] p-1 text-white hover:bg-[#242424]"
              >
                {socialIconsSmall(social.type)}
                <span className="mx-1">{social.label}</span>
                <PlusIcon size={12} />
              </Button>
            );
          })}
        </div>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <ReactSortable
              list={activeSocials}
              setList={setActiveSocials}
              className={cn(
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
                      {socialIconsBig(social.type)}
                      <input
                        {...register(`socials.${index}.handle`)}
                        className="w-full p-2 lowercase focus-visible:outline-none"
                        placeholder={social.placeholder}
                      />
                      <input
                        type="hidden"
                        {...register(`socials.${index}.type`)}
                        value={social.type}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        removeSocial(social);
                      }}
                      className="rounded-md p-1 dark:hover:bg-[#171717]"
                      variant={"outlinedestructive"}
                      size={"icon"}
                    >
                      <TrashIcon size={17} />
                    </Button>
                  </div>
                );
              })}
            </ReactSortable>
            <Button className="mt-1 w-full" type="submit" disabled={disabled}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
