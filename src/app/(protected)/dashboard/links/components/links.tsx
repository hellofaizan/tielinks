"use client";

import { ChartNoAxesColumn, EyeOffIcon, Link, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import AddLinkCOmponent from "./addlinks";
import EditLinkComponent from "./editlink";
import RemoveLink from "~/actions/removelink";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";
import HideLink from "~/actions/hidelink";
import UnHideLink from "~/actions/unhidelink";

interface LinksComponentProps {
  data: any;
}

export default function LinksComponent({ data }: LinksComponentProps) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteLink = async (id: any) => {
    RemoveLink(id).then((res) => {
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
        });
      }
      toast({
        title: "Success",
        description: "Link has been removed successfully!",
      });
      router.refresh();
    });
  };

  const toggleHideLink = async (id: any) => {
    const link = data.find((link: any) => link.id === id);
    if (link.hidden) {
      // FIXME: ID is not being passed to the function returning undefined
      await UnHideLink(id).then((res) => {
        if (res.error) {
          toast({
            title: "Error",
            description: res.error,
          });
        }
        toast({
          title: "Success",
          description: "Link has been unhidden successfully!",
        });
        router.refresh();
      });
    } else {
      await HideLink(id).then((res) => {
        if (res.error) {
          toast({
            title: "Error",
            description: res.error,
          });
        }
        toast({
          title: "Success",
          description: "Link has been hidden successfully!",
        });
        router.refresh();
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-hidden p-2">
      <AddLinkCOmponent />

      <div className="mb-2 flex flex-col gap-3 overflow-hidden">
        {data?.map((link: any) => (
          <div className="flex flex-col gap-4" key={link.id}>
            <div
              className="flex flex-row items-center justify-between border-t pt-2"
              key={link.id}
            >
              <div className="flex flex-1 flex-row items-center overflow-hidden">
                <Link className="m-2 flex-none" />
                <div className="w-full overflow-hidden">
                  <p className="longtext w-full flex-1 overflow-x-scroll truncate whitespace-nowrap text-base font-semibold">
                    {link.title}
                  </p>
                  <p className="longtext overflow-x-scroll truncate whitespace-nowrap text-sm text-gray-500 lg:max-w-80">
                    {link.url}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-1">
                <EditLinkComponent
                  title={link.title}
                  url={link.url}
                  id={link.id}
                  embed={link.embed}
                />
                <Button
                  className="dark:hover:bg-[#171717]"
                  variant={"outlinedestructive"}
                  onClick={() => deleteLink(link.id)}
                  size={"icon"}
                >
                  <TrashIcon size={17} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-4">
                <p className="flex gap-1 text-sm text-gray-500">
                  <ChartNoAxesColumn size={18} /> {link.linkClicks.length || 0}
                </p>

                {/* // toggle button to hide unhide link */}
                <button
                  className="rounded-md p-[1px] text-gray-500 dark:hover:bg-muted"
                  onClick={() => toggleHideLink(link.id)}
                >
                  {link.hidden ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
