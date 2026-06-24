"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const initialTransactions = [
  { id: 1, name: "Rent", icon: "🏠", bg: "#fff3e0", freq: "Monthly · 14th", next: "Mar 14", amount: -1800, active: true },
  { id: 2, name: "Salary", icon: "💼", bg: "#fce4ec", freq: "Monthly · 25th", next: "Mar 25", amount: 4200, active: true },
  { id: 3, name: "Spotify", icon: "🎵", bg: "#f3e5f5", freq: "Monthly · 8th", next: "Apr 8", amount: -11, active: false },
  { id: 4, name: "Loan Payment", icon: "💳", bg: "#e3f2fd", freq: "Monthly · 1st", next: "Apr 1", amount: -420, active: true },
  { id: 5, name: "Cloud Storage", icon: "☁️", bg: "#e8f5e9", freq: "Yearly · Mar 20", next: "Mar 20", amount: -99, active: true },
]

function fmt(n: number) {
  return (n >= 0 ? "+" : "-") + "$" + Math.abs(n).toLocaleString("en-US")
}

export default function RecurringTransactions() {
  const [transactions, setTransactions] = useState(initialTransactions)

  const toggle = (id: number) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, active: !t.active } : t)
    )
  }

  const active = transactions.filter(t => t.active)
  const totalOut = active.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
  const totalIn = active.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const net = totalIn - totalOut

  return (
    <div className="p-4">

      {/* Summary */}
      <div className="flex gap-3">
        {[
          { label: "Monthly out", value: `-$${totalOut.toLocaleString()}`, color: "text-red-500" },
          { label: "Monthly in", value: `+$${totalIn.toLocaleString()}`, color: "text-emerald-500" },
          { label: "Net", value: fmt(net), color: net >= 0 ? "text-emerald-500" : "text-red-500" },
        ].map(s => (
          <div key={s.label} className="flex-1 bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-lg font-semibold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      {transactions.map(t => (
        <div key={t.id} className="bg-background border rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: t.bg }}>
                {t.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.freq}</p>
              </div>
            </div>
            <p className={`font-semibold ${t.amount >= 0 ? "text-emerald-500" : "text-red-500"}`}>
              {fmt(t.amount)}
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <p className="text-xs text-muted-foreground">Next: {t.next}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
              <Switch checked={t.active} onCheckedChange={() => toggle(t.id)} />
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}