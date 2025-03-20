import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderPlus, Settings, BookOpen, PlusCircle } from "lucide-react"
import Link from "next/link"
import ApiDirectory from "@/components/api-directory"
import type { DirectoryData } from "@/lib/types"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  // Mock data - in a real app, this would come from a database
  const projectName = params.projectId === "new-project" ? "New Project" : "E-commerce API"

  const directories: DirectoryData[] = [
    {
      id: "1",
      name: "Authentication",
      description: "User authentication endpoints",
      apis: [
        { id: "1", name: "Login", method: "POST", path: "/api/auth/login" },
        { id: "2", name: "Register", method: "POST", path: "/api/auth/register" },
        { id: "3", name: "Refresh Token", method: "POST", path: "/api/auth/refresh" },
      ],
    },
    {
      id: "2",
      name: "Products",
      description: "Product management endpoints",
      apis: [
        { id: "4", name: "Get All Products", method: "GET", path: "/api/products" },
        { id: "5", name: "Get Product", method: "GET", path: "/api/products/{id}" },
        { id: "6", name: "Create Product", method: "POST", path: "/api/products" },
        { id: "7", name: "Update Product", method: "PUT", path: "/api/products/{id}" },
        { id: "8", name: "Delete Product", method: "DELETE", path: "/api/products/{id}" },
      ],
    },
    {
      id: "3",
      name: "Orders",
      description: "Order processing endpoints",
      apis: [
        { id: "9", name: "Get Orders", method: "GET", path: "/api/orders" },
        { id: "10", name: "Create Order", method: "POST", path: "/api/orders" },
        { id: "11", name: "Get Order Status", method: "GET", path: "/api/orders/{id}/status" },
      ],
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {projectName}
          </h1>
          <p className="text-muted-foreground mt-1">Manage your API endpoints and documentation</p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/projects/${params.projectId}/directories/new`}>
            <Button className="rounded-full shadow-sm">
              <FolderPlus className="mr-2 h-4 w-4" />
              New Directory
            </Button>
          </Link>
          <Link href={`/projects/${params.projectId}/settings`}>
            <Button variant="outline" className="rounded-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="directories" className="w-full">
        <TabsList className="mb-6 p-1 bg-muted/50 rounded-full">
          <TabsTrigger value="directories" className="rounded-full">
            API Directories
          </TabsTrigger>
          <TabsTrigger value="documentation" className="rounded-full">
            Documentation
          </TabsTrigger>
          <TabsTrigger value="environments" className="rounded-full">
            Environments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="directories">
          <div className="space-y-6">
            {directories.map((directory) => (
              <ApiDirectory key={directory.id} directory={directory} projectId={params.projectId} />
            ))}

            {directories.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <FolderPlus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No directories yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Create your first directory to start organizing your API endpoints
                </p>
                <Link href={`/projects/${params.projectId}/directories/new`}>
                  <Button className="rounded-full">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Directory
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="documentation">
          <div className="bg-muted/30 p-8 rounded-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Project Documentation</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Add comprehensive documentation for your API project here.
            </p>
            <Button variant="outline" className="rounded-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Documentation
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="environments">
          <div className="bg-muted/30 p-8 rounded-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Settings className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Environment Variables</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Configure different environments (development, staging, production) for testing your APIs.
            </p>
            <Button variant="outline" className="rounded-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Environment
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

