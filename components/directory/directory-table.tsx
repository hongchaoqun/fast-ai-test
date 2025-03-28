"use client"

import { FileIcon, MoreHorizontal, PlusIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import axios from "axios"
import { enableRecord } from "@/services/javaBackApi"

export default function DirectoryTable() {

    // 定义 state 来存储文件数据
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;
    const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);

    const token = localStorage.getItem('token');

    // 调用分页接口获取文件数据
    const fetchFiles = async () => {
        const token = localStorage.getItem("token");
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        };
        try {
            const response = await axios.get(`${PATH_VARIABLE}/api/file/page`, {
                params: {
                    pageNo: 1, // 第一页
                    pageSize: 10, // 每页 10 条
                },
                headers: headers
            });

            // 检查返回的响应
            if (response.status === 200 && response.data.code === 0) {
                const data = response.data.data;
                setFiles(data.list);
            } else {
                console.error("Failed to fetch files:", response.data.msg);
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleTrainClick = async (filePath: string, fileId: number, enabled: number) => {

        if(enabled === 1){
            return; // 如果已经启用，则不执行任何操作
        }
        setSelectedFilePath(filePath);
        console.log("Selected file path:", filePath);
        try {
          const response = await fetch('/api/project/database', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath,fileId }),
          });
    
          if (!response.ok) {
            throw new Error('训练失败');
          }
    
          const data = await response.json();
          if (data.success) {
                // // 训练成功，更新表格数据
                console.log("Training successful, 这里的token。。。。。。", token);
                const res = await enableRecord(fileId, token); 
                if (res == 0) {
                    fetchFiles(); // 刷新表格数据
                }
          } else {
            alert('训练失败，请稍后再试');
          }
        } catch (error) {
          console.error('训练失败:', error);
          alert('训练失败，请稍后再试');
        } finally {
          setSelectedFilePath(null);
        }

    };

    return (
        <>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[250px]">名称</TableHead>
                            <TableHead>分组目录</TableHead>
                            <TableHead>训练模式</TableHead>
                            <TableHead>数据量</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead>文件路径</TableHead>
                            <TableHead>启用</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-4">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : files.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-4">
                                    No files found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            files.map((file) => (
                                <TableRow key={file.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="h-5 w-5 text-gray-500" />
                                            {file.fileName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{file.dirName}</TableCell>
                                    <TableCell>{file.model}</TableCell>
                                    <TableCell>{file.number}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                            <span className="text-sm text-green-600">已完结</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p>{file.url}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Switch defaultChecked={file.enabled === 1} />
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleTrainClick(file.url, file.id, file.enabled)}>训练</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}