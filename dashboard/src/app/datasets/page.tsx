"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Trash2,
  Database,
  Check,
  X,
  Calendar,
  FileText,
} from "lucide-react"
import { useWorkspace } from "@/context/workspace-context"

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
  const [newDatasetDescription, setNewDatasetDescription] = useState("")

  const filteredDatasets = currentCluster.datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddDataset = () => {
    if (newDatasetName.trim()) {
      addDataset({
        name: newDatasetName.trim(),
        description: newDatasetDescription.trim() || undefined,
        itemCount: 0,
      })
      setNewDatasetName("")
      setNewDatasetDescription("")
      setIsAdding(false)
    }
  }

  const handleCancelAdd = () => {
    setNewDatasetName("")
    setNewDatasetDescription("")
    setIsAdding(false)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Datasets</h1>
          <p className="text-muted-foreground">
            Manage datasets in {currentCluster.name}
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 mr-2" />
          New Dataset
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search datasets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Add Dataset Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create New Dataset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="my-dataset"
                value={newDatasetName}
                onChange={(e) => setNewDatasetName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddDataset()
                  if (e.key === "Escape") handleCancelAdd()
                }}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <Input
                placeholder="What is this dataset for?"
                value={newDatasetDescription}
                onChange={(e) => setNewDatasetDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddDataset()
                  if (e.key === "Escape") handleCancelAdd()
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddDataset} disabled={!newDatasetName.trim()}>
                <Check className="h-4 w-4 mr-2" />
                Create
              </Button>
              <Button variant="outline" onClick={handleCancelAdd}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Datasets List */}
      <div className="grid gap-4">
        {filteredDatasets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Database className="h-12 w-12 text-muted-foreground mb-4" />
              {searchQuery ? (
                <>
                  <p className="text-lg font-medium">No datasets found</p>
                  <p className="text-muted-foreground">
                    No datasets match "{searchQuery}"
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">No datasets yet</p>
                  <p className="text-muted-foreground">
                    Create your first dataset to get started
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredDatasets.map((dataset) => (
            <Card
              key={dataset.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                dataset.id === currentDataset?.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentDataset(dataset)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{dataset.name}</h3>
                      {dataset.id === currentDataset?.id && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    {dataset.description && (
                      <p className="text-sm text-muted-foreground">
                        {dataset.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{dataset.itemCount} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(dataset.updatedAt)}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteDataset(dataset.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredDatasets.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? "s" : ""}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      )}
    </div>
  )
}
