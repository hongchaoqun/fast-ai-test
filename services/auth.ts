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

export const authService = {
  async login(params: LoginParams): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}admin-api/system/auth/login`,
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