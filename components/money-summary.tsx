import {Card , CardContent} from "@/components/ui/card"
export default function Money() {
    return(
        <div className="flex gap-3 flex justify-between">
            <Card className="w-50 h-20 bg-[#2B2B45]">
                <CardContent>
                    <p className="text-gray-400">Money IN</p>
                </CardContent>
            </Card>

            <Card className="w-50 h-20 bg-[#2B2B45]">
                <CardContent>
                    <p className="text-gray-400 font-bold">Money OUT</p>
                </CardContent>
            </Card>
        </div>
    )
}