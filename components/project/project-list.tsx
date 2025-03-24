"use client"

import { ProjectData } from "@/lib/types";
import { Frame, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ProjectCard from "./project-card";
import { useEffect, useState } from "react";


export default function ProjectList( ){

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;
  
    useEffect(() => {
      fetchProjects();
    }, [pageNo, pageSize]);
  
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await fetch(`${PATH_VARIABLE}/api/project/page?pageNo=${pageNo}&pageSize=${pageSize}`, {
          method: "GET",
          headers: headers,
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
  
        const data = await response.json();
        if (data.code === 0) {
          // 给projects赋值
          setProjects(data.data.list.map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            apiCount: item.apiCount,
            lastUpdated: item.createTime,
          })));
        } else {
          console.error(data.msg || "Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    

    return(
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
    )
}