"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

export function BalanceSummary() {
  // Dummy data - in a real app, this would come from an API or state
  const totalBalance = -125.50
  const youOwe = 250.00
  const youAreOwed = 124.50

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Your Balance</CardTitle>
          <CardDescription>Summary of what you owe and are owed</CardDescription>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/settle">
            <DollarSign className="mr-2 h-4 w-4" />
            Settle Up
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <div className={`flex items-center gap-1 ${totalBalance < 0 ? "text-red-500" : "text-green-500"}`}>
                  {totalBalance < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                </div>
              </div>
              <div className={`text-2xl font-bold ${totalBalance < 0 ? "text-negative" : "text-positive"}`}>
                ${Math.abs(totalBalance).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalBalance < 0 ? "You owe overall" : "You are owed overall"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">You Owe</p>
                <TrendingDown className="h-4 w-4 text-negative" />
              </div>
              <div className="text-2xl font-bold text-negative">${youOwe.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total you owe others</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0">
                <p className="text-sm font-medium text-muted-foreground">You're Owed</p>
                <TrendingUp className="h-4 w-4 text-positive" />
              </div>
              <div className="text-2xl font-bold text-positive">${youAreOwed.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total others owe you</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
