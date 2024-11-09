import { QueryProvider } from '@/providers/query-provider';
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import './globals.css'

const roboto = Roboto_Flex({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Starred Job Search',
  description: 'Find your next opportunity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
} 