import { Link, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

interface LinksComponentProps {
  data: any;
}

export default function LinksComponent({ data }: LinksComponentProps) {
  return (
    <div className="flex flex-col gap-4 p-2">
      <Button className="w-full">
        <PlusIcon size={18} /> Add Link
      </Button>

      <div className="mb-2 flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between border-t pt-2">
          <div className="flex flex-row items-center">
            <Link className="m-2" />
            <div>
              <p className="text-base font-semibold">Website</p>
              <p className="text-sm text-gray-500">https://example.com</p>
            </div>
          </div>
          <div>
            <Button
              className="dark:hover:bg-[#171717]"
              variant={"outlinedestructive"}
              size={"icon"}
            >
              <TrashIcon size={17} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
