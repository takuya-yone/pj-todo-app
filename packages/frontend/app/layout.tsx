import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ToDo App',
  description: 'ToDo App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="pt-10 pb-6 text-center">
          <h1 className="gradient-text text-5xl font-extrabold tracking-tight">Todo App</h1>

          <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400" />
        </header>
        <main className="pb-16">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
