import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ExpenseForm } from "@/components/expenses/ExpenseForm"
import { Suspense } from "react"

export default function ExpensesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Add an Expense</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ExpenseForm />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
