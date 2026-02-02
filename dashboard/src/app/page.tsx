import { HeroSection } from "@/components/dashboard/hero-section"
import { UploadZone } from "@/components/dashboard/upload-zone"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { QuickQuery } from "@/components/dashboard/quick-query"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero / Value Proposition */}
      <HeroSection />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Upload */}
        <UploadZone />

        {/* Right Column - Activity & Query */}
        <div className="space-y-6">
          <ActivityLog />
          <QuickQuery />
        </div>
      </div>
    </div>
  )
}
