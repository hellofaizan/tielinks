import React from 'react'
import { auth, signOut } from '~/server/auth'

export default async function page() {
  const session = await auth();
  const username = session?.user.username

  console.log(username)
  return (
    <div>
      {JSON.stringify(session, null, 2)}

      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <button>Sign out</button>
      </form>
    </div>
  )
}
