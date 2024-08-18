import React, { Suspense } from "react";
import { userSettings } from "~/server/userdata";
import { currentUser } from "~/server/user";
import { Loader } from "lucide-react";

export default async function page() {
  const session = await currentUser();
  const user = await userSettings(session?.id as string);
  // console.log(user);
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div>Settings</div>
    </Suspense>
  );
}
