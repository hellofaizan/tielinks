"use client";
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "~/components/ui/form"
import { useRouter } from 'next/navigation'
import { Link2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

const usernameSchema = z.object({
    username: z
        .string()
        .min(1, {
            message: "Username must be at least 1 character long.",
        })
        .max(20, {
            message: "Username must not be longer than 20 characters.",
        })
})

type UsernameValues = z.infer<typeof usernameSchema>

const GetUsername = ({
    session,
}: any) => {
    const router = useRouter()

    const form = useForm<UsernameValues>({
        resolver: zodResolver(usernameSchema),
        mode: "onChange",
    })

    function onSubmit(data: UsernameValues) {
        // save username to local storage
        if (typeof window !== 'undefined') {
            localStorage.setItem('username', data.username)
        }
        router.push(`/auth?callbackUrl=/dashboard/username`)
    }
    // Completed Form ?
    const username = session?.user.username

    return (
        <div className='flex items-center justify-center'>
            {username != null ? (
                // Stylish Navigate to your Profile Button
                <div className='flex items-center justify-center mt-10 flex-col gap-2 w-max'>
                    <Button
                        className='border bg-black/10 dark:bg-white/10 backdrop-blur-3xl hover:bg-black/5 dark:hover:bg-white/5'
                        size={'xxl'}
                        onClick={() => router.push("/" + session?.user?.username)}
                    >
                        <div className="flex py-5 justify-center items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={session?.user?.image} width={10} height={10} alt="@shadcn" />
                                <AvatarFallback className='text-black dark:text-white'>TIE</AvatarFallback>
                            </Avatar>
                            {/* <Image src=  alt="User Profile" className="rounded-full w-8 h-8" /> */}
                            <span className="flex gap-2 font-manrope text-neutral-600 items-center dark:text-neutral-400 text-lg">
                                Your Tielinks page
                            </span>
                        </div>
                    </Button>
                    <Button
                        className='border bg-black/10 dark:bg-white/10 backdrop-blur-3xl hover:bg-black/5 dark:hover:bg-white/5 w-full'
                        size={'xxl'}
                        onClick={() => router.push("/dashboard")}
                    >
                        <div className="flex py-5 justify-center items-center space-x-3">

                            <span className="flex gap-2 font-manrope text-neutral-600 items-center dark:text-neutral-400 text-lg">
                                Go to dashoard
                            </span>
                        </div>
                    </Button>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col md:gap-4 mt-4 md:mt-10 md:flex-row md:items-center justify-center p-4'>
                        <div className="flex md:flex-row">
                            <p className="md:px-4 rounded-l-[6px] bg-neutral-600 bg-opacity-30 backdrop-blur-3xl font-manrope text-neutral-800 dark:text-neutral-300 p-4">tielinks.cc/</p>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <input className="rounded-r-[6px] p-4 w-full border lowercase focus-visible:outline-none" placeholder={"username"} {...field} />
                                        </FormControl>
                                        <FormMessage className='relative md:absolute' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className="mt-6 md:mt-0 h-15 hover:shadow-md hover:shadow-[#FF5400]/20 bg-gradient-to-r from-[#FF5400] via-[#FF5400] to-[#FF0054] hover:bg-gradient-to-r hover:from-[#FF5400] hover:via-[#FF0054] hover:to-[#FF0054] rounded-sm text-white bg-transparent text-md font-bold font-manrope p-4 px-5 whitespace-nowrap md:self-start">CLAIM NOW ✨</Button>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default GetUsername;