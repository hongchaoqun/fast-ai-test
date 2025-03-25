"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Bell, Search, HelpCircle, ChevronDown, Menu, X } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface NavbarProps {
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

export default function Navbar({ toggleSidebar, isMobile = false }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  
  // 模拟用户数据 - 实际应用中应从认证系统获取
  const user = {
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "管理员"
  }

  return (
    <header className="sticky top-0 z-1000 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left section - Mobile menu toggle + Search */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full hover:bg-primary/10"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
          )}

          {/* logo */}
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
                // onClick={() => setSidebarOpen(false)}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">关闭菜单</span>
            </Button>
        </div>
          
          {/* Search bar - Expands on mobile when active */}
          <div className={`relative ${searchOpen ? "w-full" : "hidden md:block w-auto"}`}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索..."
              className="w-full md:w-[200px] lg:w-[300px] pl-9 rounded-full bg-muted/50 border-dashed focus:border-solid"
            />
            {searchOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 rounded-full md:hidden"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Search toggle for mobile */}
          {!searchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full hover:bg-primary/10"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </Button>
          )}
        </div>
        
        {/* Right section - Notifications, Help, User Profile */}
        <div className="flex items-center gap-2">
          {/* Notification button */}
          <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-primary/10">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            <span className="sr-only">通知</span>
          </Button>
          
          {/* Help button */}
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">帮助</span>
          </Button>
          
          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full pl-1 pr-2 py-1.5 hover:bg-primary/10">
                <Avatar className="h-7 w-7 mr-2 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                    {user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm hidden sm:inline-block">{user.name}</span>
                <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer rounded-lg">
                个人资料
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg">
                账户设置
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg">
                API密钥管理
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer rounded-lg text-destructive focus:text-destructive">
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}