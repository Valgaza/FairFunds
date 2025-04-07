import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { BalanceSummary } from "@/components/dashboard/BalanceSummary"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { FriendsList } from "@/components/dashboard/FriendsList"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-1">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <BalanceSummary />
          <FriendsList />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1 pt-[3.5rem]">
          <div className="max-w-[700px] w-full">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
