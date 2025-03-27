import { DirectoryData } from "@/lib/types";
import ApiDirectory from "../api-directory";
import { useEffect, useState } from "react";
import { FolderPlus, Link } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function DirectoryList({ projectId }: {projectId : string}) {
    const router = useRouter();
    // 定义 state 来存储目录数据
    const [directories, setDirectories] = useState<DirectoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

    // 调用分页接口获取目录数据
    const fetchDirectories = async () => {
        const token = localStorage.getItem("token");
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        };
        try {
        const response = await fetch(`${PATH_VARIABLE}/api/directory-data/page?pageNo=${pageNo}&pageSize=${pageSize}`, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Failed to fetch directories");
        }

        const data = await response.json();

        // 检查返回的响应
        if (data.code === 0) {
            if (data.data.list && Array.isArray(data.data.list)){
            const directoriesData = data.data.list.map((item: any) => ({
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
            }else {
            console.error("Invalid data :", data);
            }
        } else {
            console.error("Failed to fetch directories:", data.msg);
        }
        } catch (error) {
        console.error("Error fetching directories:", error);
        } finally {
        setLoading(false);
        }
    };
  

    useEffect(() => {
        fetchDirectories();
    }, [pageNo, pageSize]);

    return (
        <>
          <div className="space-y-6">
            {directories.map((directory) => (
              <ApiDirectory key={directory.id} directory={directory} projectId={projectId} />
            ))}

            {directories.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <FolderPlus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No directories yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Create your first directory to start organizing your API endpoints
                </p>
                
                <Button className="rounded-full" onClick={() => router.push(`/projects/${projectId}/directories/new`)}>
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Directory
                </Button>
              </div>
            )}
          </div>
        </>
    )
}