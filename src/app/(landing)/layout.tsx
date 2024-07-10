import React from 'react'
import { FloatingNavBar } from './components/FloatingNav'

export default function LandingLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        <FloatingNavBar />
        {children}
      </div>
    )
  }