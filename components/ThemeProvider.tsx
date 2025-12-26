'use client';

import { ConfigProvider, theme as antTheme } from 'antd';
import { useThemeStore } from '@/lib/store/theme-store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <div
        data-theme={theme}
        style={{
          minHeight: '100vh',
          background: theme === 'dark' ? '#000' : '#f0f2f5',
          transition: 'background 0.2s ease',
        }}
      >
        {children}
      </div>
    </ConfigProvider>
  );
}
