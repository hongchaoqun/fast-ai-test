"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, ExternalLink, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"

interface ApiDocumentationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  apiData: {
    name: string
    method: string
    path: string
    description: string
    requestBody: string
    responseBody: string
    headers: { key: string; value: string }[]
  }
}

export default function ApiDocumentationDialog({ open, onOpenChange, apiData }: ApiDocumentationDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // 格式化JSON
  const formatJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed, null, 2)
    } catch (e) {
      return jsonString
    }
  }

  // 复制代码到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // 获取HTTP方法的颜色
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800"
      case "POST":
        return "bg-green-100 text-green-800"
      case "PUT":
        return "bg-amber-100 text-amber-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      case "PATCH":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 生成示例代码
  const generateExampleCode = (language: string) => {
    const baseUrl = "https://api.example.com"
    const path = apiData.path
    const method = apiData.method
    const headersString = apiData.headers.reduce((acc, header) => {
      return `${acc}    "${header.key}": "${header.value}",\n`
    }, "")

    switch (language) {
      case "curl":
        return `curl -X ${method} "${baseUrl}${path}" \\
${apiData.headers.map((h) => `-H "${h.key}: ${h.value}" \\`).join("\n")}
${method !== "GET" ? `-d '${apiData.requestBody}'` : ""}`

      case "javascript":
        return `// Using fetch API
fetch("${baseUrl}${path}", {
  method: "${method}",
  headers: {
${headersString}  },
${method !== "GET" ? `  body: JSON.stringify(${apiData.requestBody})` : ""}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`

      case "python":
        return `import requests

url = "${baseUrl}${path}"
headers = {
${apiData.headers.map((h) => `    "${h.key}": "${h.value}"`).join(",\n")}
}
${
  method !== "GET"
    ? `payload = ${apiData.requestBody}

response = requests.${method.toLowerCase()}(url, json=payload, headers=headers)`
    : `
response = requests.${method.toLowerCase()}(url, headers=headers)`
}
print(response.json())`

      default:
        return ""
    }
  }

  // 模拟的错误响应
  const errorResponses = [
    {
      status: 400,
      description: "Bad Request",
      response: `{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": {
    "id": "Must be a valid product ID"
  }
}`,
    },
    {
      status: 401,
      description: "Unauthorized",
      response: `{
  "error": "Unauthorized",
  "message": "Authentication required to access this resource"
}`,
    },
    {
      status: 404,
      description: "Not Found",
      response: `{
  "error": "Not Found",
  "message": "Product with the specified ID does not exist"
}`,
    },
    {
      status: 500,
      description: "Internal Server Error",
      response: `{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}`,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6" />
            API Documentation
          </DialogTitle>
          <DialogDescription>Comprehensive documentation for the {apiData.name} API endpoint.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 mt-2">
          <Badge className={`${getMethodColor(apiData.method)} rounded-full px-3 py-1 font-medium`}>
            {apiData.method}
          </Badge>
          <code className="text-sm bg-muted/50 px-2 py-1 rounded font-mono">{apiData.path}</code>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="mb-4 p-1 bg-muted/50 rounded-full">
            <TabsTrigger value="overview" className="rounded-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="request" className="rounded-full">
              Request
            </TabsTrigger>
            <TabsTrigger value="response" className="rounded-full">
              Response
            </TabsTrigger>
            <TabsTrigger value="examples" className="rounded-full">
              Examples
            </TabsTrigger>
            <TabsTrigger value="errors" className="rounded-full">
              Errors
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{apiData.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Base URL</h3>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted/50 px-2 py-1 rounded font-mono flex-1">https://api.example.com</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full"
                  onClick={() => copyToClipboard("https://api.example.com")}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Authentication</h3>
              <p className="text-muted-foreground mb-2">
                This API requires authentication. Include the following header in your requests:
              </p>
              <div className="bg-muted/30 p-3 rounded-md">
                <code className="font-mono text-sm">Authorization: Bearer {"{your_api_key}"}</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Rate Limiting</h3>
              <p className="text-muted-foreground">
                This API is rate limited to 100 requests per minute. If you exceed this limit, you will receive a 429
                Too Many Requests response.
              </p>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Best Practices
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Always check the response status code before processing the response body</li>
                <li>Implement proper error handling for all possible error responses</li>
                <li>Cache responses when appropriate to reduce API calls</li>
                <li>Use HTTPS for all API requests to ensure data security</li>
              </ul>
            </div>
          </TabsContent>

          {/* Request Tab */}
          <TabsContent value="request" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Path Parameters</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <div>Parameter</div>
                  <div>Type</div>
                  <div>Description</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">id</div>
                  <div>integer</div>
                  <div className="text-muted-foreground">The unique identifier of the product</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Query Parameters</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <div>Parameter</div>
                  <div>Type</div>
                  <div>Required</div>
                  <div>Description</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">fields</div>
                  <div>string</div>
                  <div>No</div>
                  <div className="text-muted-foreground">Comma-separated list of fields to include in the response</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">include</div>
                  <div>string</div>
                  <div>No</div>
                  <div className="text-muted-foreground">Related resources to include (e.g., reviews, categories)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Headers</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <div>Header</div>
                  <div>Required</div>
                  <div>Description</div>
                </div>
                {apiData.headers.map((header, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-3 border-t">
                    <div className="font-mono text-sm">{header.key}</div>
                    <div>{header.key === "Authorization" ? "Yes" : "No"}</div>
                    <div className="text-muted-foreground">
                      {header.key === "Content-Type"
                        ? "The format of the request body"
                        : header.key === "Authorization"
                          ? "Authentication token for API access"
                          : "Additional header information"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {apiData.method !== "GET" && (
              <div>
                <h3 className="text-lg font-medium mb-2">Request Body</h3>
                <p className="text-muted-foreground mb-2">
                  The request body should be a JSON object with the following structure:
                </p>
                <div className="relative">
                  <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                    {formatJson(apiData.requestBody)}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                    onClick={() => copyToClipboard(formatJson(apiData.requestBody))}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Response Tab */}
          <TabsContent value="response" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Response Format</h3>
              <p className="text-muted-foreground mb-2">
                The API returns data in JSON format with the following structure:
              </p>
              <div className="relative">
                <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                  {formatJson(apiData.responseBody)}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={() => copyToClipboard(formatJson(apiData.responseBody))}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Response Fields</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <div>Field</div>
                  <div>Type</div>
                  <div>Description</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">id</div>
                  <div>integer</div>
                  <div className="text-muted-foreground">The unique identifier of the product</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">name</div>
                  <div>string</div>
                  <div className="text-muted-foreground">The name of the product</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">price</div>
                  <div>number</div>
                  <div className="text-muted-foreground">The price of the product in USD</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">description</div>
                  <div>string</div>
                  <div className="text-muted-foreground">A detailed description of the product</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">inStock</div>
                  <div>boolean</div>
                  <div className="text-muted-foreground">Whether the product is currently in stock</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Status Codes</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <div>Code</div>
                  <div>Description</div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">200 OK</div>
                  <div className="text-muted-foreground">The request was successful</div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">400 Bad Request</div>
                  <div className="text-muted-foreground">The request was invalid or cannot be served</div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">401 Unauthorized</div>
                  <div className="text-muted-foreground">Authentication is required or has failed</div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">404 Not Found</div>
                  <div className="text-muted-foreground">The requested resource was not found</div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-3 border-t">
                  <div className="font-mono text-sm">500 Internal Server Error</div>
                  <div className="text-muted-foreground">An unexpected error occurred on the server</div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Example Requests</h3>
              <Tabs defaultValue="curl">
                <TabsList className="mb-4 p-1 bg-muted/50 rounded-full">
                  <TabsTrigger value="curl" className="rounded-full">
                    cURL
                  </TabsTrigger>
                  <TabsTrigger value="javascript" className="rounded-full">
                    JavaScript
                  </TabsTrigger>
                  <TabsTrigger value="python" className="rounded-full">
                    Python
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="curl">
                  <div className="relative">
                    <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                      {generateExampleCode("curl")}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                      onClick={() => copyToClipboard(generateExampleCode("curl"))}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="javascript">
                  <div className="relative">
                    <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                      {generateExampleCode("javascript")}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                      onClick={() => copyToClipboard(generateExampleCode("javascript"))}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="python">
                  <div className="relative">
                    <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                      {generateExampleCode("python")}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                      onClick={() => copyToClipboard(generateExampleCode("python"))}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Example Response</h3>
              <div className="relative">
                <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                  {formatJson(apiData.responseBody)}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={() => copyToClipboard(formatJson(apiData.responseBody))}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Errors Tab */}
          <TabsContent value="errors" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Error Responses</h3>
              <p className="text-muted-foreground mb-4">The API may return the following error responses:</p>

              <div className="space-y-4">
                {errorResponses.map((error, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="bg-muted/30 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">
                          {error.status} {error.description}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <pre className="bg-muted/20 p-3 rounded-md overflow-auto max-h-[200px] text-sm font-mono">
                        {formatJson(error.response)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 text-amber-800 mb-2">
                <AlertTriangle className="h-4 w-4" />
                Error Handling Best Practices
              </h4>
              <ul className="text-sm text-amber-700 space-y-1 list-disc pl-5">
                <li>Always check the HTTP status code before processing the response</li>
                <li>Implement proper error handling for all possible error responses</li>
                <li>Log error details for debugging purposes</li>
                <li>Provide user-friendly error messages in your application</li>
                <li>Implement retry logic with exponential backoff for transient errors</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Download className="mr-2 h-4 w-4" />
              Download Docs
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in Browser
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="rounded-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

