"use client";

import React, { useState } from "react";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Separator } from "~/components/ui/separator";
import { Info, LinkIcon, PlusIcon, TypeIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import SaveLinks from "~/actions/savelink";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1).max(50, {
    message: "Title should be less than 50 characters",
  }),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
  embed: z.boolean().default(false),
});

type formValues = z.infer<typeof formSchema>;

export default function AddLinkCOmponent() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [url, setUrl] = useState("");

  const { handleSubmit, register, reset } = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: formValues) => {
    setDisabled(true);
    SaveLinks(data).then((res) => {
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
        });
      } else {
        toast({
          title: "Success",
          description: "Link has been saved to your profile!!",
        });
        reset();
        setOpen(false);
        router.refresh();
      }
      setDisabled(false);
    });
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <PlusIcon size={18} /> Add Link
          </Button>
        </DialogTrigger>
        {/* // input field for gif search */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new Link</DialogTitle>
            <DialogDescription>
              Set up a new link to share with your audience.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <div className="flex w-full items-center overflow-hidden rounded-md border">
                <TypeIcon size={18} className="m-[6px]" />
                <input
                  type="text"
                  id="title"
                  maxLength={50}
                  className="w-full p-2 focus-visible:outline-none"
                  placeholder="Title"
                  {...register("title")}
                />
              </div>
              <div className="mt-3 flex w-full items-center overflow-hidden rounded-md border">
                <LinkIcon size={18} className="m-[6px]" />
                <input
                  type="text"
                  id="url"
                  placeholder="URL"
                  className="w-full p-2 focus-visible:outline-none"
                  {...register("url")}
                />
              </div>
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info size={10} className="text-blue-500" /> must be a valid URL
                link!
              </p>
              {/* if url input is a youtube video, show checkbox to embed video */}
              {url.includes("youtu.be/") || url.includes("open.spotify.com") ? (
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="checkbox"
                    placeholder="embed"
                    {...register("embed")}
                  />
                  <span className="text-sm">Allow Embed</span>
                </div>
              ) : null}
              <Button type="submit" disabled={disabled} className="mt-3">
                Save Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full">
          <PlusIcon size={18} /> Add Link
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Select Gif</DrawerTitle>
          <DrawerDescription>Search and select a GIF to use.</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <div className="flex flex-col gap-1">
            <div className="flex w-full items-center overflow-hidden rounded-md border">
              <TypeIcon size={18} className="m-[6px]" />
              <input
                type="text"
                id="title"
                maxLength={50}
                className="w-full p-2 focus-visible:outline-none"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <div className="mt-3 flex w-full items-center overflow-hidden rounded-md border">
              <LinkIcon size={18} className="m-[6px]" />
              <input
                type="text"
                id="url"
                placeholder="URL"
                className="w-full p-2 focus-visible:outline-none"
                {...register("url", {
                  onChange: (e) => setUrl(e.target.value),
                })}
              />
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-400">
              <Info size={10} className="text-blue-500" /> must be a valid URL
              link!
            </p>

            {/* if url input is a youtube video, show checkbox to embed video */}
            {url.includes("youtu.be/") || url.includes("open.spotify.com") ? (
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="checkbox"
                  placeholder="embed"
                  {...register("embed")}
                />
                <span className="text-sm">Allow Embed</span>
              </div>
            ) : null}

            <Button type="submit" disabled={disabled} className="mt-3">
              Save Link
            </Button>
          </div>
        </form>

        <DrawerFooter className="p-0">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
