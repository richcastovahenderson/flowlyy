"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const router = useRouter()
  const handleDelete =() => {
    if (confirm("Are you sure you want to delete your account")){
        router.push("/")
    }
  }
  const signOut =() => {
    if (confirm("Are you sure want to sign out?")){
        router.push("/")
    }
  }

  return (
   <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 py-2">
        <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RH</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">Rich</p>
          <p className="text-sm text-muted-foreground">Ahau@gmail.com</p>
        </div>
        <button className="ml-auto text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5">
          Edit
        </button>
      </div>


      {/* Account */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 px-1">Account</p>
        <div className="bg-background rounded-2xl border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-base">💼</div>
              <div>
                <p className="text-sm font-medium">Currency</p>
                <p className="text-xs text-muted-foreground">Display currency</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              USD <ChevronRight size={14} />
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-base">🔔</div>
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Payment reminders</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 px-1">Security</p>
        <div className="bg-background rounded-2xl border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-base">🔒</div>
              <div>
                <p className="text-sm font-medium">Change Password</p>
                <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
              </div>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Support */}
    <div>
        <p className="text-xs text-muted-foreground mb-2 px-1">Support</p>
        <div className="bg-background rounded-2xl border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-base">💬</div>
                <p className="text-sm font-medium">Contact Us</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center text-base">⭐</div>
                <p className="text-sm font-medium">Rate the App</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
            </div>
        </div>
    </div>

      {/* Data */}
      <div className="mt-5 mb-5" onClick={handleDelete}>
        <p className="text-xs text-muted-foreground mb-2 px-1">Data</p>
        <div className="bg-background rounded-2xl border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-base">🗑️</div>
              <p className="text-sm font-medium text-red-500">Delete Account</p>
            </div>
            <ChevronRight size={14} className="text-red-400" />
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <button className="w-full bg-gray-900 text-white rounded-2xl py-4 text-sm font-semibold" onClick={signOut}>
        Sign Out
      </button>

      <p className="text-center text-xs text-gray-400 mt-5">Version 1.0.0</p>

    </div>
  )
}