"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export function ExpenseForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const friendId = searchParams.get("friend")
  const groupId = searchParams.get("group")

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState("you")
  const [splitType, setSplitType] = useState("equally")

  // Dummy data - in a real app, this would come from an API or state
  const friends = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "",
      initials: "AJ",
      selected: friendId === "1",
    },
    {
      id: 2,
      name: "Chris Smith",
      avatar: "",
      initials: "CS",
      selected: friendId === "2",
    },
    {
      id: 3,
      name: "Taylor Wong",
      avatar: "",
      initials: "TW",
      selected: friendId === "3",
    },
    {
      id: 4,
      name: "Jamie Lee",
      avatar: "",
      initials: "JL",
      selected: friendId === "4",
    },
    {
      id: 5,
      name: "Sam Davis",
      avatar: "",
      initials: "SD",
      selected: friendId === "5",
    }
  ]

  const groups = [
    {
      id: 1,
      name: "Apartment",
      description: "Shared expenses for apartment",
      selected: groupId === "1",
      members: [
        { id: 1, name: "Alex Johnson", avatar: "", initials: "AJ", selected: true },
        { id: 3, name: "Taylor Wong", avatar: "", initials: "TW", selected: true },
        { id: 4, name: "Jamie Lee", avatar: "", initials: "JL", selected: true }
      ]
    },
    {
      id: 2,
      name: "Trip to New York",
      description: "All expenses for our NYC trip",
      selected: groupId === "2",
      members: [
        { id: 1, name: "Alex Johnson", avatar: "", initials: "AJ", selected: true },
        { id: 2, name: "Chris Smith", avatar: "", initials: "CS", selected: true },
        { id: 5, name: "Sam Davis", avatar: "", initials: "SD", selected: true }
      ]
    },
    {
      id: 3,
      name: "Game Night",
      description: "Expenses for weekly game nights",
      selected: groupId === "3",
      members: [
        { id: 2, name: "Chris Smith", avatar: "", initials: "CS", selected: true },
        { id: 3, name: "Taylor Wong", avatar: "", initials: "TW", selected: true },
        { id: 4, name: "Jamie Lee", avatar: "", initials: "JL", selected: true }
      ]
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would send this data to an API
    console.log({
      description,
      amount,
      date,
      paidBy,
      splitType,
      friends: friends.filter(f => f.selected).map(f => f.id),
      group: groups.find(g => g.selected)?.id
    })

    // Navigate back to the dashboard
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                className="pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Paid by</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={paidBy === "you" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setPaidBy("you")}
              >
                You
              </Button>
              {friends.filter(f => f.selected).map((friend) => (
                <Button
                  key={friend.id}
                  type="button"
                  variant={paidBy === `friend-${friend.id}` ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setPaidBy(`friend-${friend.id}`)}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.initials}</AvatarFallback>
                  </Avatar>
                  {friend.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Split with</Label>
            <Tabs defaultValue={groupId ? "group" : "friends"}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="group">Group</TabsTrigger>
              </TabsList>
              <TabsContent value="friends" className="space-y-4 mt-4">
                <div className="grid gap-2">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`friend-${friend.id}`}
                        checked={friend.selected}
                        onCheckedChange={(checked) => {
                          friend.selected = checked as boolean
                        }}
                      />
                      <Label
                        htmlFor={`friend-${friend.id}`}
                        className="flex items-center cursor-pointer"
                      >
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.initials}</AvatarFallback>
                        </Avatar>
                        {friend.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="group" className="space-y-4 mt-4">
                <div className="grid gap-2">
                  {groups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={group.selected}
                        onCheckedChange={(checked) => {
                          // Unselect all groups first
                          groups.forEach(g => g.selected = false)
                          // Select only this group
                          group.selected = checked as boolean
                        }}
                      />
                      <Label
                        htmlFor={`group-${group.id}`}
                        className="cursor-pointer"
                      >
                        {group.name}
                        <p className="text-xs text-muted-foreground">{group.description}</p>
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>Split type</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                type="button"
                variant={splitType === "equally" ? "default" : "outline"}
                className="w-full justify-center"
                onClick={() => setSplitType("equally")}
              >
                Equally
              </Button>
              <Button
                type="button"
                variant={splitType === "unequally" ? "default" : "outline"}
                className="w-full justify-center"
                onClick={() => setSplitType("unequally")}
              >
                Unequally
              </Button>
              <Button
                type="button"
                variant={splitType === "percentage" ? "default" : "outline"}
                className="w-full justify-center"
                onClick={() => setSplitType("percentage")}
              >
                By percentage
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this expense"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Expense</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
