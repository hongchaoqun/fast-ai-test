"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import FileUpload from "@/components/file-upload"
import axios from "axios"; // 引入 axios 用于发送请求

export default function NewDirectoryPage({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null) // 新增文件状态
  const [filePath, setFilePath] = useState("") // 新增文件路径状态

  const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

  // 处理文件上传逻辑
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", file.name); // 添加文件路径参数

    try {
      const response = await axios.post(`${PATH_VARIABLE}/infra/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully:", response.data);
        setFilePath(response.data.data); // 设置文件路径
      } else {
        console.error("File upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    console.log("Creating directory:", { name, description })

    console.log("File path:", filePath); // 打印文件路径
  }

  return (
    <div className="container max-w-2xl py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Link>

      <Card className="overflow-hidden border shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle>Create New API Directory</CardTitle>
          <CardDescription>Create a new directory to organize related API endpoints</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Directory Name</Label>
              <Input
                id="name"
                placeholder="Enter directory name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-dashed focus:border-solid"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe this group of APIs"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="border-dashed focus:border-solid"
              />
            </div>
            {/* 新增文件上传组件 */}
            <FileUpload onFileChange={handleFileUpload} />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t bg-muted/10 py-4">
            <Link href={`/projects/${params.projectId}`}>
              <Button variant="outline" className="rounded-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="rounded-full shadow-sm">
              Create Directory
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

