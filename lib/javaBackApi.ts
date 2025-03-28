import axios from "axios";

const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

export const enableRecord = async (id: number, token: string | null): Promise<number>  => {

  const headers = {
    'Authorization': `Bearer ${token}`
  };  
  try {
    const response = await axios.put(`${PATH_VARIABLE}/api/file/enable`, null, {
      params: {
        id: id,
      },
      headers: headers
    });
    return response.data.code;
  } catch (error) {
    console.error("API 请求失败:", error);
    throw error;
  }
};