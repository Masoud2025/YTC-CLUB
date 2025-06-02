'use client';
import { useEffect, useState } from 'react';

type User = {
  name: string;
  phone: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-4 bg-white text-center text-shadow-none text-[4em]">
      <h1 className="text-xl font-bold mb-4">لیست کاربران</h1>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="border p-2 rounded">
            <p>👤 نام: {user.name}</p>
            <p>📞 موبایل: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
