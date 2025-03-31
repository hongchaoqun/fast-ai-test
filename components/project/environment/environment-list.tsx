import { ApiEnvData } from "@/lib/types";
import { getEnvs } from "@/services/environmentService";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Edit, Settings, Trash } from "lucide-react";
import AddEnvironmentModal from "./add-environment-modal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function EnvironmentList({projectId}: { projectId: string}) {

    const [envDatas, setEnvDatas] = useState<ApiEnvData[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        fetchEnvs();
    }, [pageNo, pageSize]);

    const [environments, setEnvironments] = useState<any[]>([])

    const handleEnvironmentAdded = (newEnv: {
        id: number
        name: string
        baseUrl: string
        variables: { key: string; value: string }[]
      }) => {
        setEnvironments([...environments, newEnv])
        toast.success(`环境 ${newEnv.name} 已添加`)
      }

    const fetchEnvs = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await getEnvs({
            pageNo: 1,
            pageSize: 100,
            projectId: projectId
          });
    
          if (response.code === 0) {
            console.log(response)
            setEnvDatas(
              response.data.list.map((item: any) => ({
                id: item.id.toString(),
                envName: item.envName,
                baseUrl: item.baseUrl,
                projectId: item.projectId,
              }))
            );
          } else if(response.code === 401){
              // 处理未授权情况
              useAuthStore.getState().logout();
              window.location.href = "/login";
              return;
          }
          else {
            throw new Error(response.data.msg || "Failed to fetch envs");
          }
        } catch (error) {
          console.error("Error fetching envs:", error);
          let errorMessage = "Failed to fetch envs";
          
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

      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        );
      }

      const handleEdit = (id: string) => {
        // 处理编辑逻辑
        console.log("编辑环境:", id);
      };
    
      const handleDelete = (id: string) => {
        // 处理删除逻辑
        console.log("删除环境:", id);
      };
    

    return (
        <>
            <div className="space-y-6">
                {/* 添加环境按钮 */}
                <div className="flex justify-end mb-4">
                <AddEnvironmentModal
                    projectId={projectId}
                    onEnvironmentAdded={handleEnvironmentAdded}
                />
                </div>

                {/* 环境列表表格 */}
                <div className="rounded-md border bg-card">
                    <Table>
                        {/* <TableCaption>环境列表</TableCaption> */}
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                            <TableHead>环境名称</TableHead>
                            <TableHead>基础 URL</TableHead>
                            <TableHead>操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {envDatas.map((env) => (
                            <TableRow key={env.id}>
                                <TableCell>{env.envName}</TableCell>
                                <TableCell>{env.baseUrl}</TableCell>
                                <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(env.id)}
                                    >
                                    <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(env.id)}
                                    >
                                    <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* 空状态 */}
                {envDatas.length === 0 && (
                <div className="bg-muted/30 p-8 rounded-lg text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Settings className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Environment Variables</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    Configure different environments (development, staging, production) for testing your APIs.
                    </p>
                    <AddEnvironmentModal
                    projectId={projectId}
                    onEnvironmentAdded={handleEnvironmentAdded}
                    />
                </div>
                )}
            </div>
        </>
    )

}