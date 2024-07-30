import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { getUserByUsername } from "~/server/user";

const UsernamePage = React.lazy(() => import("./components/UserPage"));

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.username;

  // fetch data
  const user = await getUserByUsername(id);

  return {
    title: user?.name + "'s Profile | Tielinks",
    description:
      user?.about +
      " | " +
      user?.name +
      " is on Tielinks | A fancy and cool link in bio | Share all links in one place",
    icons: [
      {
        url: user?.image || "",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: user?.image || "",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: user?.image || "",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    applicationName: "Tielinks",
    creator: "HelloFaizan",
    twitter: {
      site: "@tielinksgg",
      creator: "@hellofaizaan",
      card: "summary_large_image",
      title: user?.name + "'s Profile | Tielinks",
      description:
        user?.about +
        " | Tielinks | A fancy and cool link in bio | Share all links in one place",
    },
    openGraph: {
      title: user?.name + "'s Profile | Tielinks",
      description:
        user?.about +
        " | Tielinks | A fancy and cool link in bio | Share all links in one place",
    },
  };
}

export default function App({ params }: { params: { username: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsernamePage params={params} />
    </Suspense>
  );
}
