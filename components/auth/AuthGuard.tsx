'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth-storage');
    if (!token && !accessToken) {
      router.push('/login');
    }
    setIsCheckingAuth(false);
  }, [accessToken, router]);

  if (isCheckingAuth || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}