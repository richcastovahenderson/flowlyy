"use client"
import SaveButton from "@/components/save-button"
import { ShoppingBag } from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { FileText } from "lucide-react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react"
import { useState, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Header from "@/components/header"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"

export default function Transaction(){
  const [amount, setAmount] = useState("0")
  const [type, setType] = useState("expense")

  const [category, setCategory] = useState<number | null>(null)
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<number[]>([])
  const [categoryName, setCategoryName] = useState("")
  
  const [note, setNote] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await api("/categories")
      setCategories(data)
    } catch (err) {
      console.error(err)
      alert("Failed to load categories")
    }
  }

  const handleNumber = (num: string) => {
    if (amount === "0") {
      setAmount(num)
    } else {
      setAmount(amount + num)
    }
  }

  const handleDelete = () => {
    if (amount.length === 1) {
        setAmount("0")
    } else {
        setAmount(amount.slice(0, -1))
    }
  }

  return (
    <div className="p-4">
      <Header title="Add Transaction" url="/dashboard" />
      
      {/* Amount Input Calculator */}
      <div className="flex flex-col items-center p-6 gap-6">
        {/* Tabs for Expense and Income */}
        <div className="flex rounded-full">
          <div className="flex w-75 rounded-full bg-gray-200 p-2">
              <button
                  onClick={() => setType("expense")}
                  className={`w-full rounded-full p-2 text-sm font-semibold text-center ${type === "expense" ? "bg-red-600 text-white" : "text-gray-400"}`}
                  >
                      Expense
              </button>

              <button
                  onClick={() => setType("income")}
                  className={`w-full rounded-full p-2 text-sm font-semibold text-center ${type === "income" ? "bg-green-600 text-white" : "text-gray-400"}`}
              >
                  Income
              </button>
          </div>
        </div>

        {/* Amount Display */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-6xl font-bold">
            <span className="text-3xl">Rp</span>{Number(amount).toLocaleString('id-ID')}
          </p>
          <p className="text-gray-400 text-sm">Tap to enter amount</p>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {["1","2","3","4","5","6","7","8","9"].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-14 text-xl rounded-2xl"
              onClick={() => handleNumber(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-14 text-xl rounded-2xl"
            onClick={() => handleNumber("0")}
          >
            0
          </Button>
          <Button
            variant="default"
            className="h-14 rounded-2xl bg-gray-800 col-start-3"
            onClick={handleDelete}
          >
            <Delete size={20} className="text-white" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-4">

          <div className="flex items-center gap-3">
            <ShoppingBag className="text-yellow-500" size={20} />
            <p className="text-gray-500">Category</p>
          </div>

       
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-1 text-gray-400 cursor-pointer">
                <p className="text-sm">{categoryName || "Select Category"}</p>
                <ChevronRight size={14} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <Command>
                <CommandInput
                  placeholder="Search or add..."
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((cat: any) => (
                      <CommandItem
                        key={cat.id}
                        onSelect={() => {
                          setCategory(cat.id)
                          setCategoryName(`${cat.icon} ${cat.name}`)
                          setOpen(false)
                        }}
                      >
                        {cat.icon} {cat.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

      
        <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-4">

          <div className="flex items-center gap-3">
            <CalendarIcon className="text-blue-500" size={20} />
            <p className="text-gray-500">Date</p>
          
          </div>

          <div className="flex items-center gap-1 text-gray-400">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm text-gray-500 bg-transparent outline-none cursor-pointer"
              />
          </div>

        </div>

    
        <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-purple-400" size={20} />
            <p className="text-gray-500">Notes (optional)</p>
          </div>

          <Input
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-50 text-right border-none bg-transparent text-gray-400 text-sm p-0"
          />
        </div>

     
        <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-4">

          <div className="flex items-center gap-3">
            <RefreshCw className="text-blue-400" size={20} />
            <p className="text-gray-500">Recurring</p>
          </div>

          <Switch
            checked={recurring}
            onCheckedChange={setRecurring}
            className="scale-150"
          />
        </div>
      </div>
 
     <SaveButton
        amount={amount}
        type={type}
        category={category}
        date={date}
        note={note}
        recurring={recurring}
      />

    
    </div>
    
  )
}