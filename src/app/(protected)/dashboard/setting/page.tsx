import React, { Suspense } from "react";
import { currentUser, getUserSettings } from "~/server/user";
import { Loader } from "lucide-react";
import Email from "./components/email";

export default async function page() {
  const session = await currentUser();
  const user = await getUserSettings(session?.id as string);
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="mt-2 flex flex-col gap-2 px-2">
        <Email user={user} />
      </div>
    </Suspense>
  );
}
