"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"
import { useState, useEffect, useTransition } from "react"
import type { YouthWithoutDisabilities } from "@/lib/data"
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
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const trackActivity = (action: string, category: string, description: string) => {
  console.log(`Action: ${action}, Category: ${category}, Description: ${description}`)
}

export default function YouthWithoutDisabilitiesPage() {
  const [data, setData] = useState<YouthWithoutDisabilities[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    ageGroup: "",
    total: "",
    male: "",
    female: "",
    urban: "",
    rural: "",
  })
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] Youth without Disabilities: Supabase client not available")
        setIsLoading(false)
        return
      }

      const { data: withoutDisabilitiesData, error } = await supabase
        .from("youth_without_disabilities")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching youth without disabilities data:", error)
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: error.message,
        })
      } else if (withoutDisabilitiesData) {
        const mappedData: YouthWithoutDisabilities[] = withoutDisabilitiesData.map((item) => ({
          id: item.id.toString(),
          ageGroup: item.age_group,
          total: item.total,
          male: item.male,
          female: item.female,
          urban: item.urban,
          rural: item.rural,
        }))
        setData(mappedData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [toast])

  const handleEdit = (item: YouthWithoutDisabilities) => {
    setEditingId(item.id)
    setFormData({
      ageGroup: item.ageGroup,
      total: item.total.toString(),
      male: item.male.toString(),
      female: item.female.toString(),
      urban: item.urban.toString(),
      rural: item.rural.toString(),
    })
    setOpen(true)
    trackActivity("View", "Youth without Disabilities", `Opened form to edit entry for ${item.ageGroup}`)
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
      const { error } = await supabase.from("youth_without_disabilities").delete().eq("id", deleteId)

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
          .from("youth_without_disabilities")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: YouthWithoutDisabilities[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            ageGroup: item.age_group,
            total: item.total,
            male: item.male,
            female: item.female,
            urban: item.urban,
            rural: item.rural,
          }))
          setData(mappedData)
        }

        trackActivity("Delete", "Youth without Disabilities", `Deleted entry`)
        router.refresh()
      }
      setDeleteId(null)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      age_group: formData.ageGroup,
      total: Number.parseInt(formData.total),
      male: Number.parseInt(formData.male),
      female: Number.parseInt(formData.female),
      urban: Number.parseInt(formData.urban),
      rural: Number.parseInt(formData.rural),
    }

    startTransition(async () => {
      let error

      if (editingId) {
        const result = await supabase.from("youth_without_disabilities").update(entry).eq("id", editingId)
        error = result.error
      } else {
        const result = await supabase.from("youth_without_disabilities").insert([entry])
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
            ? `Successfully updated entry for age group ${formData.ageGroup}`
            : `Successfully added entry for age group ${formData.ageGroup}`,
        })

        const { data: refreshedData } = await supabase
          .from("youth_without_disabilities")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: YouthWithoutDisabilities[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            ageGroup: item.age_group,
            total: item.total,
            male: item.male,
            female: item.female,
            urban: item.urban,
            rural: item.rural,
          }))
          setData(mappedData)
        }
      }

      setOpen(false)
      setEditingId(null)
      setFormData({
        ageGroup: "",
        total: "",
        male: "",
        female: "",
        urban: "",
        rural: "",
      })

      trackActivity(
        editingId ? "Edit" : "Add",
        "Youth without Disabilities",
        `${editingId ? "Updated" : "Added new"} entry for age group ${formData.ageGroup}`,
      )
      router.refresh()
    })
  }

  const handleBulkDelete = async (selectedRows: YouthWithoutDisabilities[]) => {
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

      const { error } = await supabase.from("youth_without_disabilities").delete().in("id", ids)

      if (error) throw error

      const { data: refreshedData } = await supabase
        .from("youth_without_disabilities")
        .select("*")
        .order("id", { ascending: true })

      if (refreshedData) {
        const mappedData: YouthWithoutDisabilities[] = refreshedData.map((item) => ({
          id: item.id.toString(),
          ageGroup: item.age_group,
          total: item.total,
          male: item.male,
          female: item.female,
          urban: item.urban,
          rural: item.rural,
        }))
        setData(mappedData)
      }

      toast({
        title: "Success",
        description: `Successfully deleted ${ids.length} record(s)`,
      })

      trackActivity("Delete", "Youth without Disabilities", `Bulk deleted ${ids.length} entries`)
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

  const columns: ColumnDef<YouthWithoutDisabilities>[] = [
    {
      accessorKey: "ageGroup",
      header: "Age Group",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("total"))
      },
    },
    {
      accessorKey: "male",
      header: "Male",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("male"))
      },
    },
    {
      accessorKey: "female",
      header: "Female",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("female"))
      },
    },
    {
      accessorKey: "urban",
      header: "Urban",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("urban"))
      },
    },
    {
      accessorKey: "rural",
      header: "Rural",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("rural"))
      },
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
            <p className="text-gray-600">Loading youth without disabilities data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youth Without Disabilities Data</h1>
        <div className="flex gap-2">
          <DataImportDialog tableName="youth_without_disabilities" />
          <CanEditWrapper>
            <Dialog
              open={open}
              onOpenChange={(newOpen) => {
                setOpen(newOpen)
                if (!newOpen) {
                  setEditingId(null)
                  setFormData({
                    ageGroup: "",
                    total: "",
                    male: "",
                    female: "",
                    urban: "",
                    rural: "",
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
                    <DialogTitle>{editingId ? "Edit" : "Add New"} Youth Without Disabilities Entry</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the {editingId ? "updated" : "new"} youth without disabilities entry.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="urban">Urban</Label>
                        <Input
                          id="urban"
                          name="urban"
                          type="number"
                          value={formData.urban}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rural">Rural</Label>
                        <Input
                          id="rural"
                          name="rural"
                          type="number"
                          value={formData.rural}
                          onChange={handleInputChange}
                          required
                        />
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
        searchKey="ageGroup"
        filename="youth-without-disabilities-data"
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
