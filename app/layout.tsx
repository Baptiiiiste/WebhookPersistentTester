import type { Metadata } from 'next'
import './globals.css'
import type React from 'react'

export const metadata: Metadata = {
  title: 'Webhook Persistent Tester',
  description: 'Collect and replay webhooks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
