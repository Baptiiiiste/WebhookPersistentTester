import type { Metadata } from 'next'
import './globals.css'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Echo',
  description: 'Get feedbacks from your users',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
