"use client";

import { Button, buttonVariants } from "~/components/ui/button";
import { AlertTriangle, ChevronLeft, RotateCw } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

const ErrorPage: NextPage = () => {
  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center space-y-5 text-center md:min-h-screen">
      <AlertTriangle size={100} className="text-red-500" />
      <div className="mt-3 space-y-2">
        <h1 className="text-xl font-medium">Oops! Error</h1>
        <p>Something went wrong. Try again later</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link href={"/"} className={buttonVariants({ variant: "default" })}>
          <ChevronLeft /> Go back to home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
