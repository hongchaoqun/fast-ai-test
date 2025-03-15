"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LayoutDashboard, FileText, Database, Settings, Users, Github, X } from "lucide-react"

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            <Avatar className="h-8 w-8">
              <AvatarFallback>KB</AvatarFallback>
            </Avatar>
            <span className="font-medium">我的知识库</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">关闭菜单</span>
          </Button>
        </div>

        <nav className="space-y-0.5">
          {[
            { icon: LayoutDashboard, label: "概览", active: true },
            { icon: FileText, label: "工作台" },
            { icon: Database, label: "知识库" },
            { icon: Settings, label: "工具箱" },
            { icon: Users, label: "联系" },
          ].map((item, i) => (
            <Button key={i} variant={item.active ? "secondary" : "ghost"} className="w-full justify-start gap-2">
              <item.icon className="h-4 w-4" />
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