"use client"

import { useState, useRef } from "react"
import { Upload, File, Link, Cloud, Check, X, Plus, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWorkspace } from "@/context/workspace-context"
import { Button } from "@/components/ui/button"

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
  onCreateDataset?: () => void
}

export function UploadZone({ onCreateDataset }: UploadZoneProps) {
  const { currentDataset, addDataset } = useWorkspace()
  const [isDragging, setIsDragging] = useState(false)
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const needsDataset = !currentDataset && droppedFiles.length > 0

  const handleCreateDataset = () => {
    if (onCreateDataset) {
      onCreateDataset()
    } else {
      // Create a default dataset
      const newDataset = {
        name: "New Dataset",
        description: "",
        itemCount: droppedFiles.length,
      }
      addDataset(newDataset)
    }
  }

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Add data</h2>
        {currentDataset ? (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FolderOpen className="h-3 w-3" />
            uploading to <span className="font-medium text-foreground">{currentDataset.name}</span>
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            select or create a dataset first
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        className={cn(
          "flex items-center justify-center gap-4 rounded-lg border border-dashed p-6 transition-colors cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/40 hover:bg-muted/30"
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drop files here or <span className="text-foreground font-medium">browse</span>
        </p>
      </div>

      <div className="flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Link className="h-4 w-4" />
          Import URL
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Cloud className="h-4 w-4" />
          Connect storage
        </button>
      </div>

      {droppedFiles.length > 0 && (
        <div className="space-y-3">
          {needsDataset && (
            <div className="flex items-center justify-between rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <FolderOpen className="h-4 w-4 text-amber-600" />
                <span>Create a dataset to upload {droppedFiles.length} file{droppedFiles.length > 1 ? "s" : ""}</span>
              </div>
              <Button size="sm" onClick={handleCreateDataset} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Create Dataset
              </Button>
            </div>
          )}
          <div className="space-y-1">
            {droppedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{file.size}</span>
                </div>
                {file.status === "success" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : file.status === "error" ? (
                  <X className="h-4 w-4 text-destructive" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
