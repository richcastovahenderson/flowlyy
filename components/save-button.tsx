"use client"

import {Button} from "@/components/ui/button"

export default function SaveButton({
    amount,
    type,
    category,
    date,
    note,
    recurring
}: any) {

    const handleSave = () => {
        alert(
            JSON.stringify({    
                amount,
                type,
                category,
                date,
                note,
                recurring
            })
        )
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

