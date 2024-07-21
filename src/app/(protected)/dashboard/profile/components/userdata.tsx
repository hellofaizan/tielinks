"use client";

import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import SetProfile from "~/actions/setprofile";
import { useToast } from "~/components/ui/use-toast";

export default function UserPage(user: any) {
  const { toast } = useToast();
  const userData = user?.user
  const session = useCurrentUser();

  const name: string = userData?.name || session?.name || "";
  const about: string = userData?.about || session?.about || "";
  const [btnDIsabled, setBtnDisabled] = React.useState(true);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Name must be less than 50 characters.",
      }),
    about: z.string().max(50, {
      message: "About must be less than 50 characters.",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      about: about,
    },
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      setBtnDisabled(false);
    }
  }, [form.formState.isDirty]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true);

    SetProfile(values)
      .then((res) => {
        if (res.error) {
          setBtnDisabled(false);
          toast({
            variant: "destructive",
            title: res.error,
          });
          return;
        } else {
          setBtnDisabled(true);
          toast({
            title: "Profile updated successfully! 🎉",
            description: "It might take a few minutes for the changes to reflect.",
          });
        }
      })
      .catch((err) => {
        setBtnDisabled(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
        });
      });
  }

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex flex-col gap-1">
        <GifPicker setGif={setGif} />
        {gif && (
          <div className="flex flex-col gap-2">
            <img src={gif} alt="gif" className="h-44 rounded-md md:h-64" />
          </div>
        )}
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder={"Your Name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About you</FormLabel>
                  <FormControl>
                    <Textarea placeholder={"Bio"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-4 w-full" disabled={btnDIsabled}>
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
