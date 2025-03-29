// src/services/projectService.ts
import api from '@/lib/axios';

// 获取项目列表
export const getProjects = async (params: {
  pageNo: number;
  pageSize: number;
}) => {
  const response = await api.get('/api/project/page', { params });
  return response.data;
};

// 创建项目
export const createProject = async (data: {
  name: string;
  description?: string;
}) => {
  const response = await api.post('/api/project', data);
  return response.data;
};

// 更新项目
export const updateProject = async (
  id: string,
  data: {
    name: string;
    description?: string;
  }
) => {
  const response = await api.put(`/api/project/${id}`, data);
  return response.data;
};

// 删除项目
export const deleteProject = async (id: string) => {
  const response = await api.delete(`/api/project/${id}`);
  return response.data;
};