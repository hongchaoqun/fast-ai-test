"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LayoutDashboard, FileText, Database, Settings, Users, Github, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useRouter();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-[200px] border-r px-4 py-6 flex flex-col gap-1 bg-background
          transform transition-transform duration-200 ease-in-out h-screen overflow-hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between gap-2 px-2 mb-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 text-blue-500">
              <AvatarFallback>KB</AvatarFallback>
            </Avatar>
            <span className="font-medium text-blue-500">Fast-ai-test</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">关闭菜单</span>
          </Button>
        </div>

        <nav className="space-y-2 py-8">
          {[
            { icon: LayoutDashboard, label: "项目", url: "/", active: true },
            { icon: FileText, label: "工作台", url: "/workspace" },
            { icon: Database, label: "文档库", url: "/database" },
            { icon: Settings, label: "工具箱", url: "/tools" },
            { icon: Users, label: "联系", url: "/contact" },
          ].map((item, i) => (
            <Button key={i} 
              variant={item.active ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2 "
              onClick={() => navigate.push(item.url)}
            >
              <item.icon className="h-4 w-4 text-blue-500" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </aside>
    </>
  )
} 