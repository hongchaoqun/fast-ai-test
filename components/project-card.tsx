import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { ProjectData } from "@/lib/types"
import { formatDistanceToNow } from "@/lib/utils"

interface ProjectCardProps {
  project: ProjectData
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.name}</CardTitle>
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
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-4">
        <div className="flex justify-between items-center">
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
            {project.apiCount} API endpoints
          </div>
          <div className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(new Date(project.lastUpdated))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Link href={`/projects/${project.id}`} className="w-full">
          <Button variant="default" className="w-full">
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

