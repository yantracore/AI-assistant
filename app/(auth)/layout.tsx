'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { Spin } from 'antd';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated && user) {
      // Redirect if already authenticated
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/client/dashboard');
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // If authenticated, don't show auth pages
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}