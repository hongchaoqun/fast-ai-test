import { DirectoryData } from "@/lib/types";
import ApiDirectory from "../api-directory";
import { useEffect, useState } from "react";
import { FolderPlus, Link } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getDirectors } from "@/services/directorService";
import { useAuthStore } from "@/store/authStore";



export default function DirectoryList({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [directories, setDirectories] = useState<DirectoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  // 获取目录数据
  const fetchDirectories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getDirectors({
        pageNo: 1,
        pageSize: 10,
        projectId: projectId
      });

      if (response.code === 0) {
        const directoriesData = response.data.list.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          apis: item.datas.map((api: any) => ({
            id: api.id.toString(),
            name: api.name,
            method: api.method,
            path: api.path,
          })),
        }));
        setDirectories(directoriesData);
      }else if(response.code === 401){
        // 处理未授权情况
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return;
      } else {
        throw new Error(response.data.msg || "Failed to fetch directories");
      }
    } catch (err) {
      console.error("Error fetching directories:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch directories";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectories();
  }, [pageNo, pageSize, projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <FolderPlus className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-medium mb-2">加载目录失败</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchDirectories}>重试</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {directories.map((directory) => (
        <ApiDirectory 
          key={directory.id} 
          directory={directory} 
          projectId={projectId} 
          // onUpdate={fetchDirectories} // 添加更新回调
        />
      ))}

      {directories.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FolderPlus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">暂无目录</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            创建第一个目录来组织您的API端点
          </p>
          
          <Button 
            className="rounded-full" 
            onClick={() => router.push(`/projects/${projectId}/directories/new`)}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            新建目录
          </Button>
        </div>
      )}
    </div>
  );
}