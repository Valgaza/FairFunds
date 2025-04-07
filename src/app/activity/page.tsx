import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ActivityFeed } from "@/components/activity/ActivityFeed"

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Activity</h1>
        <ActivityFeed />
      </div>
    </DashboardLayout>
  );
}
