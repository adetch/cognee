"use client"

import { Check, Loader2 } from "lucide-react"

const activityLogs = [
  { time: "14:32:36", message: "Ready for queries", status: "success" },
  { time: "14:32:35", message: "Memory consolidation complete", status: "success" },
  { time: "14:32:28", message: "Running memify algorithms...", status: "loading" },
  { time: "14:32:25", message: "Graph stored in Neo4j", status: "success" },
  { time: "14:32:22", message: "Created 412 relationships", status: "success" },
  { time: "14:32:18", message: "Extracted 234 entities", status: "success" },
  { time: "14:32:15", message: "Building knowledge graph...", status: "loading" },
  { time: "14:32:12", message: "Embeddings stored in vector DB", status: "success" },
]

const stats = [
  { label: "Documents", value: "12" },
  { label: "Entities", value: "1,847" },
  { label: "Relations", value: "3,291" },
  { label: "Embeddings", value: "4,562" },
]

export function ActivityLog() {
  const isProcessing = true // Would come from real state
  const currentFile = "quarterly-report.pdf"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Activity</h2>
          {isProcessing && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Processing {currentFile}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-6 text-sm">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-1.5">
            <span className="font-semibold tabular-nums">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Log */}
      <div className="max-h-48 overflow-y-auto">
        <div className="space-y-0.5 font-mono text-xs">
          {activityLogs.map((log, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted/50"
            >
              <span className="text-muted-foreground tabular-nums">{log.time}</span>
              {log.status === "success" ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
              )}
              <span className="text-muted-foreground">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
