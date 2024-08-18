import React, { Suspense } from "react";
import { userData } from "~/server/userdata";
import { currentUser } from "~/server/user";
import SocialsComponent from "./components/socials";
import { Loader } from "lucide-react";

export default async function ProfilePage() {
  const session = await currentUser();
  const user = await userData(session?.id as string);
  const socials = user?.Socials;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="mb-3 flex h-full w-full p-1">
        <div className="mt-3 h-full w-full flex-col gap-2 lg:mx-2 lg:flex-1">
          <p className="mb-4 text-center text-4xl font-bold">Add Links</p>
          <SocialsComponent data={socials} />
        </div>
      </div>
    </Suspense>
  );
}
