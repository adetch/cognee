import { UploadZone } from "@/components/dashboard/upload-zone"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { QuickQuery } from "@/components/dashboard/quick-query"

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <QuickQuery />
      <UploadZone />
      <ActivityLog />
    </div>
  )
}
