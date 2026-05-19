import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ReduxProvider } from '@/store/Provider';
import { Toaster } from "sonner";
import { ChatSupport } from './ChatSupport/ChatSupport';


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VestFlow - Smart Investment Platform',
  description: 'Your trusted partner in wealth creation. Join thousands of investors building their financial future with VestFlow.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        // url: '/icon.svg',
        url: '/icon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <ReduxProvider>
            {children}
         <Toaster position="bottom-right" richColors />

   

        {process.env.NODE_ENV === 'production' && <Analytics />}
        </ReduxProvider>
      
      </body>
    </html>
  )
}
