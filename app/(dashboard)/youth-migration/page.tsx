"use client"

import type React from "react"
import { useState, useEffect, useTransition } from "react"
import type { YouthMigration } from "@/lib/data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { DataImportDialog } from "@/components/data-import-dialog"
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
import { CanEditWrapper } from "@/components/can-edit-wrapper"

export default function YouthMigrationPage() {
  const [data, setData] = useState<YouthMigration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    year: "",
    total: "",
    male: "",
    female: "",
    origin: "",
    destination: "",
  })
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()
  const { trackActivity } = useActivity()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] Youth Migration: Supabase client not available")
        setIsLoading(false)
        return
      }

      const { data: migrationData, error } = await supabase
        .from("youth_migration")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching youth migration data:", error)
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: error.message,
        })
      } else if (migrationData) {
        const mappedData: YouthMigration[] = migrationData.map((item) => ({
          id: item.id.toString(),
          year: item.year,
          total: item.total,
          male: item.male,
          female: item.female,
          origin: item.origin,
          destination: item.destination,
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

  const handleEdit = (item: YouthMigration) => {
    setEditingId(item.id)
    setFormData({
      year: item.year,
      total: item.total.toString(),
      male: item.male.toString(),
      female: item.female.toString(),
      origin: item.origin,
      destination: item.destination,
    })
    setOpen(true)
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
      const { error } = await supabase.from("youth_migration").delete().eq("id", deleteId)

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
          .from("youth_migration")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: YouthMigration[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            year: item.year,
            total: item.total,
            male: item.male,
            female: item.female,
            origin: item.origin,
            destination: item.destination,
          }))
          setData(mappedData)
        }

        trackActivity("Delete", "Youth Migration", `Deleted migration entry`)
        router.refresh()
      }

      setDeleteDialogOpen(false)
      setDeleteId(null)
    })
  }

  const handleBulkDelete = async (selectedRows: YouthMigration[]) => {
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

      const { error } = await supabase.from("youth_migration").delete().in("id", ids)

      if (error) throw error

      const { data: refreshedData } = await supabase
        .from("youth_migration")
        .select("*")
        .order("id", { ascending: true })

      if (refreshedData) {
        const mappedData: YouthMigration[] = refreshedData.map((item) => ({
          id: item.id.toString(),
          year: item.year,
          total: item.total,
          male: item.male,
          female: item.female,
          origin: item.origin,
          destination: item.destination,
        }))
        setData(mappedData)
      }

      toast({
        title: "Success",
        description: `Successfully deleted ${ids.length} record(s)`,
      })

      trackActivity("Delete", "Youth Migration", `Bulk deleted ${ids.length} entries`)
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

    const entryData = {
      year: formData.year,
      total: Number.parseInt(formData.total),
      male: Number.parseInt(formData.male),
      female: Number.parseInt(formData.female),
      origin: formData.origin,
      destination: formData.destination,
    }

    startTransition(async () => {
      if (editingId) {
        const { error } = await supabase.from("youth_migration").update(entryData).eq("id", editingId)

        if (error) {
          toast({
            variant: "destructive",
            title: "Error updating data",
            description: error.message,
          })
        } else {
          toast({
            title: "Success",
            description: `Successfully updated migration from ${formData.origin} to ${formData.destination}`,
          })

          const { data: refreshedData } = await supabase
            .from("youth_migration")
            .select("*")
            .order("id", { ascending: true })

          if (refreshedData) {
            const mappedData: YouthMigration[] = refreshedData.map((item) => ({
              id: item.id.toString(),
              year: item.year,
              total: item.total,
              male: item.male,
              female: item.female,
              origin: item.origin,
              destination: item.destination,
            }))
            setData(mappedData)
          }

          trackActivity(
            "Edit",
            "Youth Migration",
            `Updated entry for migration from ${formData.origin} to ${formData.destination}`,
          )
        }
      } else {
        const { error } = await supabase.from("youth_migration").insert([entryData])

        if (error) {
          toast({
            variant: "destructive",
            title: "Error inserting data",
            description: error.message,
          })
        } else {
          toast({
            title: "Success",
            description: `Successfully added migration from ${formData.origin} to ${formData.destination}`,
          })

          const { data: refreshedData } = await supabase
            .from("youth_migration")
            .select("*")
            .order("id", { ascending: true })

          if (refreshedData) {
            const mappedData: YouthMigration[] = refreshedData.map((item) => ({
              id: item.id.toString(),
              year: item.year,
              total: item.total,
              male: item.male,
              female: item.female,
              origin: item.origin,
              destination: item.destination,
            }))
            setData(mappedData)
          }

          trackActivity(
            "Add",
            "Youth Migration",
            `Added new entry for migration from ${formData.origin} to ${formData.destination}`,
          )
        }
      }

      setOpen(false)
      setEditingId(null)
      setFormData({
        year: "",
        total: "",
        male: "",
        female: "",
        origin: "",
        destination: "",
      })
      router.refresh()
    })
  }

  const columns: ColumnDef<YouthMigration>[] = [
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
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <CanEditWrapper>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(row.original)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDeleteId(row.original.id)
                setDeleteDialogOpen(true)
              }}
            >
              <Trash2 className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </CanEditWrapper>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading youth migration data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youth Migration Data</h1>
        <div className="flex gap-2">
          <DataImportDialog tableName="youth_migration" />
          <CanEditWrapper>
            <Dialog
              open={open}
              onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (!isOpen) {
                  setEditingId(null)
                  setFormData({
                    year: "",
                    total: "",
                    male: "",
                    female: "",
                    origin: "",
                    destination: "",
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
                    <DialogTitle>{editingId ? "Edit" : "Add New"} Youth Migration Entry</DialogTitle>
                    <DialogDescription>Fill in the details for the youth migration entry.</DialogDescription>
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
                        <Label htmlFor="origin">Origin</Label>
                        <Input
                          id="origin"
                          name="origin"
                          value={formData.origin}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          name="destination"
                          value={formData.destination}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the migration entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable
        columns={columns}
        data={data}
        searchKey="origin"
        filename="youth-migration-data"
        enableRowSelection={true}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  )
}
