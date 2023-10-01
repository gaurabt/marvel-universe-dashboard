import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NextUiProvider from './providers/NextUIProvider'



const font = Poppins({ 
  weight: ['400', '600'],
  style: ['normal'],
  subsets: ['latin']
 })

export const metadata: Metadata = {
  title: 'Marvel Universe Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextUiProvider>
      <body className={font.className}>{children}</body>
      </NextUiProvider>
    </html>
  )
}
