import api from '@/lib/axios';

export const getApiData = async (params: {
  id: string;
}) => {
  const response = await api.get('/api/data/get', { params });
  return response.data;
};