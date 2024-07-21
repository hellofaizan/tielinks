"use client";

import React from "react";
import RemoveImage from "~/actions/removeimage";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function PFPImage(user: any) {
  const { toast } = useToast();
  const router = useRouter();
  const userData = user?.user;

  const deleteImage = () => {
    RemoveImage()
      .then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            title: res.error,
          });
          return;
        } else {
          toast({
            title: "Profile updated successfully! 🎉",
            description:
              "It might take a few minutes for the changes to reflect.",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      });
  };
  return (
    <div className="flex w-full">
      <Avatar className="h-24 w-24 md:h-28 md:w-28">
        <AvatarImage src={userData?.image} />
        <AvatarFallback>TIE</AvatarFallback>
      </Avatar>
      <div className="mx-4 flex w-full flex-row">
        <div className="flex w-full flex-col">
          <h1 className="font-sans text-xl font-semibold md:text-2xl">
            {userData?.name}
          </h1>
          <p className="font-mono text-base font-normal">{userData?.email}</p>
          <div className="my-2 flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1" variant={"outlinedestructive"}>
                  Delete Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to
                    delete this image from our servers?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="button"
                    variant={"outlinedestructive"}
                    onClick={() => {
                      deleteImage();
                    }}
                  >
                    Confirm
                  </Button>
                  <DialogClose asChild>
                    <Button type="button">Discard</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className="flex-1">Change Image</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
