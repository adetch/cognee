"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  Trash2,
  Database,
  Check,
  X,
} from "lucide-react"
import { useWorkspace } from "@/context/workspace-context"
import { cn } from "@/lib/utils"

export default function DatasetsPage() {
  const {
    currentCluster,
    currentDataset,
    setCurrentDataset,
    addDataset,
    deleteDataset,
  } = useWorkspace()

  const [searchQuery, setSearchQuery] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [newDatasetName, setNewDatasetName] = useState("")

  const filteredDatasets = currentCluster.datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddDataset = () => {
    if (newDatasetName.trim()) {
      addDataset({
        name: newDatasetName.trim(),
        description: undefined,
        itemCount: 0,
      })
      setNewDatasetName("")
      setIsAdding(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Datasets</h1>
        <Button
          size="sm"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search datasets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-muted/50 border-0"
        />
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
          <Database className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Dataset name"
            value={newDatasetName}
            onChange={(e) => setNewDatasetName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddDataset()
              if (e.key === "Escape") {
                setIsAdding(false)
                setNewDatasetName("")
              }
            }}
            className="flex-1 h-8 bg-background"
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleAddDataset}
            disabled={!newDatasetName.trim()}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsAdding(false)
              setNewDatasetName("")
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* List */}
      <div className="space-y-1">
        {filteredDatasets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Database className="h-8 w-8 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              {searchQuery ? `No datasets match "${searchQuery}"` : "No datasets yet"}
            </p>
          </div>
        ) : (
          filteredDatasets.map((dataset) => (
            <div
              key={dataset.id}
              onClick={() => setCurrentDataset(dataset)}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-colors",
                dataset.id === currentDataset?.id
                  ? "bg-accent"
                  : "hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Database className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{dataset.name}</p>
                  {dataset.description && (
                    <p className="text-xs text-muted-foreground truncate">
                      {dataset.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {dataset.itemCount} items
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(dataset.updatedAt)}
                </span>
                <button
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteDataset(dataset.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Count */}
      {filteredDatasets.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  )
}
