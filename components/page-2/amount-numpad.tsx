"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react"

export default function AmountInput() {
  const [amount, setAmount] = useState("0")

  const handleNumber = (num: string) => {
    if (amount === "0") {
      setAmount(num)
    } else {
      setAmount(amount + num)
    }
  }

  const handleDelete = () => {
    if (amount.length === 1) {
        setAmount("0")
    } else {
        setAmount(amount.slice(0, -1))
    }0
  }

   const [type, setType] = useState ("")

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      
      
        <div className="flex w-[300px] rounded-full bg-gray-200 p-2">
            <div className="flex w-[300px] rounded-full bg-gray-200 p-2">
                <button
                    onClick={() => setType("expense")}
                    className={`w-full rounded-full p-2 text-sm font-semibold text-center ${type === "expense" ? "bg-red-600 text-white" : "text-gray-400"}`}
                    >
                        Expense
                </button>

                <button
                    onClick={() => setType("income")}
                    className={`w-full rounded-full p-2 text-sm font-semibold text-center ${type === "income" ? "bg-green-600 text-white" : "text-gray-400"}`}
                >
                    Income
                </button>
            </div>

        </div>

      {/* Amount Display */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-6xl font-bold">
          <span className="text-3xl">Rp</span>{Number(amount).toLocaleString('id-ID')}
        </p>
        <p className="text-gray-400 text-sm">Tap to enter amount</p>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {["1","2","3","4","5","6","7","8","9"].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-14 text-xl rounded-2xl"
            onClick={() => handleNumber(num)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="h-14 text-xl rounded-2xl"
          onClick={() => handleNumber("0")}
        >
          0
        </Button>
        <Button
          variant="default"
          className="h-14 rounded-2xl bg-gray-800 col-start-3"
          onClick={handleDelete}
        >
          <Delete size={20} className="text-white" />
        </Button>
      </div>

    </div>
  )
}



















