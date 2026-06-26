"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { api } from "@/lib/api"

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

          </div>

        ))}

      </div>

    </div>
  )
}