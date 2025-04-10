"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Frame } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import ProjectList from "@/components/project/project-list"

export default function ProjectsPage() {

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
      <ProjectList />
    </div>
  )
}

