import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { GroupList } from "@/components/groups/GroupList"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
        <Button asChild>
          <Link href="/groups/new">
            <Users className="mr-2 h-4 w-4" />
            Create Group
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <GroupList />
      </div>
    </DashboardLayout>
  );
}
