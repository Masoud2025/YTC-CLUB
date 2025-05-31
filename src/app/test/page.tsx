/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [products, setProducts] = useState<any[]>([]);

  // Load products on mount
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Add a test product
  const addProduct = async () => {
    const newProduct = {
      id: Date.now(),
      name: 'محصول تستی',
      price: 123456,
    };

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    setProducts([...products, newProduct]);
  };

  // Delete a product by ID
  const deleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">صفحه تست محصولات</h1>

      <button
        onClick={addProduct}
        className="px-4 py-2 bg-green-600 text-white rounded mb-4"
      >
        افزودن محصول تستی
      </button>

      <ul>
        {products.map(p => (
          <li
            key={p.id}
            className="mb-2 flex justify-between items-center text-[5em]"
          >
            <span>
              {p.name} - {p.price.toLocaleString()} تومان
            </span>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-600 border border-red-600 px-2 py-1 rounded"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
