"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const exampleQueries = [
  "What were the key findings from Q3?",
  "Show connections between Project Alpha and revenue",
  "Summarize all customer feedback about pricing",
]

export function QuickQuery() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Query Your Memory</CardTitle>
        <Link href="/query">
          <Button variant="ghost" size="sm" className="gap-1">
            Full Query
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Ask a question about your data..."
            className="w-full rounded-md border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Example queries:</p>
          <ul className="mt-2 space-y-1">
            {exampleQueries.map((query) => (
              <li key={query}>
                <button className="text-sm text-primary hover:underline">
                  &ldquo;{query}&rdquo;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
