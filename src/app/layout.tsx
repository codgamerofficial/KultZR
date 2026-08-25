import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DealSathi — AI Shopping Intelligence Platform',
  description: 'Tell Sathi what you need. Sathi researches real merchants, normalizes prices, verifies offers, reads reviews, and helps you buy at the right time.',
  keywords: 'AI shopping agent, price comparison India, Deal Score, true price calculator, shopping mission, price watch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#060813] text-slate-100 antialiased selection:bg-brand-blue selection:text-white`}>
        {/* Global Navigation Header */}
        <Header />

        <div className="flex-1 flex max-w-[1500px] w-full mx-auto">
          {/* Desktop Left Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 md:pb-8 overflow-x-hidden">
            {children}
          </main>
        </div>

        {/* Mobile Navigation Bar */}
        <MobileNav />
      </body>
    </html>
  );
}
