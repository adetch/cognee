"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Plus, MoreHorizontal, Mail, Shield, Trash2, Server, Check, Brain, Info } from "lucide-react"

// Mock data
const mockUsers = [
  { id: "1", email: "admin@company.com", role: "Admin", status: "active" },
  { id: "2", email: "developer@company.com", role: "Developer", status: "active" },
  { id: "3", email: "viewer@company.com", role: "Viewer", status: "pending" },
]

const mockClusters = [
  { id: "cluster-abc123", name: "cluster-abc123", status: "running", tier: "Medium" },
  { id: "cluster-prod-01", name: "cluster-prod-01", status: "running", tier: "Large" },
  { id: "cluster-dev", name: "cluster-dev", status: "stopped", tier: "Small" },
]

const mockMemorySpaces = [
  { id: "1", name: "Default", description: "Default memory space for general use", documentCount: 156, isDefault: true },
  { id: "2", name: "Legal Documents", description: "Contracts and legal files", documentCount: 42, isDefault: false },
  { id: "3", name: "Research Papers", description: "Academic and research content", documentCount: 89, isDefault: false },
]

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "users"
  const [users] = useState(mockUsers)
  const [clusters] = useState(mockClusters)
  const [memorySpaces] = useState(mockMemorySpaces)
  const [inviteEmail, setInviteEmail] = useState("")

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, team members, and clusters
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="clusters" className="gap-2">
            <Server className="h-4 w-4" />
            Clusters
          </TabsTrigger>
          <TabsTrigger value="memory-spaces" className="gap-2">
            <Brain className="h-4 w-4" />
            Memory Spaces
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Invite User */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Invite Team Member</CardTitle>
              <CardDescription>
                Add new users to your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Members</CardTitle>
              <CardDescription>
                Manage access and roles for your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-xs">
                            {user.role}
                          </Badge>
                          {user.status === "pending" && (
                            <Badge variant="outline" className="text-xs text-amber-600">
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clusters Tab */}
        <TabsContent value="clusters" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">Clusters</CardTitle>
                <CardDescription>
                  Manage your Cognee clusters
                </CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Cluster
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {clusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                        <Server className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{cluster.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-xs">
                            {cluster.tier}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                cluster.status === "running"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                            {cluster.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Check className="h-4 w-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Memory Spaces Tab */}
        <TabsContent value="memory-spaces" className="space-y-6">
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
            <CardContent className="flex items-start gap-3 pt-6">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium">Advanced Feature</p>
                <p className="mt-1 text-blue-700 dark:text-blue-300">
                  Memory spaces allow you to organize your data into separate isolated contexts.
                  Each space maintains its own knowledge graph and can be queried independently.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">Memory Spaces</CardTitle>
                <CardDescription>
                  Organize data into isolated contexts
                </CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Space
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {memorySpaces.map((space) => (
                  <div
                    key={space.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                        <Brain className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{space.name}</p>
                          {space.isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {space.description} · {space.documentCount} documents
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Check className="h-4 w-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
