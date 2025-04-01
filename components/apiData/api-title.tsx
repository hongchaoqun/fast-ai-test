
import { ApiDetailData } from "@/lib/types";

interface ApiData {
  id: string;
  method: string;
  name: string;
  path: string;
}

const ApiTitle = ({ apiData }: { apiData: ApiDetailData }) => {
 
  if (!apiData) {
    return null; // 或者你可以返回一个占位符
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className={`px-3 py-1.5 text-xs font-bold rounded-full ${
            apiData.method === "GET"
              ? "bg-blue-100 text-blue-800"
              : apiData.method === "POST"
              ? "bg-green-100 text-green-800"
              : apiData.method === "PUT"
              ? "bg-yellow-100 text-yellow-800"
              : apiData.method === "DELETE"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {apiData.method}
        </div>
        <h1 className="text-2xl font-bold">{apiData.name}</h1>
      </div>
      <p className="text-muted-foreground mt-1 font-mono text-sm">{apiData.path}</p>
    </div>
  );
};

export default ApiTitle;