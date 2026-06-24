import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
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
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold">Good { getHour() }, Rich</h3>
        <p className="text-sm text-slate-500">{ getMonth() }</p>
      </div>

      <Avatar size="lg">
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>RH</AvatarFallback>
      </Avatar>
    </div>
  )
}