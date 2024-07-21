"use client";

import React, { useState, useEffect } from "react";
import EmojiPicker from "~/components/EmojiPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import SetStatus from "~/actions/setStatus";
import { useToast } from "~/components/ui/use-toast";

const formSchema = z.object({
  emoji: z.string(),
  status: z.string().max(50, {
    message: "Status should be less than 50 characters",
  }),
});

type formValues = z.infer<typeof formSchema>;

export default function StatusComponent({ user }: { user: any }) {
  const status = user?.Status?.status || "";
  const emoji = user?.Status?.emoji || "";
  const [emojiSelected, setSelectedEmoji] = useState(emoji);
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  const { handleSubmit, register } = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      emoji: emoji,
      status,
    },
  });

  const onSubmit = (data: formValues) => {
    setDisabled(true);

    if (data.emoji === "" || data.emoji === emoji) {
      data.emoji = emojiSelected;
      SetStatus({ data })
        .then((res) => {
          if (res.error) {
            toast({
              variant: "destructive",
              title: res.error,
            });
            setDisabled(false);
            return;
          } else {
            toast({
              title: "Status updated successfully! 🎉",
              description:
                "It might take a few minutes for the changes to reflect.",
            });
            setDisabled(false);
          }
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "An error occurred",
          });
          setDisabled(false);
        });
    } else {
      SetStatus({ data })
        .then((res) => {
          if (res.error) {
            toast({
              variant: "destructive",
              title: res.error,
            });
            return;
          } else {
            toast({
              title: "Banner updated successfully! 🎉",
              description:
                "It might take a few minutes for the changes to reflect.",
            });
          }
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "An error occurred",
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        {/* icon */}
        <div className="flex w-full items-center gap-2 rounded-[6px] border pl-1">
          <EmojiPicker setEmoji={setSelectedEmoji} emojiText={emojiSelected} />
          <input
            {...register("status")}
            name="status"
            maxLength={50}
            className="w-full p-2 focus-visible:outline-none"
            placeholder={`What's on your mind, ${user?.name}?`}
          />
          <input
            {...register("emoji")}
            name="emoji"
            type="hidden"
            value={emojiSelected}
          />
        </div>
        <Button
          className="mt-1 w-full"
          type="submit"
          value={"submit"}
          disabled={disabled}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
