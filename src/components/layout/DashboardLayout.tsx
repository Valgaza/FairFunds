"use client"

import { Header } from "@/components/layout/Header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto px-4 md:px-6 pt-2">
      <div className="mx-auto w-full max-w-screen-2xl">
          <div className="bg-card text-foreground shadow-xl rounded-xl p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
