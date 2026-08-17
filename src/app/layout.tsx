import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Rangers Property Management',
  description: 'Layers hold tales of time. Interactive geology map and geological deep time exploration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
