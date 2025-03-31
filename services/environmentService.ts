import api from '@/lib/axios';

export const getEnvs = async (params: {
  pageNo: number;
  pageSize: number;
  projectId: string;
}) => {
  const response = await api.get('/api/env/page', { params });
  return response.data;
};