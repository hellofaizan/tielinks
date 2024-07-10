import React from "react";
import CTAbtn from "./UsernameField";

export default function GridBackground() {
    const session = null;
    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.05] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <div>
                <div className="flex flex-col">
                    <div className="p-4 md:p-2 mt-40 md:mt-0 flex flex-col md:min-h-screen justify-center">
                        <h1 className="text-[45px] md:text-7xl font-bold text-center bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-gradient-to-b from-neutral-950 to-neutral-600 bg-opacity-50">
                            Tielinks is new!
                        </h1>
                        <p className="mt-4 font-light text-base text-neutral-800 dark:text-neutral-300 max-w-lg text-center mx-auto">
                            Spotlight effect is a great way to draw attention to a specific part
                            of the page. Here, we are drawing the attention towards the text
                            section of the page. I don&apos;t know why but I&apos;m running out of
                            copy.
                        </p>
                        <CTAbtn session={session} />
                    </div>

                </div>
            </div>
        </div>
    );
}
