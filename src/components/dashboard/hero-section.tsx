import { Upload, Cpu, MessageSquare, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  isPro?: boolean
}

export function HeroSection({ isPro = false }: HeroSectionProps) {
  return (
    <div className="rounded-lg border bg-gradient-to-br from-card to-accent/20 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Build Intelligent Memory for Your AI Agents
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Transform your data into a living knowledge graph that learns and improves over time.
          </p>
        </div>
        {isPro && (
          <Badge variant="secondary" className="gap-1.5 shrink-0">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Pro
          </Badge>
        )}
      </div>

      {/* Workflow Steps */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <WorkflowStep
          step={1}
          icon={Upload}
          title="Upload Data"
          description="Add files, URLs, or connect blob stores"
          active
        />
        <WorkflowStep
          step={2}
          icon={Cpu}
          title="Build Memory"
          description="Knowledge graphs & semantic connections"
        />
        <WorkflowStep
          step={3}
          icon={MessageSquare}
          title="Query with AI"
          description="Ask natural language questions"
        />
      </div>
    </div>
  )
}

function WorkflowStep({
  step,
  icon: Icon,
  title,
  description,
  active,
}: {
  step: number
  icon: React.ElementType
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div className="relative flex items-start gap-4">
      {step < 3 && (
        <ArrowRight className="absolute -right-2 top-6 hidden h-5 w-5 text-muted-foreground md:block" />
      )}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Step {step}
        </p>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
