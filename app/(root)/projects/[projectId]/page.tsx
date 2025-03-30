"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderPlus, Settings, BookOpen, PlusCircle } from "lucide-react"
import Link from "next/link"
import ApiDirectory from "@/components/api-directory"
import type { DirectoryData } from "@/lib/types"
import ProjectHeader from "@/components/project/project-header"
import { useEffect, useState } from "react"
import DirectoryTable from "@/components/directory/directory-table"
import DirectoryList from "@/components/directory/directory-list"
import AddEnvironmentModal from "@/components/project/add-environment-modal"
import { toast } from "sonner"

export default function ProjectPage({ params }: { params: { projectId: string } }) {

  const projectId  = params.projectId;

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


  return (
    <div className="container py-10">

      <ProjectHeader projectId={projectId} />

      <Tabs defaultValue="directories" className="w-full">
        <TabsList className="mb-6 p-1 bg-muted/50 rounded-full">
          <TabsTrigger value="directories" className="rounded-full">
            API Directories
          </TabsTrigger>
          <TabsTrigger value="documentation" className="rounded-full">
            Documentation
          </TabsTrigger>
          <TabsTrigger value="environments" className="rounded-full">
            Environments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="directories">
          <DirectoryList projectId={projectId} />
        </TabsContent>
        <TabsContent value="documentation">
          <DirectoryTable />
        </TabsContent>
        <TabsContent value="environments">
        <div className="space-y-6">
            {/* 环境列表将在这里显示 */}
            <div className="flex justify-end mb-4">
              <AddEnvironmentModal projectId={params.projectId} onEnvironmentAdded={handleEnvironmentAdded} />
            </div>

            {/* 环境列表的空状态 */}
            <div className="bg-muted/30 p-8 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Environment Variables</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Configure different environments (development, staging, production) for testing your APIs.
              </p>
              <AddEnvironmentModal projectId={params.projectId} onEnvironmentAdded={handleEnvironmentAdded} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
