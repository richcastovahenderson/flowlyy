
"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || "Login gagal")
      return
    }

    localStorage.setItem("token", data.token)

    alert("Login berhasil")
    router.push("/dashboard")
  } catch (err) {
    console.error(err)
    alert(String(err))
  }
}
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center">


      <h1 className="text-4xl font-bold text-green-700 mt-3">
        Flowly
      </h1>

      <p className="text-gray-500 mb-6">
        Smart Personal Finance
      </p>

      {/* Login Card */}
      <Card className="w-[400px] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>
            Masukkan email dan password kamu
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-green-700 hover:bg-green-800"
            onClick={handleLogin}
          >
            Masuk
          </Button>
        </CardContent>
      </Card>

    </div>
  </div>
  )
}