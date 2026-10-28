import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PulseLink | Geofenced Emergency Response Network',
  description: 'Real-time emergency blood response network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pulselink-navy text-white antialiased">
        {children}
      </body>
    </html>
  );
}