import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { FriendDetail } from "@/components/friends/FriendDetail"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function FriendsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Friends</h1>
        <Button asChild>
          <Link href="/friends/add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Friend
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <FriendDetail />
      </div>
    </DashboardLayout>
  );
}
