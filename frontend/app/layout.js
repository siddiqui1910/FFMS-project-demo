import './globals.css';

export const metadata = {
  title: 'FFMS - Fish Farm Management System',
  description: 'Manage ponds, batches, feed, harvests, and sales',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}