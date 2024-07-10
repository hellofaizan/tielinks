"use client"

import { useSession, signOut } from 'next-auth/react'
import React from 'react'

export default function page() {
  const session = useSession()

  console.log(session.data?.user.email)

  const handleClick = () => () => signOut()

  return (
    <div>
      {JSON.stringify(session, null, 2)}

      <button onClick={handleClick()}>Sign out</button>
    </div>
  )
}
