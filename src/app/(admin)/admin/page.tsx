import { USERROLE } from '@prisma/client';
import React from 'react'
import { RoleGate } from '~/components/rolegate';
import { currentRole } from '~/server/user';

export default async function AdminPage() {
  const role = await currentRole();
  return (
    <div>
      Current Role: {role}
    </div>
  )
}
