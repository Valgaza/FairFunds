"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function FriendsList() {
  // Dummy data - in a real app, this would come from an API or state
  const friends = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "",
      initials: "AJ",
      balance: -42.50,
    },
    {
      id: 2,
      name: "Chris Smith",
      avatar: "",
      initials: "CS",
      balance: 35.00,
    },
    {
      id: 3,
      name: "Taylor Wong",
      avatar: "",
      initials: "TW",
      balance: -15.75,
    },
    {
      id: 4,
      name: "Jamie Lee",
      avatar: "",
      initials: "JL",
      balance: 89.50,
    },
    {
      id: 5,
      name: "Sam Davis",
      avatar: "",
      initials: "SD",
      balance: 0,
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>People you split expenses with</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>{friend.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{friend.name}</p>
                  {friend.balance !== 0 && (
                    <p className="text-sm text-muted-foreground">
                      {friend.balance < 0
                        ? `You owe $${Math.abs(friend.balance).toFixed(2)}`
                        : `Owes you $${friend.balance.toFixed(2)}`}
                    </p>
                  )}
                  {friend.balance === 0 && (
                    <p className="text-sm text-muted-foreground">
                      All settled up
                    </p>
                  )}
                </div>
              </div>
              <span
                className={cn(
                  "inline-block rounded px-2 py-1 text-sm font-medium",
                  friend.balance < 0
                    ? "bg-negative text-negative-foreground"
                    : friend.balance > 0
                    ? "bg-positive text-positive-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
  {friend.balance < 0 ? "-" : friend.balance > 0 ? "+" : ""}
  ${Math.abs(friend.balance).toFixed(2)}
</span>

            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/friends/add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Friend
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
