// app/dashboard/page.tsx
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to your dashboard!</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Users', 'Revenue', 'Orders', 'Conversion Rate'].map(stat => (
          <div key={stat} className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Total {stat}</p>
            <p className="text-2xl font-bold mt-2">
              {stat === 'Revenue'
                ? '$12,345'
                : stat === 'Conversion Rate'
                ? '24.5%'
                : '1,234'}
            </p>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">↑ 12%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center border-b pb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <p className="font-medium">User #{i} performed an action</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
