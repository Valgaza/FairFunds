"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, DollarSign } from "lucide-react"
import Link from "next/link"

export function GroupList() {
  // Dummy data - in a real app, this would come from an API or state
  const groups = [
    {
      id: 1,
      name: "Apartment",
      description: "Shared expenses for apartment",
      members: [
        {
          id: 1,
          name: "Alex Johnson",
          avatar: "",
          initials: "AJ",
          balance: -42.50,
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
        }
      ],
      totalBalance: 31.25
    },
    {
      id: 2,
      name: "Trip to New York",
      description: "All expenses for our NYC trip",
      members: [
        {
          id: 1,
          name: "Alex Johnson",
          avatar: "",
          initials: "AJ",
          balance: -120.00,
        },
        {
          id: 2,
          name: "Chris Smith",
          avatar: "",
          initials: "CS",
          balance: 75.00,
        },
        {
          id: 5,
          name: "Sam Davis",
          avatar: "",
          initials: "SD",
          balance: 45.00,
        }
      ],
      totalBalance: 0
    },
    {
      id: 3,
      name: "Game Night",
      description: "Expenses for weekly game nights",
      members: [
        {
          id: 2,
          name: "Chris Smith",
          avatar: "",
          initials: "CS",
          balance: -25.00,
        },
        {
          id: 3,
          name: "Taylor Wong",
          avatar: "",
          initials: "TW",
          balance: 15.00,
        },
        {
          id: 4,
          name: "Jamie Lee",
          avatar: "",
          initials: "JL",
          balance: 10.00,
        }
      ],
      totalBalance: 0
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{group.name}</span>
              <Badge variant={group.totalBalance < 0 ? "destructive" : group.totalBalance > 0 ? "default" : "outline"}>
                {group.totalBalance < 0 ? "-" : group.totalBalance > 0 ? "+" : ""}
                ${Math.abs(group.totalBalance).toFixed(2)}
              </Badge>
            </CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Members</h3>
              <div className="flex flex-wrap gap-2">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2 border rounded-full px-3 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                    <Badge variant={member.balance < 0 ? "destructive" : member.balance > 0 ? "default" : "outline"} className="text-xs">
                      {member.balance < 0 ? "-" : member.balance > 0 ? "+" : ""}
                      ${Math.abs(member.balance).toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline" size="sm">
              <Link href={`/expenses?group=${group.id}`}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/groups/${group.id}`}>
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
