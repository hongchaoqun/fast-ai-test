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
    // <div className="flex h-screen bg-background relative overflow-hidden">
    <>
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
    </>
  )
}

