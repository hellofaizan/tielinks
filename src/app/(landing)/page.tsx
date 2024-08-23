import GetUsername from "./components/UsernameField";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="min-h-[101dvh] md:min-h-[101vh]">
      <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.05] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]" />

        <div>
          <div className="flex flex-col">
            <div className="p-4 md:p-2 mt-40 md:mt-0 flex flex-col md:min-h-screen justify-center">
              <h1 className="text-[45px] md:text-7xl font-bold text-center bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-gradient-to-b from-neutral-950 to-neutral-600 bg-opacity-50">
                Tielinks is super cool
              </h1>
              <p className="mt-4 font-light text-base text-neutral-800 dark:text-neutral-300 max-w-lg text-center mx-auto">
                Tielinks is a a link in bio tool that helps you create a beautiful landing page for your social media profiles.
              </p>
              <GetUsername session={session} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
