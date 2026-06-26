"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function RecurringTransactions() {
  const [recurring, setRecurring] = useState<any[]>([])

  useEffect(() => {
    loadRecurring()
  }, [])

  const loadRecurring = async () => {
    try {
      const data = await api("/recurrings")
      setRecurring(data)
    } catch (err) {
      console.error(err)
      alert("Gagal memuat data recurring")
    }
  }

 const toggle = async (item: any) => {
  try {
    await api(`/recurrings/${item.id}/toggle`, {
      method: "PATCH",
    })

    loadRecurring()
  } catch (err) {
    console.error(err)
    alert("Gagal mengubah status recurring")
  }
}

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus recurring?")) return

    try {
      await api(`/recurrings/${id}`, {
        method: "DELETE",
      })

      loadRecurring()
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus recurring")
    }
  }

  const active = recurring.filter((r) => r.is_active)

  const totalOut = active
    .filter((r) => r.recurring_type === "expense")
    .reduce((sum, r) => sum + Number(r.amount), 0)

  const totalIn = active
    .filter((r) => r.recurring_type === "income")
    .reduce((sum, r) => sum + Number(r.amount), 0)

  const net = totalIn - totalOut

  return (
    <div className="p-4 space-y-4">

      <div className="grid grid-cols-3 gap-3">

        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-gray-500">Monthly Out</p>
          <p className="text-lg font-bold text-red-500">
            Rp {totalOut.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-gray-500">Monthly In</p>
          <p className="text-lg font-bold text-green-500">
            Rp {totalIn.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-gray-500">Net</p>
          <p
            className={`text-lg font-bold ${
              net >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            Rp {net.toLocaleString("id-ID")}
          </p>
        </div>

      </div>

      {recurring.map((item) => (

        <div
          key={item.id}
          className="border rounded-2xl p-4 space-y-3"
        >

          <div className="flex justify-between">

            <div>
              <p className="font-semibold">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                {item.category?.icon} {item.category?.name}
              </p>

              <p className="text-sm text-gray-500">
                {item.frequency}
              </p>

            </div>

            <p
              className={
                item.recurring_type === "income"
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              Rp {Number(item.amount).toLocaleString("id-ID")}
            </p>

          </div>

          <div className="flex justify-between items-center">

            <p className="text-sm text-gray-500">
              Next : {item.next_date}
            </p>

            <div className="flex gap-2">

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>

              <Switch
                checked={item.is_active}
                onCheckedChange={() => toggle(item)}
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  )
}