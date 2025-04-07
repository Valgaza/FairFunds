"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export function SettleUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const friendId = searchParams.get("friend")

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [amount, setAmount] = useState("")
  const [selectedFriend, setSelectedFriend] = useState<number | null>(friendId ? parseInt(friendId) : null)

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
    }
  ].filter(friend => friend.balance !== 0)

  const selectedFriendData = friends.find(friend => friend.id === selectedFriend)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would send this data to an API
    console.log({
      friend: selectedFriend,
      amount,
      date
    })

    // Navigate back to the dashboard
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Settle Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Who do you want to settle up with?</Label>
            <div className="grid gap-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                    selectedFriend === friend.id ? 'border-green-500 bg-green-50' : ''
                  }`}
                  onClick={() => {
                    setSelectedFriend(friend.id)
                    // Pre-set the amount based on the balance
                    if (friend.balance !== 0) {
                      setAmount(Math.abs(friend.balance).toFixed(2))
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback>{friend.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {friend.balance < 0
                          ? `You owe $${Math.abs(friend.balance).toFixed(2)}`
                          : `Owes you $${friend.balance.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant={friend.balance < 0 ? "destructive" : "default"}>
                    {friend.balance < 0 ? "-" : "+"}${Math.abs(friend.balance).toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {selectedFriend && (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
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
                {selectedFriendData && (
                  <p className="text-sm text-muted-foreground">
                    {selectedFriendData.balance < 0
                      ? `You owe ${selectedFriendData.name} $${Math.abs(selectedFriendData.balance).toFixed(2)}`
                      : `${selectedFriendData.name} owes you $${selectedFriendData.balance.toFixed(2)}`}
                  </p>
                )}
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
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this payment"
                  className="min-h-[80px]"
                />
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button type="button" variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Venmo</span>
                  </Button>
                  <Button type="button" variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>PayPal</span>
                  </Button>
                  <Button type="button" variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Zelle</span>
                  </Button>
                  <Button type="button" variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Cash</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Payment methods are for recording purposes only. No actual payments will be processed.
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={!selectedFriend || !amount}>Record Payment</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
