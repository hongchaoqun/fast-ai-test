"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Search, Plus, FileText, LayoutDashboard, Database, Settings, Users, Github, Menu, X } from "lucide-react"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-[200px] border-r px-4 py-6 flex flex-col gap-1 bg-background
          transform transition-transform duration-200 ease-in-out
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

      {/* Main Content */}
      <main className="flex-1 p-6 w-full overflow-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="知识库名称" className="pl-8 w-[300px] max-w-[calc(100vw-120px)]" />
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新建
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
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
          ].map((item, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start gap-2">
                  <FileText className="h-6 w-6 text-primary shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{item.description}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">O</AvatarFallback>
                    </Avatar>
                    <span>Owner</span>
                    <Badge variant="secondary" className="font-normal">
                      私有
                    </Badge>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    text-embedding-v3
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

