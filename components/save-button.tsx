"use client"

import {Button} from "@/components/ui/button"
import {api} from "@/lib/api"
import {useRouter} from "next/navigation"

export default function SaveButton({
    amount,
    type,
    category,
    date,
    note,
    recurring
}: any) {

    const router = useRouter()

  const handleSave = async () => {
    try {
      await api("/transactions", {
        method: "POST",
        body: JSON.stringify({
        amount: Number(amount),
        transaction_type: type,
        category_id: category,
        date,
        notes: note,
        is_recurring: recurring,
      }),
    })

    alert("Transaction berhasil ditambahkan")

    router.push("/dashboard")

  } catch (err) {
    console.error(err)
    alert("Gagal menyimpan transaksi")
  }
}
return(

    <div className="p-4">
        <Button className="w-full rounded-full bg-gray-900 text-white py-6 text-base font-semibold"
        onClick={handleSave}>
            Confirm & Save
        </Button>
    </div>
)
}

