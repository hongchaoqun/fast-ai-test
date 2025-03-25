"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { FolderPlus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ProjectHeader( { projectId }: { projectId: string } ){

    const router = useRouter()
    console.log(projectId)

    const projectName = projectId === "new-project" ? "New Project" : "E-commerce API"

    return (
        <nav>
            <div className="flex justify-between items-center mb-8">
                <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {projectName}
                </h1>
                <p className="text-muted-foreground mt-1">管理您的 API 端点和文档</p>
                </div>
                <div className="flex space-x-2">
                    <Button className="rounded-full shadow-sm" onClick={() => router.push(`/projects/${projectId}/directories/new`)}>
                        <FolderPlus className="mr-2 h-4 w-4" />
                        New Directory
                    </Button>
                    <Button variant="outline" className="rounded-full" onClick={() => router.push(`/projects/${projectId}/settings`)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </div>
            </div>
        </nav>
    )
}