"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ChevronRight } from "lucide-react"
import { ShoppingBag, Calendar as CalendarIcon, FileText, RefreshCw } from "lucide-react"


export default function TransactionForm() {
  const [recurring, setRecurring] = useState(false)
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("Add Something Here")
  const [categories, setCategories] = useState([
    ""
  ])
  const [inputValue, setInputValue] = useState("")
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
    );

  return (
    <div className="flex flex-col gap-3 p-4">

      
      <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-4">

        <div className="flex items-center gap-3">
          <ShoppingBag className="text-yellow-500" size={20} />
          <p className="text-gray-500">Category</p>
        </div>

       
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1 text-gray-400 cursor-pointer">
              <p className="text-sm">{category}</p>
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
                <CommandEmpty>
                  <button
                    className="text-sm text-blue-500 bg-amber-100 rounded-md px-2"
                    onClick={() => {
                      if (inputValue) {
                        setCategories([...categories, inputValue])
                        setCategory(inputValue)
                        setInputValue("")
                        setOpen(false)
                      }
                    }}
                  >
                    + Add "{inputValue}"
                  </button>
                </CommandEmpty>
                <CommandGroup>
                  {categories.map((cat) => (
                    <CommandItem
                      key={cat}
                      onSelect={() => {
                        setCategory(cat)
                        setOpen(false)
                      }}
                    >
                      {cat}
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
  )
}