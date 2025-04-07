"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function RecentActivity() {
  // Dummy data - in a real app, this would come from an API or state
  const activities = [
    {
      id: 1,
      description: "Dinner",
      date: "2023-05-15",
      amount: 85.00,
      owedByYou: true,
      friend: {
        name: "Alex Johnson",
        avatar: "",
        initials: "AJ"
      }
    },
    {
      id: 2,
      description: "Movie tickets",
      date: "2023-05-10",
      amount: 32.50,
      owedByYou: false,
      friend: {
        name: "Chris Smith",
        avatar: "",
        initials: "CS"
      }
    },
    {
      id: 3,
      description: "Groceries",
      date: "2023-05-08",
      amount: 45.75,
      owedByYou: true,
      friend: {
        name: "Taylor Wong",
        avatar: "",
        initials: "TW"
      }
    },
    {
      id: 4,
      description: "Utilities",
      date: "2023-05-05",
      amount: 120.00,
      owedByYou: false,
      friend: {
        name: "Jamie Lee",
        avatar: "",
        initials: "JL"
      }
    },
    {
      id: 5,
      description: "Rent",
      date: "2023-05-01",
      amount: 800.00,
      owedByYou: true,
      friend: {
        name: "Sam Davis",
        avatar: "",
        initials: "SD"
      }
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest expenses and payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={activity.friend.avatar} />
                  <AvatarFallback>{activity.friend.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.owedByYou ? "You owe " : "Owes you "}
                    {activity.friend.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-block rounded px-2 py-1 text-sm font-medium",
                  activity.owedByYou
                    ? "bg-negative text-negative-foreground"
                    : "bg-positive text-positive-foreground"
                )}
              >
                {activity.owedByYou ? "-" : "+"}${activity.amount.toFixed(2)}
              </span>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
