import { Card } from "@/components/ui/card";
import { Home , Wifi , Zap } from "lucide-react";
export default function Bills() {   
    
 return(

    <div className="p-4">
        
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-400 font-bold text-lg">Recurring</h2>
            <span className="text-gray-400 text-sm">See all</span>
        </div>

        <div className="text-gray-600 font-bold text-lg mb-4">
            <h2>AUTOMATIC PAYMENTS & INCOME</h2>
        </div>

        <Card className="bg-[#1a2e1a] border border-green-300 mb-3">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0a2a1a] p-3 rounded-xl">
                            <Home size={20} className="text-green-500" />
                    </div>
                    <div>
                            <p className="text-white font-semibold">Monthly Rent</p>
                            <p className="text-gray-400 text-xs">Due in 3 days</p>
                    </div>
                </div>
                        <p className="text-white font-semibold">-$2,200</p>
            </div>
        </Card>

        <Card className="bg-[#1a2e1a] border border-green-300 mb-3">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0a2a1a] p-3 rounded-xl">
                            <Wifi size={20} className="text-green-500" />
                    </div>
                    <div>
                            <p className="text-white font-semibold">Fiber Network</p>
                            <p className="text-gray-400 text-xs">Due in 10 days</p>
                    </div>
                </div>
                        <p className="text-white font-semibold">-$85</p>
            </div>
        </Card>

        <Card className="bg-[#1a2e1a] border border-green-300 mb-3">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0a2a1a] p-3 rounded-xl">
                            <Zap size={20} className="text-green-500" />
                    </div>
                    
                    <div>
                            <p className="text-white font-semibold">Monthly Rent</p>
                            <p className="text-gray-400 text-xs">Due in 11 days</p>
                    </div>
                </div>
                        <p className="text-white font-semibold">-$142</p>
            </div>
        </Card>
    </div>
 )   
}