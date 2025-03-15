"use client"

import { useState } from "react"
import ProjectHeader from "@/components/ui/projectHeader"
import ProjectCard from "@/components/ui/ProjectCard"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

    // 定义数据对象
    const projectData = [
      {
        title: "接口文档",
        description: "这个知识库还没有介绍~",
        type: "通用知识库",
      },
      {
        title: "第一个知识库",
        description: "这个知识库还没有介绍~",
        type: "通用知识库",
      },
    ]

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-6 w-full overflow-auto">
        <ProjectHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectData.map((item, i) => (
            <ProjectCard key={i} title={item.title} description={item.description} />
          ))}
        </div>
      </main>
    </>
  )
}

