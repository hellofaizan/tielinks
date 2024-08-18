import Image from "next/image";
import React, { Suspense } from "react";
import { Loader } from "lucide-react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div>
        {/* gif load */}
        <div className="h-ful flex w-full items-center justify-center">
          <Image
            src="https://c.tenor.com/8Ykw8dO3QpwAAAAC/tenor.gif"
            alt="loading"
            width={500}
            height={500}
          />
        </div>
      </div>
    </Suspense>
  );
}
