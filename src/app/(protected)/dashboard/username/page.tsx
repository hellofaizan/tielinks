"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/hooks/use-current-user";
import { useToast } from "~/components/ui/use-toast";
import SetUsername from "~/actions/setusername";
import { Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username must be at least 1 character long.",
    })
    .max(20, {
      message: "Username must not be longer than 20 characters.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Spaces and special characters are not allowed.",
    }),
});

type UsernameValues = z.infer<typeof usernameSchema>;

export default function page() {
  const searchParams = useSearchParams();
  const uname = searchParams.get("username");
  const user = useCurrentUser();
  const username = user?.username || uname;
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<UsernameValues>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
  });

  function onSubmit(data: UsernameValues) {
    setDisabled(true);

    // check if username is available
    SetUsername(data)
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
          title: "Username updated successfully! 🎉",
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
      })
      .finally(() => {
        router.refresh();
      });
  }

  return (
    <div className="mt-8 flex flex-col">
      <p className="text-center text-3xl md:text-5xl">Get a new username</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 flex flex-col items-center justify-center gap-4 p-4 md:mt-4"
        >
          <div className="flex w-full flex-col md:w-5/12">
            <FormField
              control={form.control}
              name="username"
              defaultValue={username || ""}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <input
                      className="w-full rounded-[6px] border p-4 lowercase focus-visible:outline-none"
                      placeholder={"username"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="relative" />
                </FormItem>
              )}
            />
            <div className="mt-1 flex gap-2 text-xs text-gray-400">
              <Info className="text-blue-600" size={15} /> You can only change
              your username once a weak
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button
              type="submit"
              className="h-15 text-md font-manrope mt-0 w-full whitespace-nowrap rounded-sm bg-transparent bg-gradient-to-r from-[#FF5400] via-[#FF5400] to-[#FF0054] p-4 px-5 font-bold text-white hover:bg-gradient-to-r hover:from-[#FF5400] hover:via-[#FF0054] hover:to-[#FF0054] hover:shadow-md hover:shadow-[#FF5400]/20 md:w-5/12 md:self-start"
              disabled={disabled}
            >
              {username ? "UPDATE" : "CLAIM NOW ✨"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
