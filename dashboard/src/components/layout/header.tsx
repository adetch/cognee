"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, ChevronDown, Plus, Check, ChevronRight, Database } from "lucide-react"
import { useWorkspace } from "@/context/workspace-context"

interface HeaderProps {
  isPro?: boolean
}

export function Header({ isPro = false }: HeaderProps) {
  const {
    clusters,
    currentCluster,
    currentDataset,
    recentDatasets,
    setCurrentCluster,
    setCurrentDataset,
  } = useWorkspace()

  const hasMultipleClusters = clusters.length > 1

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Breadcrumb: Cluster > Dataset */}
      <nav className="flex items-center gap-2 text-sm">
        {/* Cluster selector */}
        {hasMultipleClusters ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 font-medium hover:text-muted-foreground transition-colors">
                {currentCluster.name}
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {clusters.map((cluster) => (
                <DropdownMenuItem
                  key={cluster.id}
                  onClick={() => setCurrentCluster(cluster)}
                  className="flex items-center justify-between gap-4"
                >
                  {cluster.name}
                  {cluster.id === currentCluster.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-muted-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create cluster
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings?tab=clusters" className="text-muted-foreground">
                  Manage clusters
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="font-medium">{currentCluster.name}</span>
        )}

        {/* Separator */}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />

        {/* Dataset selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 font-medium hover:text-muted-foreground transition-colors">
              <Database className="h-4 w-4 text-muted-foreground" />
              {currentDataset?.name || "Select dataset"}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {recentDatasets.length > 0 ? (
              <>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Recent
                </div>
                {recentDatasets.map((dataset) => (
                  <DropdownMenuItem
                    key={dataset.id}
                    onClick={() => setCurrentDataset(dataset)}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{dataset.name}</span>
                    {dataset.id === currentDataset?.id && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem asChild>
              <Link href="/datasets" className="text-muted-foreground">
                View all datasets
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {!isPro && (
          <Button variant="outline" size="sm" className="gap-1.5">
            <Sparkles className="h-4 w-4" />
            Upgrade
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}
