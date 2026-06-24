"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function Header({ 
  title,
  url
 }: {
  title: string,
  url: string
 }) {
  const router = useRouter()

  return (
    <div className="flex items-center p-4">
      <Button onClick={() => router.push(`${ url }`)} className="rounded-full bg-gray-300">
        <ArrowLeft size={20} className="text-black"/>
      </Button>
      <h1 className="flex-1 text-center font-bold text-xl">{ title }</h1>
    </div>
  )
}