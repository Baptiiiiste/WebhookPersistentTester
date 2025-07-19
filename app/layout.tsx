import type { Metadata } from 'next'
import './globals.css'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Echo',
  description: 'Get feedbacks from your users',
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
