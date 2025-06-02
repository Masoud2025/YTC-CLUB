export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body
        style={{
          background: '#f9f9f9',
          padding: '2rem',
          fontFamily: 'sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
