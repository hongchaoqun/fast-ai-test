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
  
  