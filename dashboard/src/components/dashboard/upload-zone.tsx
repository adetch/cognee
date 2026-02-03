"use client"

import { useState, useRef } from "react"
import { Upload, File, Cloud, Link, Check, X, FolderOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DroppedFile {
  name: string
  size: string
  status: "pending" | "success" | "error"
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

interface UploadZoneProps {
  selectedDataset?: string | null
}

export function UploadZone({ selectedDataset = null }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newFiles: DroppedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      status: "success" as const,
    }))
    setDroppedFiles((prev) => [...newFiles, ...prev])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Add Data</span>
          {selectedDataset ? (
            <span className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
              to {selectedDataset}
            </span>
          ) : (
            <span className="text-sm font-normal text-muted-foreground">
              No dataset selected
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Drop Zone */}
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
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
          <Button className="mt-4" onClick={(e) => { e.stopPropagation(); handleBrowseClick() }}>
            Browse Files
          </Button>
        </div>

        {/* Other Methods */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center gap-3 rounded-lg bg-muted/50 p-4 text-left transition-colors hover:bg-muted">
            <div className="rounded-md bg-background p-2">
              <Link className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Import from URL</p>
              <p className="text-xs text-muted-foreground">Fetch content from a web address</p>
            </div>
          </button>
          <button className="flex items-center gap-3 rounded-lg bg-muted/50 p-4 text-left transition-colors hover:bg-muted">
            <div className="rounded-md bg-background p-2">
              <Cloud className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Connect Blob Store</p>
              <p className="text-xs text-muted-foreground">S3, GCS, Azure, or MinIO</p>
            </div>
          </button>
        </div>

        {/* Dropped Files */}
        {droppedFiles.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-medium">Files to Upload</h4>
            <div className="space-y-2">
              {droppedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{file.size}</span>
                    {file.status === "success" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : file.status === "error" ? (
                      <X className="h-4 w-4 text-destructive" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
