"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default async function page() {
  const searchParams = useSearchParams();

  // Example of accessing a specific query parameter
  const username = searchParams.get("u") || "";
  const link = searchParams.get("l") || "";
  
  return <div>page {username + link}</div>;
}
