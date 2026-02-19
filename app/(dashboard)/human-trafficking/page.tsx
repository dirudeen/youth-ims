"use client"

import type React from "react"
import { useState, useEffect, useTransition } from "react"
import type { HumanTrafficking } from "@/lib/data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { DataImportDialog } from "@/components/data-import-dialog"
import { CanEditWrapper } from "@/components/can-edit-wrapper"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ColumnDef } from "@tanstack/react-table"
import { useActivity } from "@/contexts/activity-context"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function HumanTraffickingPage() {
  const [data, setData] = useState<HumanTrafficking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    year: "",
    total: "",
    male: "",
    female: "",
    ageGroup: "",
    lga: "",
  })
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()
  const { trackActivity } = useActivity()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] Human Trafficking: Supabase client not available")
        setIsLoading(false)
        return
      }

      const { data: traffickingData, error } = await supabase
        .from("human_trafficking")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching human trafficking data:", error)
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: error.message,
        })
      } else if (traffickingData) {
        const mappedData: HumanTrafficking[] = traffickingData.map((item) => ({
          id: item.id.toString(),
          year: item.year,
          total: item.total,
          male: item.male,
          female: item.female,
          ageGroup: item.age_group || item.ageGroup,
          lga: item.lga,
        }))
        setData(mappedData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (item: HumanTrafficking) => {
    setEditingId(item.id)
    setFormData({
      year: item.year,
      total: item.total.toString(),
      male: item.male.toString(),
      female: item.female.toString(),
      ageGroup: item.ageGroup,
      lga: item.lga,
    })
    setOpen(true)
    trackActivity("View", "Human Trafficking", `Opened form to edit entry for ${item.year} in ${item.lga}`)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    const supabase = createClient()
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database connection not available",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const { error } = await supabase.from("human_trafficking").delete().eq("id", deleteId)

      if (error) {
        toast({
          variant: "destructive",
          title: "Error deleting entry",
          description: error.message,
        })
      } else {
        toast({
          title: "Success",
          description: "Entry deleted successfully",
        })

        const { data: refreshedData } = await supabase
          .from("human_trafficking")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: HumanTrafficking[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            year: item.year,
            total: item.total,
            male: item.male,
            female: item.female,
            ageGroup: item.age_group || item.ageGroup,
            lga: item.lga,
          }))
          setData(mappedData)
        }

        trackActivity("Delete", "Human Trafficking", `Deleted entry`)
        router.refresh()
      }
      setDeleteId(null)
    })
  }

  const handleBulkDelete = async (selectedRows: HumanTrafficking[]) => {
    const supabase = createClient()
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database connection not available",
        variant: "destructive",
      })
      return
    }

    try {
      const ids = selectedRows.map((row) => row.id)

      const { error } = await supabase.from("human_trafficking").delete().in("id", ids)

      if (error) throw error

      const { data: refreshedData } = await supabase
        .from("human_trafficking")
        .select("*")
        .order("id", { ascending: true })

      if (refreshedData) {
        const mappedData: HumanTrafficking[] = refreshedData.map((item) => ({
          id: item.id.toString(),
          year: item.year,
          total: item.total,
          male: item.male,
          female: item.female,
          ageGroup: item.age_group || item.ageGroup,
          lga: item.lga,
        }))
        setData(mappedData)
      }

      toast({
        title: "Success",
        description: `Successfully deleted ${ids.length} record(s)`,
      })

      trackActivity("Delete", "Human Trafficking", `Bulk deleted ${ids.length} entries`)
      router.refresh()
    } catch (error) {
      console.error("Error deleting records:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete records",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (!supabase) {
      toast({
        title: "Error",
        description: "Database connection not available",
        variant: "destructive",
      })
      return
    }

    const entry = {
      year: formData.year,
      total: Number.parseInt(formData.total),
      male: Number.parseInt(formData.male),
      female: Number.parseInt(formData.female),
      age_group: formData.ageGroup,
      lga: formData.lga,
    }

    startTransition(async () => {
      let error

      if (editingId) {
        const result = await supabase.from("human_trafficking").update(entry).eq("id", editingId)
        error = result.error
      } else {
        const result = await supabase.from("human_trafficking").insert([entry])
        error = result.error
      }

      if (error) {
        toast({
          variant: "destructive",
          title: editingId ? "Error updating entry" : "Error inserting data",
          description: error.message,
        })
      } else {
        toast({
          title: "Success",
          description: editingId
            ? `Successfully updated entry for year ${formData.year} in ${formData.lga}`
            : `Successfully added new entry for year ${formData.year} in ${formData.lga}`,
        })

        const { data: refreshedData } = await supabase
          .from("human_trafficking")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: HumanTrafficking[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            year: item.year,
            total: item.total,
            male: item.male,
            female: item.female,
            ageGroup: item.age_group || item.ageGroup,
            lga: item.lga,
          }))
          setData(mappedData)
        }
      }

      setOpen(false)
      setEditingId(null)
      setFormData({
        year: "",
        total: "",
        male: "",
        female: "",
        ageGroup: "",
        lga: "",
      })

      trackActivity(
        editingId ? "Edit" : "Add",
        "Human Trafficking",
        `${editingId ? "Updated" : "Added new"} entry for year ${formData.year} in ${formData.lga}`,
      )
      router.refresh()
    })
  }

  const columns: ColumnDef<HumanTrafficking>[] = [
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "male",
      header: "Male",
    },
    {
      accessorKey: "female",
      header: "Female",
    },
    {
      accessorKey: "ageGroup",
      header: "Age Group",
    },
    {
      accessorKey: "lga",
      header: "LGA",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original
        return (
          <CanEditWrapper>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} title="Edit">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteId(item.id)}
                title="Delete"
                className="text-blue-600 hover:text-blue-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CanEditWrapper>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading human trafficking data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Human Trafficking Victims Data</h1>
        <div className="flex gap-2">
          <DataImportDialog tableName="human_trafficking" />
          <CanEditWrapper>
            <Dialog
              open={open}
              onOpenChange={(newOpen) => {
                setOpen(newOpen)
                if (!newOpen) {
                  setEditingId(null)
                  setFormData({
                    year: "",
                    total: "",
                    male: "",
                    female: "",
                    ageGroup: "",
                    lga: "",
                  })
                }
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>{editingId ? "Edit" : "Add New"} Human Trafficking Entry</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the {editingId ? "updated" : "new"} human trafficking victims entry.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" name="year" value={formData.year} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total">Total</Label>
                        <Input
                          id="total"
                          name="total"
                          type="number"
                          value={formData.total}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="male">Male</Label>
                        <Input
                          id="male"
                          name="male"
                          type="number"
                          value={formData.male}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="female">Female</Label>
                        <Input
                          id="female"
                          name="female"
                          type="number"
                          value={formData.female}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ageGroup">Age Group</Label>
                        <Input
                          id="ageGroup"
                          name="ageGroup"
                          value={formData.ageGroup}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lga">LGA</Label>
                        <Input id="lga" name="lga" value={formData.lga} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Saving..." : editingId ? "Update Entry" : "Save Entry"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CanEditWrapper>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchKey="lga"
        filename="human-trafficking-data"
        enableRowSelection={true}
        onBulkDelete={handleBulkDelete}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this entry from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-blue-600 hover:bg-blue-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
