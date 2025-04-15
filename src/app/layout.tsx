import type { Metadata } from 'next';
// import { Lalezar } from 'next/font/google';
import { Vazirmatn, Lalezar } from 'next/font/google';
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThemeProvider from './components/Theme/ThemProvider';
import './globals.css';
// import LoadingProvider from './components/ui/LoadingProvider';

// Initialize the font object
const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: ['400', '500', '700'],
});

// Configure Lalezar for headings
const lalezar = Lalezar({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-lalezar',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'YTC-CLUB',
  description: 'Learn, design, post – YTC-Club',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body
        className={`${vazirmatn.variable} ${lalezar.variable} antialiased min-h-screen bg-[#282A2A]`}
      >
        <ThemeProvider>
          {/* <LoadingProvider> */}
          <Navbar />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
          {/* </LoadingProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
