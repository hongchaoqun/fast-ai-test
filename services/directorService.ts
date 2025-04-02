import api from '@/lib/axios';

interface ApiItem {
    id: string;
    name: string;
    method: string;
    path: string;
  }
  
  interface DirectoryResponse {
    id: number;
    name: string;
    description: string;
    datas: ApiItem[];
  }

interface PaginationResponse {
    code: number;
    msg: string;
    data: {
      list: DirectoryResponse[];
      total: number;
    };
  }

// 获取目录列表
export const getDirectors = async (params: {
  pageNo: number;
  pageSize: number;
  projectId: string;
}) => {
  const response = await api.get('/api/directory-data/page', { params });
  return response.data;
};

// 获取目录列表
export const getDirectorsTable = async (params: {
  pageNo: number;
  pageSize: number;
}) => {
  const response = await api.get('/api/file/page', { params });
  return response.data;
};