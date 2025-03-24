"use client"

import { useState } from "react"
import { ArrowLeft, Save, Trash2, Users, Database, Download, Upload, GitBranch } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProjectSettingsPage({ params }: { params: { projectId: string } }) {
  // Mock data - in a real app, this would come from a database
  const [projectName, setProjectName] = useState("E-commerce API")
  const [projectDescription, setProjectDescription] = useState("API endpoints for our e-commerce platform")
  const [isPublic, setIsPublic] = useState(false)
  const [requireAuth, setRequireAuth] = useState(true)
  const [selectedVersion, setSelectedVersion] = useState("1.0.0")

  const teamMembers = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Owner" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Viewer" },
  ]

  const environments = [
    { id: "1", name: "Development", baseUrl: "https://dev-api.example.com", variables: 4 },
    { id: "2", name: "Staging", baseUrl: "https://staging-api.example.com", variables: 5 },
    { id: "3", name: "Production", baseUrl: "https://api.example.com", variables: 6 },
  ]

  const versions = [
    { version: "1.0.0", date: "2023-10-15", current: true },
    { version: "0.9.0", date: "2023-09-01", current: false },
    { version: "0.8.5", date: "2023-08-10", current: false },
  ]

  return (
    <div className="container py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Project Settings
          </h1>
          <p className="text-muted-foreground mt-1">Configure your API project settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 p-1 bg-muted/50 rounded-full">
          <TabsTrigger value="general" className="rounded-full">
            General
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-full">
            Team
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-full">
            Security
          </TabsTrigger>
          <TabsTrigger value="environments" className="rounded-full">
            Environments
          </TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-full">
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic information about your API project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border-dashed focus:border-solid"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={4}
                  className="border-dashed focus:border-solid"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-visibility">Project Visibility</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="project-visibility" checked={isPublic} onCheckedChange={setIsPublic} />
                  <Label htmlFor="project-visibility" className="cursor-pointer">
                    {isPublic ? "Public" : "Private"}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isPublic
                    ? "Public projects can be viewed by anyone with the link"
                    : "Private projects are only visible to team members"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t bg-muted/10 py-4">
              <Button className="rounded-full shadow-sm">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team">
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage who has access to this API project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" className="rounded-full">
                  <Users className="mr-2 h-4 w-4" />
                  Invite Members
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 font-medium text-sm">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-4">Email</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-1"></div>
                </div>

                {teamMembers.map((member) => (
                  <div key={member.id} className="grid grid-cols-12 gap-4 p-4 border-t items-center">
                    <div className="col-span-5">{member.name}</div>
                    <div className="col-span-4 text-muted-foreground">{member.email}</div>
                    <div className="col-span-2">
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Owner">Owner</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {member.role !== "Owner" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove member</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-2">Role Permissions</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline">Owner</Badge>
                    <span className="text-muted-foreground">
                      Full access to all project settings and can manage team members
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline">Editor</Badge>
                    <span className="text-muted-foreground">
                      Can create, edit, and delete APIs, but cannot change project settings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline">Viewer</Badge>
                    <span className="text-muted-foreground">
                      Can view APIs and documentation, but cannot make changes
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">API Authentication</h3>
                    <p className="text-sm text-muted-foreground">Require authentication for API access</p>
                  </div>
                  <Switch id="require-auth" checked={requireAuth} onCheckedChange={setRequireAuth} />
                </div>

                {requireAuth && (
                  <div className="pl-6 border-l-2 border-primary/20 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auth-method">Authentication Method</Label>
                      <Select defaultValue="api-key">
                        <SelectTrigger id="auth-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="api-key">API Key</SelectItem>
                          <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                          <SelectItem value="jwt">JWT</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id="api-key"
                          value="sk_test_51KjdU2CjY7tYHI8s9XgDVhjK"
                          type="password"
                          readOnly
                          className="font-mono"
                        />
                        <Button variant="outline" className="shrink-0 rounded-full">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">CORS Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure Cross-Origin Resource Sharing</p>
                  </div>
                  <Switch defaultChecked id="enable-cors" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowed-origins">Allowed Origins</Label>
                  <Textarea
                    id="allowed-origins"
                    placeholder="https://example.com
https://app.example.com"
                    rows={3}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter one origin per line, or use * to allow all origins
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Rate Limiting</h3>
                    <p className="text-sm text-muted-foreground">Limit the number of requests per client</p>
                  </div>
                  <Switch defaultChecked id="enable-rate-limit" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Requests per minute</Label>
                    <Input id="rate-limit" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-burst">Burst limit</Label>
                    <Input id="rate-limit-burst" type="number" defaultValue="100" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t bg-muted/10 py-4">
              <Button className="rounded-full shadow-sm">
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Environments Settings */}
        <TabsContent value="environments">
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Environments</CardTitle>
              <CardDescription>Manage different environments for testing your APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" className="rounded-full">
                  <Database className="mr-2 h-4 w-4" />
                  Add Environment
                </Button>
              </div>

              <div className="grid gap-4">
                {environments.map((env) => (
                  <Card key={env.id} className="overflow-hidden">
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{env.name}</CardTitle>
                        <Badge variant="outline" className="rounded-full px-3">
                          {env.variables} variables
                        </Badge>
                      </div>
                      <CardDescription>{env.baseUrl}</CardDescription>
                    </CardHeader>
                    <CardFooter className="py-3 bg-muted/10 border-t flex justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Edit Variables
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          Duplicate
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure versioning, import/export, and other advanced options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">API Versioning</h3>
                <div className="flex items-center gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="current-version">Current Version</Label>
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger id="current-version">
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        {versions.map((v) => (
                          <SelectItem key={v.version} value={v.version}>
                            {v.version} {v.current && "(Current)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="mt-8 rounded-full">
                    <GitBranch className="mr-2 h-4 w-4" />
                    Create New Version
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 font-medium text-sm">
                    <div className="col-span-4">Version</div>
                    <div className="col-span-4">Release Date</div>
                    <div className="col-span-4">Status</div>
                  </div>

                  {versions.map((version) => (
                    <div key={version.version} className="grid grid-cols-12 gap-4 p-4 border-t items-center">
                      <div className="col-span-4 font-mono">{version.version}</div>
                      <div className="col-span-4 text-muted-foreground">{version.date}</div>
                      <div className="col-span-4">
                        {version.current ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Current</Badge>
                        ) : (
                          <Badge variant="outline">Previous</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Import / Export</h3>
                <div className="flex gap-4">
                  <Button variant="outline" className="rounded-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import from File
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Project
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Import from Swagger, OpenAPI, Postman, or export your project for backup or sharing
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-destructive">Danger Zone</h3>
                <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delete Project</h4>
                      <p className="text-sm text-muted-foreground">
                        Once deleted, this project and all its data will be permanently removed
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="rounded-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Project
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project and all associated
                            APIs, directories, and documentation.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full">
                            Delete Project
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

