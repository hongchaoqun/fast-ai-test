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
import AddEnvironmentModal from "@/components/project/environment/add-environment-modal"
import { toast } from "sonner"
import EnvironmentList from "@/components/project/environment/environment-list"

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
          <EnvironmentList projectId={params.projectId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
