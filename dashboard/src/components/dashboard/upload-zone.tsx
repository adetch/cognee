"use client"

import { useState } from "react"
import { Upload, File, Cloud, Link, Database, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const recentUploads = [
  { name: "quarterly-report.pdf", size: "2.4 MB", time: "Just now", status: "success" },
  { name: "sales-data.xlsx", size: "1.1 MB", time: "2 min ago", status: "success" },
  { name: "meeting-notes.docx", size: "45 KB", time: "5 min ago", status: "success" },
]

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="file" className="gap-2">
              <File className="h-4 w-4" />
              <span className="hidden sm:inline">File Upload</span>
            </TabsTrigger>
            <TabsTrigger value="blob" className="gap-2">
              <Cloud className="h-4 w-4" />
              <span className="hidden sm:inline">Blob Store</span>
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">URL</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Database</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="mt-4">
            {/* Drop Zone */}
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={() => setIsDragging(false)}
            >
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 text-center">
                <span className="font-medium">Drag and drop files here</span>
                <br />
                <span className="text-sm text-muted-foreground">or click to browse</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Supports: PDF, DOCX, TXT, CSV, Excel, Images, Audio (38+ formats)
              </p>
              <Button className="mt-4">Browse Files</Button>
            </div>

            {/* Recent Uploads */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium">Recent Uploads</h4>
              <div className="space-y-2">
                {recentUploads.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <span>{file.time}</span>
                      {file.status === "success" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blob" className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Provider</label>
                <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option>Amazon S3</option>
                  <option>Google Cloud Storage</option>
                  <option>Azure Blob Storage</option>
                  <option>MinIO</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Bucket Name</label>
                <input
                  type="text"
                  placeholder="my-company-documents"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Access Key ID</label>
                <input
                  type="text"
                  placeholder="AKIA..."
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Secret Access Key</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Path Prefix (optional)</label>
                <input
                  type="text"
                  placeholder="/documents/2024/"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Test Connection</Button>
                <Button>Connect & Sync</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/document.pdf"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button>Fetch & Add</Button>
            </div>
          </TabsContent>

          <TabsContent value="database" className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Database Type</label>
                <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>MongoDB</option>
                  <option>SQLite</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Connection String</label>
                <input
                  type="text"
                  placeholder="postgresql://user:pass@host:5432/db"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button>Connect</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
