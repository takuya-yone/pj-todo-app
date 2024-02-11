import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata } from 'next'

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
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
