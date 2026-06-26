"use client"

import {Trash2} from "lucide-react"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function History() {

  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      const data = await api("/transactions")
      setTransactions(data)
    } catch (err) {
      console.error(err)
      alert("Failed to load transactions")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete transaction?")) return

    try {
      await api(`/transactions/${id}`, {
        method: "DELETE",
      })
      loadTransactions()
    } catch (err) {
      console.error(err)
      alert("Failed to delete transaction")
    }
  }

  return (
    <div className="p-4">

      <Header
        title="Transaction History"
        url="/dashboard"
      />

      <div className="mt-6 space-y-3">

        {transactions.map((t) => (

          <div
            key={t.id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >

            <div>

              <p className="font-semibold">
                {t.category?.icon} {t.category?.name}
              </p>

              <p className="text-sm text-gray-500">
                {t.notes || "-"}
              </p>

              <p className="text-xs text-gray-400">
                {t.date}
              </p>

            </div>

            <p
              className={`font-bold ${
                t.transaction_type === "income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {t.transaction_type === "income" ? "+" : "-"}
              Rp {Number(t.amount).toLocaleString()}
            </p>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(t.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

          </div>

        ))}

      </div>

    </div>
  )
}