"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Category() {
  const [selected, setSelected] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")

  return (
    <div className="p-4">
      <Header title="Categories" url="/dashboard" />

      <div className="grid grid-cols-3">

        {categories.map((c) => (
          <div
            key={c}
            onClick={() => setSelected(c)}
            className={`border rounded-xl p-4 cursor-pointer text-center ${
              selected === c
                ? "border-green-500 text-black"
                : "bg-white"
            }`}
          >
            <p>{c}</p>
          </div>
        ))}

      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-32 h-10 bg-red-600">
             +
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Enter a name for the new category
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  if (newCategory.trim() === "") return

                  setCategories([...categories, newCategory])
                  setNewCategory("")
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

        
      </div>

      

     
    </div>
  )
}