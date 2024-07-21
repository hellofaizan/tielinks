"use client";

import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SmilePlus } from "lucide-react";

export default function EmojiPicker({
  setEmoji,
  emojiText,
}: {
  setEmoji: any;
  emojiText: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [emoji, setEmojiIcon] = useState(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-2xl">
          <span role="img" aria-label="emoji">
            {emoji ? emoji : emojiText || <SmilePlus size={25}/>}
          </span>
        </span>
      </DialogTrigger>
      {/* // input field for gif search */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select GIF</DialogTitle>
          <DialogDescription>Search and select a GIF to use.</DialogDescription>
        </DialogHeader>
        <Picker
          className="w-full"
          data={data}
          onEmojiSelect={(emoji: any) => {
            setEmoji(emoji.native);
            setEmojiIcon(emoji.native);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
