"use client";

import React, { useState } from "react";
import LogoImg from "../../../../../public/favicon.ico";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandDiscord,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "~/server/routes";
import { useSearchParams } from "next/navigation";
import { FormError } from "./FormError";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function page() {
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "The Email is already in use from different Authentication Provider"
      : "Opps! Something went wrong. Please try again later.";

  const callbackUrl = searchParams.get("callbackUrl");

  // handle click
  const handleClick = (
    provider: "google" | "github" | "discord" | "facebook",
  ) => {
    setDisabled(true);
    setIsLoading(true);
    try {
      signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    } catch (error) {
      console.error(error);
      setDisabled(false);
      setIsLoading(false);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-4 py-8 lg:py-0">
      <Link
        href="/"
        className="mb-6 flex items-center text-3xl font-semibold text-gray-900 dark:text-white"
      >
        <img className="mr-2 h-8 w-8" src={LogoImg.src as string} alt="logo" />
        Tielinks
      </Link>

      <div className="mx-auto w-full max-w-md rounded-sm bg-transparent p-3 shadow-input md:rounded-lg md:p-8">
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
          Sign up and get started
        </p>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          {/* Google */}
          <button
            onClick={() => handleClick("google")}
            disabled={disabled}
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            {isLoading ? (
              <Loader
                size={24}
                className="animate-spin text-neutral-700 dark:text-neutral-300"
              />
            ) : (
              <IconBrandGoogle
                className="text-neutral-700 dark:text-neutral-300"
                size={24}
              />
            )}
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>

          {/* Discord */}
          <button
            onClick={() => handleClick("discord")}
            disabled={disabled}
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            {isLoading ? (
              <Loader
                size={24}
                className="animate-spin text-neutral-700 dark:text-neutral-300"
              />
            ) : (
              <IconBrandDiscord
                className="text-neutral-700 dark:text-neutral-300"
                size={24}
              />
            )}
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Discord
            </span>
            <BottomGradient />
          </button>

          {/* Github */}
          <button
            onClick={() => handleClick("github")}
            disabled={disabled}
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            {isLoading ? (
              <Loader
                size={24}
                className="animate-spin text-neutral-700 dark:text-neutral-300"
              />
            ) : (
              <IconBrandGithub
                className="text-neutral-700 dark:text-neutral-300"
                size={24}
              />
            )}
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Github
            </span>
            <BottomGradient />
          </button>

          {urlError && <FormError message={urlError} />}
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
