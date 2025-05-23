import type { Metadata } from 'next';
// import { Lalezar } from 'next/font/google';
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';
// import ThemeProvider from './components/Theme/ThemProvider';
import './globals.css';
// import LoadingProvider from './components/ui/LoadingProvider';

export const metadata: Metadata = {
  title: 'یوتیوب کلاب – ارائه خدمات یوتیوب',
  description: 'Learn, design, post – YTC-Club',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`AnjomanFont antialiased min-h-screen bg-[#282A2A]`}>
        {/* <ThemeProvider> */}
        {/* <LoadingProvider> */}
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
        {/* </LoadingProvider> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
