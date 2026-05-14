import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BEE Lab Archive — BGCTUB CSE',
  description: 'Video archive for BGCTUB CSE Department BEE Laboratory. Browse and watch lecture recordings by section.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
