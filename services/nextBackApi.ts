import api from "axios";


export interface MockDataRequest {
    path: string;
}

export const getMockData = async (request: MockDataRequest) => {
const response = await api.post('/api/project/mock', request);
return response.data;
};

export const trainData = async (filePath: string) => {

    
};