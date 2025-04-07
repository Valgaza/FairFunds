"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, PlusCircle, ReceiptText } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function FriendDetail() {
  // Dummy data - in a real app, this would come from an API or state
  const friends = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "",
      initials: "AJ",
      balance: -42.50,
      expenses: [
        {
          id: 101,
          description: "Dinner",
          date: "2023-05-15",
          amount: 85.00,
          owedByYou: true,
          yourShare: 42.50
        },
        {
          id: 102,
          description: "Coffee",
          date: "2023-05-08",
          amount: 10.50,
          owedByYou: false,
          yourShare: 5.25
        }
      ]
    },
    {
      id: 2,
      name: "Chris Smith",
      avatar: "",
      initials: "CS",
      balance: 35.00,
      expenses: [
        {
          id: 201,
          description: "Movie tickets",
          date: "2023-05-10",
          amount: 35.00,
          owedByYou: false,
          yourShare: 17.50
        }
      ]
    },
    {
      id: 3,
      name: "Taylor Wong",
      avatar: "",
      initials: "TW",
      balance: -15.75,
      expenses: [
        {
          id: 301,
          description: "Groceries",
          date: "2023-05-08",
          amount: 45.75,
          owedByYou: true,
          yourShare: 22.88
        },
        {
          id: 302,
          description: "Uber",
          date: "2023-05-07",
          amount: 18.25,
          owedByYou: false,
          yourShare: 9.13
        }
      ]
    },
    {
      id: 4,
      name: "Jamie Lee",
      avatar: "",
      initials: "JL",
      balance: 89.50,
      expenses: [
        {
          id: 401,
          description: "Utilities",
          date: "2023-05-05",
          amount: 120.00,
          owedByYou: false,
          yourShare: 60.00
        },
        {
          id: 402,
          description: "Internet",
          date: "2023-05-05",
          amount: 59.00,
          owedByYou: false,
          yourShare: 29.50
        }
      ]
    },
    {
      id: 5,
      name: "Sam Davis",
      avatar: "",
      initials: "SD",
      balance: 0,
      expenses: [
        {
          id: 501,
          description: "Rent",
          date: "2023-05-01",
          amount: 1600.00,
          owedByYou: true,
          yourShare: 800.00
        },
        {
          id: 502,
          description: "Rent payment",
          date: "2023-05-01",
          amount: 800.00,
          owedByYou: false,
          yourShare: 800.00
        }
      ]
    }
  ]

  return (
    <div className="grid gap-6">
      {friends.map((friend) => (
        <Card key={friend.id}>
          <CardHeader className="flex flex-row items-center space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{friend.name}</CardTitle>
                <CardDescription>
                  {friend.balance === 0
                    ? "All settled up"
                    : friend.balance < 0
                    ? `You owe $${Math.abs(friend.balance).toFixed(2)}`
                    : `Owes you $${friend.balance.toFixed(2)}`}
                </CardDescription>
              </div>
            </div>
            <div className="ml-auto space-x-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/expenses?friend=${friend.id}`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expense
                </Link>
              </Button>
              {friend.balance !== 0 && (
                <Button asChild size="sm">
                  <Link href={`/settle?friend=${friend.id}`}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Settle Up
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Expenses</TabsTrigger>
                <TabsTrigger value="youowe">You Owe</TabsTrigger>
                <TabsTrigger value="theyowe">They Owe</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="space-y-4">
                  {friend.expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{expense.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm">
                            {expense.owedByYou ? "You paid" : `${friend.name} paid`}
                          </p>
                          <p className="text-sm font-medium">${expense.amount.toFixed(2)}</p>
                        </div>
                        <Badge variant={expense.owedByYou ? "destructive" : "default"}>
                          {expense.owedByYou ? "-" : "+"}${expense.yourShare.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="youowe">
                <div className="space-y-4">
                  {friend.expenses
                    .filter((expense) => expense.owedByYou)
                    .map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{expense.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm">You paid</p>
                            <p className="text-sm font-medium">${expense.amount.toFixed(2)}</p>
                          </div>
                          <Badge variant="destructive">
                            -${expense.yourShare.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="theyowe">
                <div className="space-y-4">
                  {friend.expenses
                    .filter((expense) => !expense.owedByYou)
                    .map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{expense.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm">{friend.name} paid</p>
                            <p className="text-sm font-medium">${expense.amount.toFixed(2)}</p>
                          </div>
                          <Badge>
                            +${expense.yourShare.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <ReceiptText className="mr-2 h-4 w-4" />
              View Detailed History
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
