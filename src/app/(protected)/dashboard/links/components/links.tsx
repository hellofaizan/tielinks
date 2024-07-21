"use client";

import { Link, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import AddLinkCOmponent from "./addlinks";
import EditLinkComponent from "./editlink";
import RemoveLink from "~/actions/removelink";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col gap-4 p-2">
      <AddLinkCOmponent />

      <div className="mb-2 flex flex-col gap-3">
        {data?.map((link: any) => (
          <div
            className="flex flex-row items-center justify-between border-t pt-2"
            key={link.id}
          >
            <div className="flex flex-row items-center">
              <Link className="m-2" />
              <div>
                <p className="text-base font-semibold">{link.title}</p>
                <p className="line-clamp-1 text-sm text-gray-500">{link.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <EditLinkComponent title={link.title} url={link.url} id={link.id} />
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
        ))}
      </div>
    </div>
  );
}
