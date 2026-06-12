import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const headingFont = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
});

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ashland Skateland | RVA Roller Skating, Parties, and Classes',
  description:
    'Ashland Skateland is RVA’s premier roller skating destination for family skating, birthday parties, classes, fundraisers, and events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
