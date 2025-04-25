import './globals.css';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'AppBase | Modern Web Solutions',
  description: 'Your all-in-one solution for modern web applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
