export interface ProjectData {
    id: string
    name: string
    description: string
    apiCount: number
    lastUpdated: string
  }
  
export interface ApiData {
  id: string
  name: string
  method: string
  path: string
}

export interface DirectoryData {
  id: string
  name: string
  description: string
  apis: ApiData[],
  filePath: string
}

export interface ApiEnvData {
  id: string
  envName: string
  baseUrl: string
  projectId: number
}
  
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export interface Header {
  key: string;
  value: string;
  description?: string; // 可选字段
  required?: boolean;   // 可选字段
}

export interface ApiDetailData {
  id?: string;          // 可选ID
  name: string;
  method: HttpMethod;   // 限制为特定HTTP方法
  path: string;
  description: string;
  requestBody: string;
  responseBody: string;
  headers: Header[];
  queryParameters?: {   // 可选查询参数
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  createdAt?: string;   // 可选创建时间
  updatedAt?: string;   // 可选更新时间
}