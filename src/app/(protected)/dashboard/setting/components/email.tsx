"use client";

import React from "react";
import OnOffswitch from "./onoffswitch";

export default function Email({ user }: any) {
  const [collectEmail, setCollectEmail] = React.useState(false);
  const settings = user?.settings;

  if (settings) {
    setCollectEmail(settings.collectEmail);
  }

  return (
    <div className="flex items-center justify-between p-2">
      <p>Collect Email</p>
      <OnOffswitch enabled={collectEmail} id={user.id} />
    </div>
  );
}
