"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, FileText, Database, Settings, Users, Github, X, Menu } from 'lucide-react'
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "项目", url: "/projects", active: pathname?.startsWith("/projects") },
    { icon: FileText, label: "工作台", url: "/workspace", active: pathname?.startsWith("/workspace") },
    { icon: Database, label: "文档库", url: "/database", active: pathname?.startsWith("/database") },
    { icon: Settings, label: "工具箱", url: "/tools", active: pathname?.startsWith("/tools") },
    { icon: Users, label: "联系", url: "/contact", active: pathname?.startsWith("/contact") },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" 
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">打开菜单</span>
      </Button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 inset-y-0 left-0 z-50
          w-[240px] border-r px-4 py-6 flex flex-col gap-1 bg-background
          transform transition-all duration-300 ease-in-out h-screen overflow-hidden
          shadow-md md:shadow-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between gap-2 px-2 mb-8">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 rounded-lg bg-primary/10">
              <AvatarFallback className="text-primary font-semibold">API</AvatarFallback>
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                API Manager
              </span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full hover:bg-primary/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">关闭菜单</span>
          </Button>
        </div>

        <nav className="space-y-1.5 py-4">
          {menuItems.map((item, i) => (
            <Link href={item.url} key={i}>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={`
                  w-full justify-start gap-3 rounded-lg transition-all duration-200
                  ${item.active ? 
                    "bg-primary/10 text-primary hover:bg-primary/15" : 
                    "hover:bg-muted/50"
                  }
                `}
              >
                <item.icon className={`h-4 w-4 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={item.active ? "font-medium" : ""}>{item.label}</span>
                {item.active && (
                  <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />
                )}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <Card className="border shadow-sm hover:shadow-md transition-all duration-200 bg-muted/30">
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium mb-1">开源项目</p>
              <p className="text-xs text-muted-foreground mb-3">在GitHub上查看源代码</p>
              <Button variant="outline" size="sm" className="w-full rounded-full">
                查看源码
              </Button>
            </CardContent>
          </Card>
          
          {/* <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-full border-2 border-primary/20">
                <AvatarFallback className="text-xs font-medium">用户</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">用户名</div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </aside>
    </>
  )
}