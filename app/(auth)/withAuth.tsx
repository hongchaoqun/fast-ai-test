'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

// 保护路由
export default function withAuth(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // 或者返回一个加载状态
    }

    return <WrappedComponent {...props} />;
  };
}