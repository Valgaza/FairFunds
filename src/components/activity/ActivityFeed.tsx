"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

export function ActivityFeed() {
  const [filter, setFilter] = useState("all")
  const [timeFrame, setTimeFrame] = useState("all")

  // Dummy data - in a real app, this would come from an API or state
  const activities = [
    {
      id: 1,
      type: "expense",
      date: "2023-05-15",
      description: "Dinner",
      amount: 85.00,
      yourShare: 42.50,
      owedByYou: true,
      user: {
        name: "Alex Johnson",
        avatar: "",
        initials: "AJ"
      },
      group: null
    },
    {
      id: 2,
      type: "payment",
      date: "2023-05-12",
      description: "Payment",
      amount: 35.00,
      yourShare: 0,
      owedByYou: false,
      user: {
        name: "Chris Smith",
        avatar: "",
        initials: "CS"
      },
      group: null
    },
    {
      id: 3,
      type: "expense",
      date: "2023-05-10",
      description: "Movie tickets",
      amount: 35.00,
      yourShare: 17.50,
      owedByYou: false,
      user: {
        name: "Chris Smith",
        avatar: "",
        initials: "CS"
      },
      group: null
    },
    {
      id: 4,
      type: "expense",
      date: "2023-05-08",
      description: "Groceries",
      amount: 45.75,
      yourShare: 22.88,
      owedByYou: true,
      user: {
        name: "Taylor Wong",
        avatar: "",
        initials: "TW"
      },
      group: null
    },
    {
      id: 5,
      type: "expense",
      date: "2023-05-05",
      description: "Utilities",
      amount: 120.00,
      yourShare: 40.00,
      owedByYou: false,
      user: null,
      group: {
        name: "Apartment",
        members: [
          { name: "Alex Johnson", avatar: "", initials: "AJ" },
          { name: "Taylor Wong", avatar: "", initials: "TW" },
          { name: "Jamie Lee", avatar: "", initials: "JL" }
        ]
      }
    },
    {
      id: 6,
      type: "payment",
      date: "2023-05-01",
      description: "Rent payment",
      amount: 800.00,
      yourShare: 0,
      owedByYou: false,
      user: {
        name: "Sam Davis",
        avatar: "",
        initials: "SD"
      },
      group: null
    }
  ]

  // Filter activities based on the selected filter
  const filteredActivities = activities.filter(activity => {
    if (filter === "all") return true
    if (filter === "expenses" && activity.type === "expense") return true
    if (filter === "payments" && activity.type === "payment") return true
    return false
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Recent expenses and payments</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="today">Today</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All activities</SelectItem>
                <SelectItem value="expenses">Expenses only</SelectItem>
                <SelectItem value="payments">Payments only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activities found
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 pb-6 border-b last:border-0">
                <div className="bg-muted rounded-full p-2">
                  {activity.user ? (
                    <Avatar>
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>
                  ) : activity.group ? (
                    <div className="flex -space-x-2">
                      {activity.group.members.slice(0, 3).map((member, i) => (
                        <Avatar key={i} className="border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  ) : (
                    <Avatar>
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        {activity.description}
                        {activity.group && ` (${activity.group.name})`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.type === "expense" ? (
                        <>
                          <div className="text-sm">
                            {activity.owedByYou
                              ? `You paid, and owe ${activity.user?.name}`
                              : activity.user
                              ? `${activity.user.name} paid, and owes you`
                              : "Group expense"}
                          </div>
                          <span
                            className={cn(
                              "inline-block rounded px-2 py-1 text-sm font-medium",
                              activity.owedByYou
                                ? "bg-negative text-negative-foreground"
                                : "bg-positive text-positive-foreground"
                            )}
                          >
                            {activity.owedByYou ? "-" : "+"}${activity.yourShare.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="text-sm">
                            {activity.owedByYou
                              ? `You paid ${activity.user?.name}`
                              : `${activity.user?.name} paid you`}
                          </div>
                          <span className="inline-block rounded px-2 py-1 text-sm font-medium bg-positive text-positive-foreground">
                            +${activity.amount.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
