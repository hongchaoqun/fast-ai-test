"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Play, Save, Plus, Code } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ApiDetailPage({
  params,
}: {
  params: { projectId: string; directoryId: string; apiId: string }
}) {
  // Mock data - in a real app, this would come from a database
  const [apiData, setApiData] = useState({
    name: "Get Product",
    method: "GET",
    path: "/api/products/{id}",
    description: "Retrieve a product by its ID",
    requestBody: '{\n  "id": 123\n}',
    responseBody:
      '{\n  "id": 123,\n  "name": "Product Name",\n  "price": 99.99,\n  "description": "Product description",\n  "inStock": true\n}',
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer {token}" },
    ],
  })

  const [url, setUrl] = useState("https://api.example.com/api/products/123")
  const [responseStatus, setResponseStatus] = useState("")
  const [responseTime, setResponseTime] = useState("")
  const [responseData, setResponseData] = useState("")

  const handleTest = () => {
    // Simulate API test
    setResponseStatus("200 OK")
    setResponseTime("124ms")
    setResponseData(apiData.responseBody)
  }

  return (
    <div className="container py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                apiData.method === "GET"
                  ? "bg-blue-100 text-blue-800"
                  : apiData.method === "POST"
                    ? "bg-green-100 text-green-800"
                    : apiData.method === "PUT"
                      ? "bg-yellow-100 text-yellow-800"
                      : apiData.method === "DELETE"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
              }`}
            >
              {apiData.method}
            </div>
            <h1 className="text-2xl font-bold">{apiData.name}</h1>
          </div>
          <p className="text-muted-foreground mt-1 font-mono text-sm">{apiData.path}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full" onClick={() => {}}>
              <Code className="mr-2 h-4 w-4" />
              Mock
          </Button>
          <Button variant="outline" className="rounded-full">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="pt-6">
              <Tabs defaultValue="params">
                <TabsList className="mb-4 p-1 bg-muted/50 rounded-full">
                  <TabsTrigger value="params" className="rounded-full">
                    Parameters
                  </TabsTrigger>
                  <TabsTrigger value="headers" className="rounded-full">
                    Headers
                  </TabsTrigger>
                  <TabsTrigger value="body" className="rounded-full">
                    Body
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="params" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="param-name">Name</Label>
                      <Input id="param-name" placeholder="id" className="border-dashed" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="param-value">Value</Label>
                      <Input id="param-value" placeholder="123" className="border-dashed" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add Parameter
                  </Button>
                </TabsContent>
                <TabsContent value="headers" className="space-y-4">
                  {apiData.headers.map((header, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Input value={header.key} readOnly className="bg-muted/50" />
                      </div>
                      <div className="col-span-2">
                        <Input value={header.value} className="border-dashed" />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add Header
                  </Button>
                </TabsContent>
                <TabsContent value="body">
                  <Textarea value={apiData.requestBody} className="min-h-[200px] font-mono border-dashed" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Label htmlFor="request-url">Request URL</Label>
            <div className="flex gap-2">
              <Input
                id="request-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button onClick={handleTest} className="rounded-full shadow-sm">
                <Play className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Response</h3>
                {responseStatus && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      {responseStatus}
                    </div>
                    <div className="text-muted-foreground">{responseTime}</div>
                  </div>
                )}
              </div>
              <Textarea
                value={responseData}
                readOnly
                className="min-h-[350px] font-mono bg-muted/30"
                placeholder="Response will appear here after sending the request"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

