import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string, captchaVerification?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ username, password, captchaVerification });
      
      if (response.code === 0 && response.data) {
        storeLogin(response.data);
        router.push('/projects'); // 登录成功后跳转
      } else {
        setError(response.msg || '登录失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    storeLogout();
    router.push('/login'); // 退出后跳转到登录页
  };

  return { login, logout, loading, error };
};