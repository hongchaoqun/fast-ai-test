import { Button } from "@/components/ui/button"
import { PlusCircle, Frame } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/project-card"
import { ProjectData } from "@/lib/types"

export default function ProjectsPage() {
  // Mock data - in a real app, this would come from a database
  const projects: ProjectData[] = [
    // {
    //   id: "1",
    //   name: "E-commerce API",
    //   description: "API endpoints for our e-commerce platform",
    //   apiCount: 24,
    //   lastUpdated: "2023-12-10T14:30:00Z",
    // },
    // {
    //   id: "2",
    //   name: "Mobile App Backend",
    //   description: "Backend services for iOS and Android apps",
    //   apiCount: 18,
    //   lastUpdated: "2023-12-05T09:15:00Z",
    // },
    // {
    //   id: "3",
    //   name: "Analytics Service",
    //   description: "Data collection and reporting APIs",
    //   apiCount: 12,
    //   lastUpdated: "2023-11-28T16:45:00Z",
    // },
  ]

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Add an empty state with illustration */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Frame className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Create your first API project to start organizing your endpoints
          </p>
          <Link href="/projects/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

