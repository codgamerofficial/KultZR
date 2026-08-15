import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PromoBannerModal from '@/components/PromoBannerModal';
import { CartProvider } from '@/lib/cartContext';
import { AuthProvider } from '@/lib/authContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'KultZR – Wear Your Story | Zero-Inventory Luxury Fashion',
  description: 'Unapologetic, high-density 240 GSM organic cotton streetwear and bespoke 2D apparel studio built on zero-waste on-demand printing.',
  keywords: ['KultZR', 'Wear Your Story', 'Luxury Streetwear', 'Zero Inventory', 'Print on Demand', 'Custom Apparel India'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/brand/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-brand-dark text-brand-pearl font-sans antialiased min-h-screen flex flex-col selection:bg-brand-gold selection:text-brand-dark">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <PromoBannerModal />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
