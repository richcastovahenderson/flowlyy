"use client"

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import { api } from "@/lib/api"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [dashboard, setDashboard] = useState({
        money_in: "0",
        money_out: "0",
        net_cashflow: "0",
        health_status: "",
        upcoming: [],
    })
    
    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            const data = await api("/dashboard")
            setDashboard(data)
        } catch (err) {
            console.error(err)
        }
    }

    const getHour = (): string => {
        const hour = new Date().getHours()
        const period = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

        return period
    }

    const getMonth = (): string => {
        const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const currentMonth = new Date().getMonth()

        return months[currentMonth] + " " + new Date().getFullYear()
    }

    return (
        <div className="w-[90%] mx-auto py-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Good { getHour() }, Rich</h3>
                    <p className="text-sm text-slate-500">{ getMonth() }</p>
                </div>

                <Avatar size="lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RH</AvatarFallback>
                </Avatar>
            </div>

            <div className="grid grid-cols-2 gap-x-4 mb-4">
                <Card className="bg-[#F7F5F1]">
                    <CardContent>
                        <p className="mb-2">MONEY IN</p>
                        <h4 className="text-[#4CAF82] text-xl font-semibold">Rp. {Number(dashboard.money_in).toLocaleString()}</h4>
                    </CardContent>
                </Card>

                <Card className="bg-[#F7F5F1]">
                    <CardContent>
                        <p className="mb-2">MONEY OUT</p>
                        <h4 className="text-[#E07070] text-xl font-semibold">Rp. {Number(dashboard.money_out).toLocaleString()}</h4>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card className="bg-[#2C2E35]">
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 mb-2 font-semibold">NET CASHFLOW</p>
                                <h3 className="text-white text-3xl font-semibold mb-2">+Rp. {Number(dashboard.net_cashflow).toLocaleString()}</h3>
                                <p className="text-gray-500 font-semibold">up 12% vs last month</p>
                            </div>

                            <div className="bg-green-400/10 text-green-500 w-fit rounded-full px-3 font-semibold">
                                {dashboard.health_status}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="">
                <div className="flex justify-between items-center mt-6 mb-4">
                    <h3 className="text-lg">Upcoming</h3>
                    <Link href="/" className="text-slate-400">See all</Link>
                </div>

                {
                    dashboard.upcoming.map((b: any) => (
                        <div key={b.id}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>{ b.name}</p>
                                    <p className="text-xs text-slate-400">Expected { b.next_date }</p>
                                </div>
                                <p>Rp. { Number(b.amount).toLocaleString() }</p>
                            </div>

                            <hr className="my-2"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}