import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { getUserByUsername } from "~/server/user";
import { Loader } from "lucide-react";

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

  if (!user) {
    return {
      title: "Claim this username | Tielinks",
      description:
        "Claim this username for self | Tielinks | A fancy and cool link in bio | Share all links in one place",
      icons: [
        {
          url: "https://tielinks.vercel.app/favicon.ico",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "https://tielinks.vercel.app/favicon.ico",
          sizes: "512x512",
          type: "image/png",
        },
        {
          url: "https://tielinks.vercel.app/favicon.ico",
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
        title: "User Not Found | Tielinks",
        description:
          "User Not Found | Tielinks | A fancy and cool link in bio | Share all links in one place",
      },
      openGraph: {
        title: "User Not Found | Tielinks",
        description:
          "User Not Found | Tielinks | A fancy and cool link in bio | Share all links in one place",
      },
    };
  }

  return {
    title: user?.name + "'s Profile | Tielinks",
    description:
      user?.about +
      " | " +
      user?.name +
      " is on Tielinks | A fancy and cool link in bio | Share all links in one place",
    icons: [
      {
        url: user?.image || "https://tielinks.vercel.app/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: user?.image || "https://tielinks.vercel.app/favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: user?.image || "https://tielinks.vercel.app/favicon.ico",
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

// TODO: Suspense error if user not found due to generateMetadata

export default function App({ params }: { params: { username: string } }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <UsernamePage params={params} />
    </Suspense>
  );
}
