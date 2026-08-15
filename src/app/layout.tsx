import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KultZR – Wear Your Story | Zero-Inventory Luxury Fashion',
  description: 'Express your identity with custom, story-driven apparel crafted on-demand with zero waste. High quality 240 GSM organic cotton t-shirts, hoodies, and accessories.',
  keywords: ['KultZR', 'Wear Your Story', 'Custom Fashion', 'Print on Demand India', 'Sustainable Streetwear', 'Custom Hoodies'],
  authors: [{ name: 'KultZR Brand Team' }],
  openGraph: {
    title: 'KultZR – Wear Your Story',
    description: 'Bespoke, made-to-order fashion platform letting you print your personal story on luxury apparel.',
    siteName: 'KultZR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KultZR - Wear Your Story',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-dark text-brand-pearl antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
