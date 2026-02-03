"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Cluster, Dataset } from "@/types"
import { mockClusters } from "@/lib/mock-data"

interface WorkspaceContextType {
  clusters: Cluster[]
  currentCluster: Cluster
  currentDataset: Dataset | null
  recentDatasets: Dataset[]
  setCurrentCluster: (cluster: Cluster) => void
  setCurrentDataset: (dataset: Dataset | null) => void
  addDataset: (dataset: Omit<Dataset, "id" | "createdAt" | "updatedAt">) => void
  deleteDataset: (datasetId: string) => void
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [clusters, setClusters] = useState<Cluster[]>(mockClusters)
  const [currentCluster, setCurrentClusterState] = useState<Cluster>(mockClusters[0])
  const [currentDataset, setCurrentDatasetState] = useState<Dataset | null>(
    mockClusters[0].datasets[0] || null
  )
  const [recentDatasetIds, setRecentDatasetIds] = useState<string[]>(
    mockClusters[0].datasets.slice(0, 5).map((d) => d.id)
  )

  const setCurrentCluster = (cluster: Cluster) => {
    setCurrentClusterState(cluster)
    // Reset dataset when switching clusters
    const firstDataset = cluster.datasets[0] || null
    setCurrentDatasetState(firstDataset)
    setRecentDatasetIds(cluster.datasets.slice(0, 5).map((d) => d.id))
  }

  const setCurrentDataset = (dataset: Dataset | null) => {
    setCurrentDatasetState(dataset)
    if (dataset) {
      // Add to recent, keeping only 5 most recent
      setRecentDatasetIds((prev) => {
        const filtered = prev.filter((id) => id !== dataset.id)
        return [dataset.id, ...filtered].slice(0, 5)
      })
    }
  }

  const recentDatasets = recentDatasetIds
    .map((id) => currentCluster.datasets.find((d) => d.id === id))
    .filter((d): d is Dataset => d !== undefined)

  const addDataset = (datasetData: Omit<Dataset, "id" | "createdAt" | "updatedAt">) => {
    const newDataset: Dataset = {
      ...datasetData,
      id: `ds-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setClusters((prev) =>
      prev.map((c) =>
        c.id === currentCluster.id
          ? { ...c, datasets: [...c.datasets, newDataset] }
          : c
      )
    )

    setCurrentClusterState((prev) => ({
      ...prev,
      datasets: [...prev.datasets, newDataset],
    }))
  }

  const deleteDataset = (datasetId: string) => {
    setClusters((prev) =>
      prev.map((c) =>
        c.id === currentCluster.id
          ? { ...c, datasets: c.datasets.filter((d) => d.id !== datasetId) }
          : c
      )
    )

    setCurrentClusterState((prev) => ({
      ...prev,
      datasets: prev.datasets.filter((d) => d.id !== datasetId),
    }))

    // If deleting current dataset, select another one
    if (currentDataset?.id === datasetId) {
      const remaining = currentCluster.datasets.filter((d) => d.id !== datasetId)
      setCurrentDatasetState(remaining[0] || null)
    }

    // Remove from recent
    setRecentDatasetIds((prev) => prev.filter((id) => id !== datasetId))
  }

  return (
    <WorkspaceContext.Provider
      value={{
        clusters,
        currentCluster,
        currentDataset,
        recentDatasets,
        setCurrentCluster,
        setCurrentDataset,
        addDataset,
        deleteDataset,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}
