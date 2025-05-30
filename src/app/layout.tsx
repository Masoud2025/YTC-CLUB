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
      <body
        className={`AnjomanFont antialiased min-h-screen bg-[#282A2A] relative overflow-x-hidden`}
      >
        {/* Glassmorphism Background Circles */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Large gradient circles */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-20 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-red-500/15 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-br from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>

          {/* Medium floating circles */}
          <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-cyan-300/10 to-blue-400/10 rounded-full blur-2xl animate-bounce-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-300/10 to-pink-400/10 rounded-full blur-2xl animate-bounce-slow animation-delay-1500"></div>
          <div className="absolute top-2/3 right-1/4 w-36 h-36 bg-gradient-to-br from-emerald-300/10 to-green-400/10 rounded-full blur-2xl animate-bounce-slow animation-delay-3000"></div>

          {/* Small accent circles */}
          <div className="absolute top-20 right-1/3 w-24 h-24 bg-gradient-to-br from-rose-300/15 to-pink-400/15 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-gradient-to-br from-violet-300/15 to-purple-400/15 rounded-full blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 right-20 w-20 h-20 bg-gradient-to-br from-amber-300/15 to-yellow-400/15 rounded-full blur-xl animate-float animation-delay-4000"></div>
          <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-teal-300/15 to-cyan-400/15 rounded-full blur-xl animate-float animation-delay-1000"></div>

          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
