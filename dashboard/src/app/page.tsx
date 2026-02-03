import { UploadZone } from "@/components/dashboard/upload-zone"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { QuickQuery } from "@/components/dashboard/quick-query"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <UploadZone />
      <ActivityLog />
      <QuickQuery />
    </div>
  )
}
