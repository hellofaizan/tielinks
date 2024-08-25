"use client";

import React from "react";
import { Switch } from "~/components/ui/switch";

export default function Email({ user }: any) {
  //   console.log(user);

  const handleChange = () => {
    console.log("change");
  };

  return (
    <div className="flex items-center justify-between p-2">
      <p>Collect Email</p>
      <Switch checked={user.collectedEmails} onChange={handleChange} />
    </div>
  );
}
