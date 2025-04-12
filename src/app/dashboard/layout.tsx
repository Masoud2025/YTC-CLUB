// app/dashboard/layout.tsx
import React from 'react';
import Link from 'next/link';

// Sidebar navigation items
const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'HomeIcon' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: 'ChartBarIcon' },
  { name: 'Users', href: '/dashboard/users', icon: 'UsersIcon' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'CogIcon' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">My Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100"
                >
                  {/* You can replace this with actual icons */}
                  <span className="w-5 h-5 mr-3 text-gray-500">
                    {/* Icon */}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-lg font-medium">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full hover:bg-gray-100">
                {/* Notification icon */}
                <span className="sr-only">Notifications</span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <span>User Name</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
