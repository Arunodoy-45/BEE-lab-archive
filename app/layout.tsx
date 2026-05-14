import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'BEE Lab Archive — BGCTUB CSE',
  description: 'Video archive for BGCTUB CSE Department BEE Laboratory.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${jetbrains.variable} bg-[#070807] text-[#F3F6F4] antialiased`}
        style={{ fontFamily: 'var(--font-jakarta), Helvetica, system-ui, sans-serif', fontSize: '15px', lineHeight: '1.5', letterSpacing: '-0.005em' }}
      >
        {children}
      </body>
    </html>
  )
}
