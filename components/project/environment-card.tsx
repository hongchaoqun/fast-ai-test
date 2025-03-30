"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Copy, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface EnvironmentVariable {
  id: string
  key: string
  value: string
}

interface EnvironmentCardProps {
  id: string
  name: string
  baseUrl: string
  variables: EnvironmentVariable[]
  isActive?: boolean
  onActivate?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export default function EnvironmentCard({
  id,
  name,
  baseUrl,
  variables,
  isActive = false,
  onActivate,
  onEdit,
  onDelete,
  onDuplicate,
}: EnvironmentCardProps) {
  const [showVariables, setShowVariables] = useState(false)

  return (
    <Card
      className={`overflow-hidden border ${isActive ? "border-primary shadow-md" : "shadow-sm"} hover:shadow-md transition-all duration-200`}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {name}
              {isActive && (
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">当前活动</Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-1 font-mono text-xs truncate">{baseUrl}</CardDescription>
          </div>
          <Badge variant="outline" className="rounded-full px-3">
            {variables.length} 个变量
          </Badge>
        </div>
      </CardHeader>

      {showVariables && variables.length > 0 && (
        <CardContent className="pb-3 pt-0">
          <div className="bg-muted/30 rounded-md p-3 max-h-[200px] overflow-y-auto">
            <div className="space-y-2">
              {variables.map((variable) => (
                <div key={variable.id} className="grid grid-cols-[1fr,1fr] gap-2 text-sm">
                  <div className="font-mono bg-muted/50 px-2 py-1 rounded truncate">{variable.key}</div>
                  <div className="font-mono bg-muted/50 px-2 py-1 rounded truncate">{variable.value}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="flex justify-between py-3 bg-muted/10 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowVariables(!showVariables)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showVariables ? (
            <>
              <EyeOff className="mr-1 h-3.5 w-3.5" />
              隐藏变量
            </>
          ) : (
            <>
              <Eye className="mr-1 h-3.5 w-3.5" />
              查看变量
            </>
          )}
        </Button>

        <div className="flex gap-1">
          {!isActive && onActivate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onActivate(id)}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              激活
            </Button>
          )}

          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          )}

          {onDuplicate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

