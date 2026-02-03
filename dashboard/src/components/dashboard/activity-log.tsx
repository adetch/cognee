"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Loader2 } from "lucide-react"

const activityLogs = [
  { time: "14:32:01", message: "Document ingested (2.4 MB)", status: "success" },
  { time: "14:32:02", message: "Text extraction complete (47 pages)", status: "success" },
  { time: "14:32:05", message: "Chunking complete (156 segments)", status: "success" },
  { time: "14:32:08", message: "Generating embeddings... (78/156)", status: "loading" },
  { time: "14:32:12", message: "Embeddings stored in vector DB", status: "success" },
  { time: "14:32:15", message: "Building knowledge graph...", status: "loading" },
  { time: "14:32:18", message: "Extracted 234 entities", status: "success" },
  { time: "14:32:22", message: "Created 412 relationships", status: "success" },
  { time: "14:32:25", message: "Graph stored in Neo4j", status: "success" },
  { time: "14:32:28", message: "Running memify algorithms...", status: "loading" },
  { time: "14:32:35", message: "Memory consolidation complete", status: "success" },
  { time: "14:32:36", message: "Ready for queries", status: "success" },
]

const stats = [
  { label: "Documents", value: "12" },
  { label: "Entities", value: "1,847" },
  { label: "Relations", value: "3,291" },
  { label: "Embeddings", value: "4,562" },
]

export function ActivityLog() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Memory Building Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Processing */}
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm font-medium">Processing: quarterly-report.pdf</span>
        </div>

        {/* Log Messages */}
        <ScrollArea className="h-[200px] rounded-md bg-muted/30">
          <div className="p-4 font-mono text-xs">
            {activityLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 py-1">
                <span className="text-muted-foreground">{log.time}</span>
                {log.status === "success" ? (
                  <Check className="h-3 w-3 shrink-0 text-green-500" />
                ) : (
                  <Loader2 className="h-3 w-3 shrink-0 animate-spin text-primary" />
                )}
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
