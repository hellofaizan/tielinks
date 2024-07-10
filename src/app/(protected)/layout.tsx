import React from 'react'

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        {/* Common Side Bar Here */}
        {children}
      </div>
    )
  }