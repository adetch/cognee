"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Sparkles, ChevronDown, Plus, Check } from "lucide-react"

// Mock clusters data - in production this would come from API/context
const mockClusters = [
  { id: "cluster-abc123", name: "cluster-abc123" },
  { id: "cluster-prod-01", name: "cluster-prod-01" },
  { id: "cluster-dev", name: "cluster-dev" },
]

interface HeaderProps {
  isPro?: boolean
}

export function Header({ isPro = false }: HeaderProps) {
  const [currentCluster, setCurrentCluster] = useState(mockClusters[0])
  const hasMultipleClusters = mockClusters.length > 1

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Cluster info */}
      <nav className="flex items-center gap-2 text-sm">
        {hasMultipleClusters ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 font-medium hover:text-muted-foreground transition-colors">
                {currentCluster.name}
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {mockClusters.map((cluster) => (
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
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="font-medium">{currentCluster.name}</span>
        )}
        <Badge variant="outline">Medium</Badge>
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
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
