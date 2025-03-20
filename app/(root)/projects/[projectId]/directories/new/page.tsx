"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewDirectoryPage({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    console.log("Creating directory:", { name, description })

    // Redirect back to the project page
    router.push(`/projects/${params.projectId}`)
  }

  return (
    <div className="container max-w-2xl py-10">
      <Link
        href={`/projects/${params.projectId}`}
        className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Link>

      <Card className="overflow-hidden border shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle>Create New API Directory</CardTitle>
          <CardDescription>Create a new directory to organize related API endpoints</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Directory Name</Label>
              <Input
                id="name"
                placeholder="Enter directory name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-dashed focus:border-solid"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe this group of APIs"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="border-dashed focus:border-solid"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t bg-muted/10 py-4">
            <Link href={`/projects/${params.projectId}`}>
              <Button variant="outline" className="rounded-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="rounded-full shadow-sm">
              Create Directory
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

