import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginParams {
  username: string;
  password: string;
  captchaVerification?: string;
}

interface LoginResponse {
  code: number;
  data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    expiresTime: string;
  };
  msg: string;
}

// 请求拦截器
axios.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  
// 响应拦截器 - 处理 token 过期等情况
axios.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response?.status === 401) {
    useAuthStore.getState().logout();
    // 可以在这里跳转到登录页
    }
    return Promise.reject(error);
}
);

export const authService = {
  async login(params: LoginParams): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/system/auth/login`,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.msg || '登录失败');
      }
      throw new Error('登录失败');
    }
  },
};