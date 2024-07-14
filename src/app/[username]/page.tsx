"use client"

import React from "react";
import { useParams } from "next/navigation";

export default function page() {
  // get username from the URL
  const { username } = useParams();
  return <div>Your Username: {username}</div>;
}
