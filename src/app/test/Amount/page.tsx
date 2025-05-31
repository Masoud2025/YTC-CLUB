'use client';

export default function ProductPage() {
  const handlePay = async () => {
    const res = await fetch('/api/zarinpal', { method: 'POST' });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('خطا در پرداخت');
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto bg-white rounded shadow">
      <img src="/buster.png" alt="کتاب نمونه" className="w-full rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">خرید پکیج تامنیل </h1>
      <p className="text-gray-600 mb-4">خرید تامنیل داریوش مهرجویی</p>
      <p className="text-lg font-semibold mb-6">قیمت: ۱۰٬۰۰۰ تومان</p>
      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        پرداخت و دانلود
      </button>
    </main>
  );
}
