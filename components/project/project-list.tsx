"use client"

import { ProjectData } from "@/lib/types";
import { Frame, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ProjectCard from "./project-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner"; // 推荐使用 sonner 或类似的 toast 库
import { getProjects } from "@/services/projectService";

interface ApiResponse {
  code: number;
  msg: string;
  data: {
    list: Array<{
      id: number;
      name: string;
      description: string;
      apiCount: number;
      createTime: string;
    }>;
  };
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuthStore();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchProjects();
  }, [pageNo, pageSize]);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getProjects({
        pageNo: 1,
        pageSize: 10,
      });

      if (response.code === 0) {
        console.log(response)
        setProjects(
          response.data.list.map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            apiCount: item.apiCount,
            lastUpdated: item.createTime,
          }))
        );
      } else if(response.code === 401){
          // 处理未授权情况
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return;
      }
      else {
        throw new Error(response.data.msg || "Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      let errorMessage = "Failed to fetch projects";
      
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

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <Frame className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-medium mb-2">Error loading projects</h3>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          {error}
        </p>
        <Button onClick={fetchProjects} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Add an empty state with illustration */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Frame className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Create your first API project to start organizing your endpoints
          </p>
          <Link href="/projects/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}