"use client";

import React from "react";
import OnOffswitch from "./onoffswitch";

export default function Email({ user }: any) {
  const settings = user?.settings;
  const collectEmails = settings?.collectEmail;

  const [collectEmail, setCollectEmail] = React.useState(collectEmails);

  return (
    <div className="flex items-center justify-between p-2">
      <p>Collect Email</p>
      <OnOffswitch enabled={collectEmail} id={user.id} />
    </div>
  );
}
