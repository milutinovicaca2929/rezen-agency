import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB';
import { AnimationProvider } from '@/components/providers/AnimationProvider';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Rezen Agency — Digital Marketing',
  description:
    'Premium websites, landing pages, Meta Ads and Google Ads for clinics, service businesses and ambitious brands.',
  metadataBase: new URL('https://www.rezenagency.com'),
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-white text-foreground antialiased">
        <AnimationProvider>
          <Header />
          <main className="flex-1 pt-0">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </AnimationProvider>
      </body>
    </html>
  );
}
