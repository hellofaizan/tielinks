"use client"

import { signOut } from 'next-auth/react'
import React from 'react'
import { useCurrentUser } from '~/hooks/use-current-user'

export default function page() {
  const user = useCurrentUser()

  const handleClick = () => () => signOut()

  return (
    <div className='p-4'>
      <p>{JSON.stringify(user)}</p>

      <button onClick={handleClick()}>Sign out</button>
    </div>
  )
}
