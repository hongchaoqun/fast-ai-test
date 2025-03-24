import Link from "next/link";
import { Button } from "../ui/button";
import { FolderPlus, Settings } from "lucide-react";


export default function ProjectHeader( projectId : string ){

      // Mock data - in a real app, this would come from a database
      const projectName = projectId === "new-project" ? "New Project" : "E-commerce API"

    return (
        <nav>
            <div className="flex justify-between items-center mb-8">
                <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {projectName}
                </h1>
                <p className="text-muted-foreground mt-1">Manage your API endpoints and documentation</p>
                </div>
                <div className="flex space-x-2">
                <Link href={`/projects/${projectId}/directories/new`}>
                    <Button className="rounded-full shadow-sm">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Directory
                    </Button>
                </Link>
                <Link href={`/projects/${projectId}/settings`}>
                    <Button variant="outline" className="rounded-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    </Button>
                </Link>
                </div>
            </div>
        </nav>
    )
}