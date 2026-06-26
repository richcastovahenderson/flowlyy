"use client"

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
import { api } from "@/lib/api"
import { useState, useEffect } from "react"

export default function Category() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [newCategory, setNewCategory] = useState("")
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

  const handleDelete = async () => {
    if (!selectedId) return
    const confirmDelete = confirm("Are you sure you want to delete this category?")
    if (!confirmDelete) return

    try {
      await api(`/categories/${selectedId}`, {
        method: "DELETE",
      })
      setSelectedId(null)
      loadCategories()
    } catch (err) {
      console.error(err)
      alert("Failed to delete category")
    }
  }

  return (
    <div className="p-4">
      <Header title="Categories" url="/dashboard" />

      <div className="grid grid-cols-3">

        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`border rounded-xl p-4 cursor-pointer text-center ${
              selectedId === c.id
                ? "border-green-500 text-black"
                : "bg-white"
            }`}
          >
            <p>{c.icon} {c.name}</p>
          </div>
        ))}

      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-32 h-10 bg-white">
             +
            </Button>
          </DialogTrigger>

          
            {selectedId && (

              <Button
              variant="destructive"
              className="w-32 h-10 bg-white"
              onClick={handleDelete}
              >
                Delete
              </Button>
              )}
          

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
                onClick={async (e) => {
                  e.preventDefault()
                  if (newCategory.trim() === "") return

                  try {
                     await api("/categories", {
                      method: "POST",
                      body: JSON.stringify(({
                        name: newCategory,
                        icon: "📁", // Default icon, you can change this as needed
                      })),
                    })
                    setNewCategory("")
                    loadCategories()
                  } catch (err) {
                    console.error(err)
                    alert("Failed to add category")
                  }
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