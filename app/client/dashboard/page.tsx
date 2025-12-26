
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to reports as default landing page
    router.push('/client/dashboard/reports');
  }, [router]);

  return null;
}