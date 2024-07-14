"use client"

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Button } from '~/components/ui/button'
import { useCurrentUser } from '~/hooks/use-current-user'
import { useToast } from "~/components/ui/use-toast"
import SetUsername from '~/actions/setusername'
import { Info } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

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
})

type UsernameValues = z.infer<typeof usernameSchema>

export default function page() {
  const searchParams = useSearchParams();
  const uname = searchParams.get("username");
  const user = useCurrentUser();
  const username = user?.username || uname;
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()

  const form = useForm<UsernameValues>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
  })

  function onSubmit(data: UsernameValues) {
    setDisabled(true)

    // check if username is available
    SetUsername(data)
      .then((res) => {
        if (res.error) {
          setDisabled(false)
          toast({
            variant: "destructive",
            title: res.error,
          })
          return
        }
        setDisabled(false)
        toast({
          title: "Username updated successfully! 🎉",
          description: "It might take a few minutes for the changes to reflect.",
        })
      })
      .catch((err) => {
        setDisabled(false)
        toast({
          variant: "destructive",
          title: "An error occurred",
        })
      })

  }

  return (
    <div className='flex flex-col mt-8'>
      <p className='text-center text-3xl md:text-5xl'>Get a new username</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-2 md:mt-4 items-center justify-center p-4'>
          <div className="flex flex-col md:w-5/12 w-full">
            <FormField
              control={form.control}
              name="username"
              defaultValue={username || ""}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <input className="rounded-[6px] p-4 w-full border lowercase focus-visible:outline-none" placeholder={"username"} {...field} />
                  </FormControl>
                  <FormMessage className='relative' />
                </FormItem>
              )}
            />
            <div className='text-xs flex gap-2 text-gray-400 mt-1' ><Info className='text-blue-600' size={15} /> You can only change your username once a weak</div>
          </div>
          <div className='w-full items-center justify-center flex'>
            <Button type='submit' className="mt-0 md:w-5/12 w-full h-15 hover:shadow-md hover:shadow-[#FF5400]/20 bg-gradient-to-r from-[#FF5400] via-[#FF5400] to-[#FF0054] hover:bg-gradient-to-r hover:from-[#FF5400] hover:via-[#FF0054] hover:to-[#FF0054] rounded-sm text-white bg-transparent text-md font-bold font-manrope p-4 px-5 whitespace-nowrap md:self-start" disabled={disabled}>{
              (username) ? "UPDATE" : "CLAIM NOW ✨"
            }</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
