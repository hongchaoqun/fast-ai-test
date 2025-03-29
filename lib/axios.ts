import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 请求拦截器
api.interceptors.request.use((config) => {
  console.log("===================================== 走到这里  ===========================================")
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("===================================== 走到这里 2 ===========================================")
      // 处理网络错误
      if (error.code === 'ECONNABORTED') {
        console.error('请求超时');
      } else if (!error.response) {
        console.error('网络错误:', error.message);
      }
      
      // 处理HTTP错误
      if (error.response) {
        console.error('HTTP错误:', error.response.status);
        if (error.response.status === 401) {
          useAuthStore.getState().logout();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
      
      return Promise.reject(error);
    }
  );
export default api;