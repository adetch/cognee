"use client"

import { useState } from "react"
import { Search, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const exampleQueries = [
  "What were the key findings from Q3?",
  "Summarize customer feedback about pricing",
  "Show connections between Project Alpha and revenue",
]

export function QuickQuery() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 transition-all",
          isFocused && "ring-2 ring-ring bg-muted/80"
        )}
      >
        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask a question about your data..."
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            <Sparkles className="h-3 w-3" />
            Ask
          </button>
        )}
      </div>

      {!query && (
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((q) => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className="rounded-md bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
