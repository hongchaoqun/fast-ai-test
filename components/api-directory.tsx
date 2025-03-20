"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { DirectoryData } from "@/lib/types"
import { useState } from "react"

interface ApiDirectoryProps {
  directory: DirectoryData
  projectId: string
}

export default function ApiDirectory({ directory, projectId }: ApiDirectoryProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const methodColors = {
    GET: { bg: "bg-blue-100", text: "text-blue-800", hover: "group-hover:bg-blue-200" },
    POST: { bg: "bg-green-100", text: "text-green-800", hover: "group-hover:bg-green-200" },
    PUT: { bg: "bg-amber-100", text: "text-amber-800", hover: "group-hover:bg-amber-200" },
    DELETE: { bg: "bg-red-100", text: "text-red-800", hover: "group-hover:bg-red-200" },
    PATCH: { bg: "bg-purple-100", text: "text-purple-800", hover: "group-hover:bg-purple-200" },
  }

  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className={`pb-3 ${isExpanded ? "border-b" : ""}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="sr-only">Toggle directory</span>
            </Button>
            <div>
              <CardTitle className="text-lg">{directory.name}</CardTitle>
              <CardDescription>{directory.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/projects/${projectId}/directories/${directory.id}/apis/new`}>
              <Button size="sm" variant="outline" className="rounded-full">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add API
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-4">
          <div className="space-y-2">
            {directory.apis.map((api) => (
              <Link
                key={api.id}
                href={`/projects/${projectId}/directories/${directory.id}/apis/${api.id}`}
                className="block"
              >
                <div className="group flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-2 py-1 text-xs font-bold rounded-full transition-colors duration-200 ${
                        methodColors[api.method]?.bg || "bg-gray-100"
                      } ${methodColors[api.method]?.text || "text-gray-800"} ${
                        methodColors[api.method]?.hover || "group-hover:bg-gray-200"
                      }`}
                    >
                      {api.method}
                    </div>
                    <div className="font-medium">{api.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{api.path}</div>
                </div>
              </Link>
            ))}

            {directory.apis.length === 0 && (
              <div className="text-center py-6 bg-muted/30 rounded-md">
                <p className="text-muted-foreground mb-2">No APIs in this directory yet</p>
                <Link href={`/projects/${projectId}/directories/${directory.id}/apis/new`}>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add First API
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

