import {Card , CardContent} from "@/components/ui/card"
export default function Net () {
    return(
        <div className="mt-3">
            <Card className="bg-[#0a2a1a] text-white p-0">
                <div className="flex items-center justify-between p-4">
                    <CardContent className="p-0">
                        <p className="text-green-400 text-sm font-semibold">NET CASHFLOW</p>
                        <p className="text-3xl font-bold">+$4,120</p>
                    </CardContent>

                    <div className="bg-green-500 rounded-full p-3 shrink-0">
                        <p>📈</p>
                    </div>
                </div>
            </Card> 
        </div>
    )
}
