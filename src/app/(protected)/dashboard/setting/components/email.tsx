"use client";

import React from "react";

export default function Email({ user }: any) {
//   console.log(user);

  const handleChange = () => {
    console.log("change");
  };

  return (
    <div className="flex items-center justify-between p-2">
      <p>Collect Email</p>
      <label className="switch">
        <input type="checkbox" onChange={handleChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
