"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const PATH_VARIABLE = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const response = await fetch(`${PATH_VARIABLE}/api/project/create`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          name,
          description,
          token
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      if (data.code === 0) {
        alert("Project created successfully");
        // Redirect to the project page (using a mock ID for demo)
        router.push("/projects");
      } else {
        alert(data.msg || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <Link href="/projects" className="flex items-center text-sm text-muted-foreground mb-6 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <Card className="overflow-hidden border shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>Create a new API project to organize your endpoints</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
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
                placeholder="Describe your project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="border-dashed focus:border-solid"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t bg-muted/10 py-4">
            <Link href="/projects">
              <Button variant="outline" className="rounded-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="rounded-full shadow-sm">
              Create Project
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}