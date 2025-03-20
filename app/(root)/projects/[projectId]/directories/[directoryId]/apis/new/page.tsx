"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewApiPage({
  params,
}: {
  params: { projectId: string; directoryId: string }
}) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [method, setMethod] = useState("GET")
  const [path, setPath] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    console.log("Creating API:", { name, method, path, description })

    // Redirect back to the project page
    router.push(`/projects/${params.projectId}`)
  }

  return (
    <div className="container max-w-3xl py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Create New API Endpoint</CardTitle>
          <CardDescription>Define a new API endpoint with request and response details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">API Name</Label>
                <Input
                  id="name"
                  placeholder="Enter API name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">HTTP Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="path">API Path</Label>
              <Input
                id="path"
                placeholder="/api/resource/{id}"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this API does"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Tabs defaultValue="request" className="w-full">
              <TabsList>
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>
              <TabsContent value="request" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="requestBody">Request Body (JSON)</Label>
                    <Textarea id="requestBody" placeholder='{\n  "key": "value"\n}' rows={6} className="font-mono" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="response" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="responseBody">Response Body (JSON)</Label>
                    <Textarea
                      id="responseBody"
                      placeholder='{\n  "id": 1,\n  "name": "Example",\n  "status": "success"\n}'
                      rows={6}
                      className="font-mono"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="headers" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="headerKey">Header Name</Label>
                      <Input id="headerKey" placeholder="Content-Type" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="headerValue">Header Value</Label>
                      <Input id="headerValue" placeholder="application/json" />
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    Add Header
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Link href={`/projects/${params.projectId}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create API</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

