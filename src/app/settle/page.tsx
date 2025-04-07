import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { SettleUpForm } from "@/components/settle/SettleUpForm"
import { Suspense } from "react"

export default function SettleUpPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Settle Up</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SettleUpForm />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
