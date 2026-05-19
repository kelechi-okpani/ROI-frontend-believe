import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ReduxProvider } from '@/store/Provider';
import { Toaster } from "sonner";
import { ChatSupport } from './ChatSupport/ChatSupport';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL('https://vestflow.app'),
  title: {
    default: "Tesla | Smart Investment Platform",
    template: "%s | Tesla"
  },
  description: "Your trusted partner in automated wealth creation. Join thousands of global users building their high-yield financial future with VestFlow.",
  applicationName: "Tesla",
  generator: "Next.js", // Replaced v0.app generator tag for professional branding
  referrer: "origin-when-cross-origin",
  keywords: ["Crypto Investment", "Stock Trading", "Automated Yield", "Wealth Management", "VestFlow"],
  authors: [{ name: "Tesla Team" }],
  
  // 📱 Deep Mobile Link Integration
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tesla - Smart Investment Platform",
  },

  // 🌐 Social Media Link Previews (OpenGraph / Facebook / WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vestflow.app", // Swap this out for your actual live domain URL
    siteName: "Tesla",
    title: "Tesla - Smart Investment Platform",
    description: "Build your high-yield automated financial future. Deep liquidity pools, absolute cross-platform security, and streamlined capital growth.",
    images: [
      {
        url: "/og-image.png", // Recommended size: 1200x630px placed in your public/ folder
        width: 1200,
        height: 630,
        alt: "VestFlow Smart Investment Interface Preview",
      },
    ],
  },

  // 🐦 Social Media Previews (X / Twitter)
  twitter: {
    card: "summary_large_image",
    title: "VestFlow - Smart Investment Platform",
    description: "Build your high-yield automated financial future with VestFlow.",
    images: ["/og-image.png"],
  },

  // 🎨 Multi-Scheme Favicons & App Icons
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png", // Fixed the previous mismatch (png file matching png type)
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <ReduxProvider>
           <Navbar />
            {children}
            <Footer />
         <Toaster position="bottom-right" richColors />

        </ReduxProvider>
      
      </body>
    </html>
  )
}
