import React from "react";

export default function page({ params }: { params: { username: string } }) {
  // get username from the URL
  return <div>Your Username: {params.username}</div>;
}
