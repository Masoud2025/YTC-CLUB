export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body
        style={{
          background: 'gray',
          fontFamily: 'sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
