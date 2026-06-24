"use client"
import Link from "next/link"
import { House, LayoutGrid, Plus, ReceiptText, User } from "lucide-react"
import { Button } from "./ui/button"
export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0  bg-[#0a2a1a] flex items-center justify-around p-4 rounded-xl">
      
      <Link href="/dashboard">
        <div className="flex items-center text-white">
          <Button className="bg-[#0a2a1a]">            
              <House size={15} />
              <span className="text-xs">Home</span>
          </Button>
        </div>
      </Link>      

      <Link href="/category">
        <div className="flex items-center text-white">
          <Button className="bg-[#0a2a1a]">            
              <LayoutGrid size={15} />
              <span className="text-xs">Category</span>
          </Button>
        </div>        
      </Link>
    

      <Link href="/transaction">
        <div className="flex items-center -mt-6">
          <div className="bg-[#0a2a1a] rounded-full">
              <Button className="bg-green-500 rounded-full py-7 px-5">   
                  <Plus size={20} className="text-white" />
              </Button>
          </div>
        </div>
      </Link>

      <Link href="/data-row">
        <div className="flex items-center text-white">
          <Button className="bg-[#0a2a1a]">
              <ReceiptText size={15} />
              <span className="text-xs">Recurring</span>
          </Button>
        </div>
      </Link>

      <Link href="/accounts">
        <div className="flex items-center text-white">
          <Button className="bg-[#0a2a1a]">            
              <User size={15} />
              <span className="text-xs">Account</span>
          </Button>
        </div>
      </Link>

    </div>
  )
}