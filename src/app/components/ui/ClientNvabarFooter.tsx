'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../layout/Header';
import Footer from '../layout/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/Admin');

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-4 pb-8">
        <div className="min-h-[calc(100vh-200px)]">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
