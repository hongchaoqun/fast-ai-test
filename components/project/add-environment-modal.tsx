"use client"

import { useState } from "react"
import { PlusCircle, X, Database, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import api from "@/lib/axios"
import { toast } from "sonner"

interface EnvironmentVariable {
  id: string
  key: string
  value: string
}

interface AddEnvironmentModalProps {
  projectId: string
  onEnvironmentAdded?: (environment: {
    id: number
    name: string
    baseUrl: string
    variables: EnvironmentVariable[]
  }) => void
}

// API 响应类型
interface ApiResponse {
  code: number
  data: number // 返回创建的环境ID
  msg: string
}

export default function AddEnvironmentModal({ projectId, onEnvironmentAdded }: AddEnvironmentModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [baseUrl, setBaseUrl] = useState("")
  const [variables, setVariables] = useState<EnvironmentVariable[]>([{ id: "1", key: "", value: "" }])
  const [errors, setErrors] = useState<{
    name?: string
    baseUrl?: string
    variables?: Record<string, { key?: string; value?: string }>
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addVariable = () => {
    setVariables([...variables, { id: Date.now().toString(), key: "", value: "" }])
  }

  const removeVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id))
  }

  const updateVariable = (id: string, field: "key" | "value", value: string) => {
    setVariables(variables.map((v) => (v.id === id ? { ...v, [field]: value } : v)))

    // Clear error when typing
    if (errors.variables && errors.variables[id]) {
      setErrors({
        ...errors,
        variables: {
          ...errors.variables,
          [id]: {
            ...errors.variables[id],
            [field]: undefined,
          },
        },
      })
    }
  }

  const validateForm = () => {
    const newErrors: {
      name?: string
      baseUrl?: string
      variables?: Record<string, { key?: string; value?: string }>
    } = {}

    if (!name.trim()) {
      newErrors.name = "环境名称不能为空"
    }

    if (!baseUrl.trim()) {
      newErrors.baseUrl = "基础URL不能为空"
    } else if (!/^https?:\/\//.test(baseUrl)) {
      newErrors.baseUrl = "基础URL必须以http://或https://开头"
    }

    const variableErrors: Record<string, { key?: string; value?: string }> = {}
    let hasVariableErrors = false

    variables.forEach((v) => {
      const varError: { key?: string; value?: string } = {}

      if (v.key.trim() && !v.value.trim()) {
        varError.value = "变量值不能为空"
        hasVariableErrors = true
      }

      if (v.key.trim()) {
        const duplicateKeys = variables.filter((other) => other.id !== v.id && other.key.trim() === v.key.trim())
        if (duplicateKeys.length > 0) {
          varError.key = "变量名称不能重复"
          hasVariableErrors = true
        }
      }

      if (Object.keys(varError).length > 0) {
        variableErrors[v.id] = varError
      }
    })

    if (hasVariableErrors) {
      newErrors.variables = variableErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // 准备请求数据
      const requestData = {
        envName: name,
        baseUrl: baseUrl,
        projectId: parseInt(projectId),
        variables: variables
          .filter((v) => v.key.trim() !== "")
          .map((v) => ({
            varKey: v.key,
            varValue: v.value,
          })),
      }

      // 调用API
      const response = await api.post<ApiResponse>("/api/env/create", requestData)

      if (response.data.code === 0) {
        toast.success("环境创建成功")
        
        // 调用回调函数
        if (onEnvironmentAdded) {
          onEnvironmentAdded({
            id: response.data.data,
            name,
            baseUrl,
            variables: variables.filter((v) => v.key.trim() !== ""),
          })
        }

        // 重置表单
        setName("")
        setBaseUrl("")
        setVariables([{ id: "1", key: "", value: "" }])
        setOpen(false)
      } else {
        throw new Error(response.data.msg || "创建环境失败")
      }
    } catch (error) {
      console.error("创建环境失败:", error)
      toast.error(error instanceof Error ? error.message : "创建环境失败")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Database className="mr-2 h-4 w-4" />
          添加环境
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>添加新环境</DialogTitle>
          <DialogDescription>创建一个新的环境配置，用于测试和部署您的API。</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="env-name" className={cn(errors.name && "text-destructive")}>
              环境名称
            </Label>
            <Input
              id="env-name"
              placeholder="例如：开发环境、测试环境、生产环境"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              className={cn(errors.name && "border-destructive")}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="base-url" className={cn(errors.baseUrl && "text-destructive")}>
              基础URL
            </Label>
            <Input
              id="base-url"
              placeholder="例如：https://api.example.com"
              value={baseUrl}
              onChange={(e) => {
                setBaseUrl(e.target.value)
                if (errors.baseUrl) setErrors({ ...errors, baseUrl: undefined })
              }}
              className={cn(errors.baseUrl && "border-destructive")}
            />
            {errors.baseUrl && <p className="text-xs text-destructive mt-1">{errors.baseUrl}</p>}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>环境变量</Label>
              <Badge variant="outline" className="rounded-full">
                {variables.filter((v) => v.key.trim() !== "").length} 个变量
              </Badge>
            </div>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {variables.map((variable, index) => (
                <div key={variable.id} className="grid grid-cols-[1fr,1fr,auto] gap-2 items-start">
                  <div>
                    <Input
                      placeholder="变量名称"
                      value={variable.key}
                      onChange={(e) => updateVariable(variable.id, "key", e.target.value)}
                      className={cn("font-mono text-sm", errors.variables?.[variable.id]?.key && "border-destructive")}
                    />
                    {errors.variables?.[variable.id]?.key && (
                      <p className="text-xs text-destructive mt-1">{errors.variables[variable.id].key}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="变量值"
                      value={variable.value}
                      onChange={(e) => updateVariable(variable.id, "value", e.target.value)}
                      className={cn(
                        "font-mono text-sm",
                        errors.variables?.[variable.id]?.value && "border-destructive",
                      )}
                    />
                    {errors.variables?.[variable.id]?.value && (
                      <p className="text-xs text-destructive mt-1">{errors.variables[variable.id].value}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeVariable(variable.id)}
                    disabled={variables.length === 1 && index === 0}
                    className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">删除变量</span>
                  </Button>
                </div>
              ))}
            </div>

            <Button type="button" variant="outline" size="sm" onClick={addVariable} className="mt-2 rounded-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              添加变量
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full">
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="rounded-full">
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                创建中...
              </span>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                创建环境
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}