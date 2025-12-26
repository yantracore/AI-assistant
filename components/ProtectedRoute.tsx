

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAuthStore } from '@/lib/store/auth-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireClient?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  requireClient = false 
}: ProtectedRouteProps) {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, isLoading, isAdmin, isClient } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (requireAdmin && !isAdmin()) {
        router.push('/login');
        return;
      }

      if (requireClient && !isClient()) {
        router.push('/login');
        return;
      }
    }
  }, [mounted, isLoading, isAuthenticated, user, router, requireAdmin, requireClient, isAdmin, isClient]);

  if (!mounted || isLoading) {
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

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && !isAdmin()) {
    return null;
  }

  if (requireClient && !isClient()) {
    return null;
  }

  return <>{children}</>;
}