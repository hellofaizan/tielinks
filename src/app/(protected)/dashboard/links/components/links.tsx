import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

interface LinksComponentProps {
  data: any;
}

export default function LinksComponent({ data }: LinksComponentProps) {
  return (
    <div>
      <Button className=" w-full"><PlusIcon size={18} /> Add Link</Button>
    </div>
  );
}
