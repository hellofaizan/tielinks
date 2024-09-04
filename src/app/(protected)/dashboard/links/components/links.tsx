"use client";

import {
  ChartNoAxesColumn,
  EyeOffIcon,
  Link,
  Loader,
  TrashIcon,
} from "lucide-react";
import React, { Suspense } from "react";
import { Button } from "~/components/ui/button";
import AddLinkCOmponent from "./addlinks";
import EditLinkComponent from "./editlink";
import RemoveLink from "~/actions/removelink";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";
import UnHideLink, { HideLink } from "~/actions/togglelink";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
      const data = { hidden: false };

      await UnHideLink({ id, data }).then((res) => {
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
      const data = { hidden: true };
      await HideLink({ id, data }).then((res) => {
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
          <div className="flex flex-col gap-3" key={link.id}>
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
              <div className="flex gap-2">
                {/* Today Clicks */}
                <Suspense
                  fallback={<Loader className="animate-spin" size={19} />}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="flex items-center gap-1 rounded-md border px-1 text-sm text-gray-500">
                          <ChartNoAxesColumn size={18} />
                          {
                            link.linkClicks.filter((click: any) => {
                              const today = new Date();
                              const startOfDay = new Date(
                                today.setHours(0, 0, 0, 0),
                              );
                              const endOfDay = new Date(
                                today.setHours(23, 59, 59, 999),
                              );
                              const itemDate = new Date(click.timestamp);
                              return (
                                itemDate >= startOfDay && itemDate <= endOfDay
                              );
                            }).length
                          }
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clicks Today</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Suspense>

                {/* // toggle button to hide unhide link */}
                <Suspense
                  fallback={<Loader className="animate-spin" size={19} />}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          className="flex items-center gap-1 rounded-md border px-1 text-sm text-gray-500 dark:hover:bg-muted"
                          onClick={() => toggleHideLink(link.id)}
                        >
                          {link.hidden ? (
                            <>
                              <EyeOffIcon size={18} />
                              Unhide
                            </>
                          ) : (
                            <>
                              <EyeIcon size={18} />
                              Hide
                            </>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Hide / Unhide Link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Suspense>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
