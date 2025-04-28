import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'AppBase | Modern Web Solutions',
  description: 'Your all-in-one solution for modern web applications',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'  // For iOS/Safari
  },
  openGraph: {
    title: 'AppBase',
    description: 'Your all-in-one solution for modern web applications',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppBase',
    description: 'Your all-in-one solution for modern web applications',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{contain: 'paint'}}>
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
