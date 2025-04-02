"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, RotateCcw, Filter, ChevronDown, Check, X, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

// 模拟的API测试结果数据
interface ApiTestResult {
  id: string
  url: string
  method: string
  status: number
  success: boolean
  responseTime: number
  requestParams: Record<string, any>
  requestHeaders: Record<string, string>
  responseData: Record<string, any>
  timestamp: string
  directoryId: string
  directoryName: string
}

export default function BatchTestsPage({ params }: { params: { projectId: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [selectedTest, setSelectedTest] = useState<ApiTestResult | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // 模拟的测试结果数据
  const testResults: ApiTestResult[] = [
    {
      id: "1",
      url: "https://api.example.com/users",
      method: "GET",
      status: 200,
      success: true,
      responseTime: 124,
      requestParams: { page: 1, limit: 10 },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {
        users: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
        ],
        total: 2,
        page: 1,
      },
      timestamp: "2023-12-15T10:30:45Z",
      directoryId: "1",
      directoryName: "用户管理",
    },
    {
      id: "2",
      url: "https://api.example.com/products",
      method: "GET",
      status: 200,
      success: true,
      responseTime: 98,
      requestParams: { category: "electronics", sort: "price" },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {
        products: [
          { id: 101, name: "Smartphone", price: 699 },
          { id: 102, name: "Laptop", price: 1299 },
        ],
        total: 2,
      },
      timestamp: "2023-12-15T10:30:46Z",
      directoryId: "2",
      directoryName: "产品管理",
    },
    {
      id: "3",
      url: "https://api.example.com/orders",
      method: "POST",
      status: 201,
      success: true,
      responseTime: 145,
      requestParams: {
        userId: 1,
        products: [{ id: 101, quantity: 1 }],
        shippingAddress: "123 Main St",
      },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {
        orderId: 5001,
        status: "created",
        total: 699,
      },
      timestamp: "2023-12-15T10:30:47Z",
      directoryId: "3",
      directoryName: "订单管理",
    },
    {
      id: "4",
      url: "https://api.example.com/payments",
      method: "POST",
      status: 400,
      success: false,
      responseTime: 87,
      requestParams: {
        orderId: 5001,
        paymentMethod: "credit_card",
        amount: 699,
      },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {
        error: "Invalid payment information",
        code: "PAYMENT_ERROR",
        details: "Credit card number is invalid",
      },
      timestamp: "2023-12-15T10:30:48Z",
      directoryId: "4",
      directoryName: "支付管理",
    },
    {
      id: "5",
      url: "https://api.example.com/auth/login",
      method: "POST",
      status: 401,
      success: false,
      responseTime: 65,
      requestParams: {
        email: "test@example.com",
        password: "password123",
      },
      requestHeaders: {
        "Content-Type": "application/json",
      },
      responseData: {
        error: "Authentication failed",
        message: "Invalid credentials",
      },
      timestamp: "2023-12-15T10:30:49Z",
      directoryId: "1",
      directoryName: "用户管理",
    },
    {
      id: "6",
      url: "https://api.example.com/products/101",
      method: "PUT",
      status: 200,
      success: true,
      responseTime: 112,
      requestParams: {
        name: "Smartphone Pro",
        price: 799,
        stock: 50,
      },
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {
        id: 101,
        name: "Smartphone Pro",
        price: 799,
        stock: 50,
        updated: true,
      },
      timestamp: "2023-12-15T10:30:50Z",
      directoryId: "2",
      directoryName: "产品管理",
    },
    {
      id: "7",
      url: "https://api.example.com/products/999",
      method: "GET",
      status: 404,
      success: false,
      responseTime: 45,
      requestParams: {},
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {
        error: "Not found",
        message: "Product with ID 999 does not exist",
      },
      timestamp: "2023-12-15T10:30:51Z",
      directoryId: "2",
      directoryName: "产品管理",
    },
    {
      id: "8",
      url: "https://api.example.com/orders/5001",
      method: "DELETE",
      status: 204,
      success: true,
      responseTime: 78,
      requestParams: {},
      requestHeaders: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      responseData: {},
      timestamp: "2023-12-15T10:30:52Z",
      directoryId: "3",
      directoryName: "订单管理",
    },
  ]

  // 过滤测试结果
  const filteredResults = testResults.filter((result) => {
    // 搜索过滤
    const matchesSearch =
      searchQuery === "" ||
      result.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.directoryName.toLowerCase().includes(searchQuery.toLowerCase())

    // 状态过滤
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "success" && result.success) ||
      (statusFilter === "failed" && !result.success)

    // 方法过滤
    const matchesMethod = methodFilter === "all" || result.method === methodFilter

    return matchesSearch && matchesStatus && matchesMethod
  })

  // 统计数据
  const totalTests = testResults.length
  const successfulTests = testResults.filter((r) => r.success).length
  const failedTests = testResults.filter((r) => !r.success).length
  const averageResponseTime = Math.round(testResults.reduce((acc, r) => acc + r.responseTime, 0) / totalTests)

  // 格式化JSON
  const formatJson = (json: Record<string, any>) => {
    return JSON.stringify(json, null, 2)
  }

  // 查看测试详情
  const viewTestDetails = (test: ApiTestResult) => {
    setSelectedTest(test)
    setIsDetailOpen(true)
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

  // 获取状态码的颜色
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) {
      return "bg-green-100 text-green-800"
    } else if (status >= 300 && status < 400) {
      return "bg-blue-100 text-blue-800"
    } else if (status >= 400 && status < 500) {
      return "bg-amber-100 text-amber-800"
    } else {
      return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="container py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回项目
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            批量API测试结果
          </h1>
          <p className="text-muted-foreground mt-1">查看和分析您的API测试结果</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            导出结果
          </Button>
          <Button className="rounded-full shadow-sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            重新测试
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">总测试数</p>
                <h3 className="text-2xl font-bold mt-1">{totalTests}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Filter className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">成功</p>
                <h3 className="text-2xl font-bold mt-1">{successfulTests}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">失败</p>
                <h3 className="text-2xl font-bold mt-1">{failedTests}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">平均响应时间</p>
                <h3 className="text-2xl font-bold mt-1">{averageResponseTime}ms</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 过滤器 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="搜索API URL或目录..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] rounded-full">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有状态</SelectItem>
              <SelectItem value="success">成功</SelectItem>
              <SelectItem value="failed">失败</SelectItem>
            </SelectContent>
          </Select>

          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[150px] rounded-full">
              <SelectValue placeholder="HTTP方法" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有方法</SelectItem>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 测试结果列表 */}
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Collapsible
              key={result.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between p-4 bg-muted/20">
                <div className="flex items-center gap-3">
                  <Badge className={`${getMethodColor(result.method)} rounded-full px-3 py-1 font-medium`}>
                    {result.method}
                  </Badge>
                  <div className="font-medium truncate max-w-[300px]">{result.url}</div>
                  <Badge className={`${getStatusColor(result.status)} rounded-full px-3 py-1 font-medium`}>
                    {result.status}
                  </Badge>
                  {result.success ? (
                    <Badge className="bg-green-100 text-green-800 rounded-full px-3 py-1 font-medium">成功</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 rounded-full px-3 py-1 font-medium">失败</Badge>
                  )}
                  <div className="text-sm text-muted-foreground">
                    <Clock className="inline h-3.5 w-3.5 mr-1" />
                    {result.responseTime}ms
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    {result.directoryName}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => viewTestDetails(result)}>
                    查看详情
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">展开</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              <CollapsibleContent>
                <div className="p-4 border-t">
                  <Tabs defaultValue="request">
                    <TabsList className="mb-4 p-1 bg-muted/50 rounded-full">
                      <TabsTrigger value="request" className="rounded-full">
                        请求参数
                      </TabsTrigger>
                      <TabsTrigger value="headers" className="rounded-full">
                        请求头
                      </TabsTrigger>
                      <TabsTrigger value="response" className="rounded-full">
                        响应数据
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="request">
                      <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                        {formatJson(result.requestParams)}
                      </pre>
                    </TabsContent>
                    <TabsContent value="headers">
                      <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                        {formatJson(result.requestHeaders)}
                      </pre>
                    </TabsContent>
                    <TabsContent value="response">
                      <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[300px] text-sm font-mono">
                        {formatJson(result.responseData)}
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">未找到测试结果</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              没有符合当前筛选条件的测试结果。请尝试调整筛选条件或运行新的测试。
            </p>
            <Button className="rounded-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              运行新测试
            </Button>
          </div>
        )}
      </div>

      {/* 测试详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>API测试详情</DialogTitle>
            <DialogDescription>查看API测试的完整请求和响应信息</DialogDescription>
          </DialogHeader>

          {selectedTest && (
            <div className="space-y-4 mt-4">
              <div className="flex flex-wrap gap-3 items-center">
                <Badge className={`${getMethodColor(selectedTest.method)} rounded-full px-3 py-1 font-medium`}>
                  {selectedTest.method}
                </Badge>
                <h3 className="text-lg font-medium">{selectedTest.url}</h3>
                <Badge className={`${getStatusColor(selectedTest.status)} rounded-full px-3 py-1 font-medium`}>
                  {selectedTest.status}
                </Badge>
                {selectedTest.success ? (
                  <Badge className="bg-green-100 text-green-800 rounded-full px-3 py-1 font-medium">成功</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 rounded-full px-3 py-1 font-medium">失败</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">目录:</span> {selectedTest.directoryName}
                </div>
                <div>
                  <span className="text-muted-foreground">响应时间:</span> {selectedTest.responseTime}ms
                </div>
                <div>
                  <span className="text-muted-foreground">测试时间:</span>{" "}
                  {new Date(selectedTest.timestamp).toLocaleString()}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">请求参数</h4>
                <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[200px] text-sm font-mono">
                  {formatJson(selectedTest.requestParams)}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">请求头</h4>
                <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[200px] text-sm font-mono">
                  {formatJson(selectedTest.requestHeaders)}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">响应数据</h4>
                <pre className="bg-muted/30 p-4 rounded-lg overflow-auto max-h-[200px] text-sm font-mono">
                  {formatJson(selectedTest.responseData)}
                </pre>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" className="rounded-full">
                  <Download className="mr-2 h-4 w-4" />
                  导出结果
                </Button>
                <Button className="rounded-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  重新测试
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

