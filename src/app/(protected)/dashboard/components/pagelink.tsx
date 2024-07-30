"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "~/hooks/use-current-user";
import { useToast } from "~/components/ui/use-toast";

export default function PageLink() {
  const session = useCurrentUser();
  const { toast } = useToast();
  const siteUrl = process.env.NEXT_PUBLIC_Website_URL || "https://tielinks.in";
  return (
    <div>
      {session?.username ? (
        <div
          className="flex items-center justify-between rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <div>
            🔥🔥 Your Tielinks page is live:{" "}
            <Link href={`${siteUrl}/${session?.username}`} target="_blank">
              <span className="underline">
                {siteUrl}/{session.username}
              </span>
            </Link>
          </div>
          <Button
            variant="ghost"
            className="gap-2 hover:bg-blue-500/20"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://tielinks.gg/${session.username}`,
              );
              toast({
                title: "📋 Link copied to clipboard",
              });
            }}
          >
            <CopyIcon size={14} />
            Copy
          </Button>
        </div>
      ) : null}
    </div>
  );
}
