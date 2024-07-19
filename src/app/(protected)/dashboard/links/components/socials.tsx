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
  IconBrandTelegram,
} from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { z } from "zod";
import socialFormSchema from "~/actions/schema";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import SetSocials from "~/actions/setSocials";
import { useToast } from "~/components/ui/use-toast";

type formValues = z.infer<typeof socialFormSchema>;

interface ItemType {
  id: number;
  label: string;
  placeholder: string;
  type: string;
}

export default function SocialsComponent() {
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, register } = useForm<formValues>({
    resolver: zodResolver(socialFormSchema),
    mode: "onChange",
    defaultValues: {
      socials: [],
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
      placeholder: "@twitter",
    },
    {
      id: 2,
      type: "instagram",
      label: "Instagram",
      placeholder: "@instagram",
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
      placeholder: "@github",
    },
    {
      id: 5,
      type: "telegram",
      label: "Telgram",
      placeholder: "@telegram",
    },
  ]);
  const [socials, setSocials] = useState<ItemType[]>(allSocials);
  const [activeSocials, setActiveSocials] = useState<ItemType[]>([]);

  const socialIconsSmall = (type: string) => {
    switch (type) {
      case "twitter":
        return <IconBrandTwitter size={15} className="ml-1" />;
      case "instagram":
        return <IconBrandInstagram size={15} className="ml-1" />;
      case "facebook":
        return <IconBrandFacebook size={15} className="ml-1" />;
      case "github":
        return <IconBrandGithub size={15} className="ml-1" />;
      case "telegram":
        return <IconBrandTelegram size={15} className="ml-1" />;
      default:
        return <Link size={15} className="ml-1" />;
    }
  };
  const socialIconsBig = (type: string) => {
    switch (type) {
      case "twitter":
        return <IconBrandTwitter size={28} className="ml-1" />;
      case "instagram":
        return <IconBrandInstagram size={28} className="ml-1" />;
      case "facebook":
        return <IconBrandFacebook size={28} className="ml-1" />;
      case "github":
        return <IconBrandGithub size={28} className="ml-1" />;
      case "telegram":
        return <IconBrandTelegram size={28} className="ml-1" />;
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
    remove(social.id);
    setActiveSocials((prevSocials) => {
      return prevSocials.filter((item) => item.id !== social.id);
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
            <Button className="mt-1 w-full" type="submit" disabled={disabled}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
