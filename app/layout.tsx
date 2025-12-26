import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Dashboard - Intelligent Assistant Platform',
  description: 'Complete AI assistant management platform with admin and client dashboards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        <AntdRegistry>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}