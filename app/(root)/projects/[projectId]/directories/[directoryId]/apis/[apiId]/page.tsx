"use client"

import ApiRequest from "@/components/apiData/api-request"
import ApiResponse from "@/components/apiData/api-response"
import ApiTitle from "@/components/apiData/api-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ApiDetailData } from "@/lib/types"
import { getApiData } from "@/services/apiDataService"
import { getMockData, MockDataRequest } from "@/services/nextBackApi"
import { useAuthStore } from "@/store/authStore"
import axios from "axios"
import { ArrowLeft, Play, Save, Plus, Code, Frame, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ApiDetailPage({
  params,
}: {
  params: { projectId: string; directoryId: string; apiId: string }
}) {

  // Mock data - in a real app, this would come from a database
  const [apiData, setApiData] = useState<ApiDetailData>({
    name: "Get Product",
    method: "GET",
    path: "/api/products/{id}",
    description: "Retrieve a product by its ID",
    requestBody: '{}',
    responseBody:
      '{\n  "id": 123,\n  "name": "Product Name",\n  "price": 99.99,\n  "description": "Product description",\n  "inStock": true\n}',
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer {token}" },
    ],
  });
  const [url, setUrl] = useState("https://api.example.com/api/products/123")
  const [responseStatus, setResponseStatus] = useState("")
  const [responseTime, setResponseTime] = useState("")
  const [responseData, setResponseData] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockLoading, setIsMockLoading] = useState(false);

  useEffect(() => {
    fetchApiData();
  }, [params.apiId]); // 添加 apiId 作为依赖项，这样当 apiId 变化时会重新获取数据

  const fetchApiData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getApiData({
        id: params.apiId,
      });

      if (response.code === 0) {
        // 假设 response.data
        const firstItem = response.data;
        if(firstItem){
          setApiData({
            id: firstItem.id.toString(),
            name: firstItem.name,
            path: firstItem.path,
            method: firstItem.method,
            description: "Retrieve a product by its ID",
            requestBody: '{}',
            responseBody:
              '{\n  "id": 123,\n  "name": "Product Name",\n  "price": 99.99,\n  "description": "Product description",\n  "inStock": true\n}',
            headers: [
              { key: "Content-Type", value: "application/json" },
              { key: "Authorization", value: "Bearer {token}" },
            ],
          });
        }
      } else if (response.code === 401) {
        // 处理未授权情况
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return;
      } else {
        throw new Error(response.data.msg || "Failed to fetch API data");
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
      let errorMessage = "Failed to fetch API data";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.msg || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <Frame className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-medium mb-2">Error loading API data</h3>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          {error}
        </p>
        <Button onClick={fetchApiData} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 处理mock
  const handleMock = () => {
    setIsMockLoading(true); // 开始加载
    const request = { path: apiData.path };
    getMockData(request)
      .then((data) => console.log("Mock data:", data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsMockLoading(false)); // 结束加载

  }

  const handleTest = () => {
    // Simulate API test
    setResponseStatus("200 OK")
    setResponseTime("124ms")
    setResponseData(apiData.responseBody)
  }

  return (
    <div className="container py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Link>

      {/* 标题栏 */}
      <div className="flex justify-between items-center mb-6">
        <ApiTitle apiData={apiData} />
        <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleMock}
                disabled={isMockLoading}
              >
                {isMockLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Code className="mr-2 h-4 w-4" />
                )}
                Mock
            </Button>
            <Button variant="outline" className="rounded-full">
                <Save className="mr-2 h-4 w-4" />
                Save
            </Button>
          </div>
      </div>
      
      {/* API详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* 请求参数 */}
          <ApiRequest apiData={apiData}/>
          {/* url */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="request-url">Request URL</Label>
            <div className="flex gap-2">
              <Input
                id="request-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button onClick={handleTest} className="rounded-full shadow-sm">
                <Play className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
        {/* 响应 */}
        <div>
          <ApiResponse responseStatus={responseStatus} responseTime={responseTime} responseData={responseData}/>
        </div>
      </div>
    </div>
  )
}

