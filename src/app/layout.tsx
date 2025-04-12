import type { Metadata } from 'next';
import { Lalezar } from 'next/font/google';
import Navbar from './components/layout/Header';

import './globals.css';

// Initialize the font object
const lalezar = Lalezar({
  weight: '400', // Lalezar typically only comes in regular weight
  subsets: ['arabic', 'latin'],
  display: 'swap',
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
    <html lang="en">
      <body className={`${lalezar.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
