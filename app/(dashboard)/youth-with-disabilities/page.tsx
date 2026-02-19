"use client"

import type React from "react"
import { useState, useEffect, useTransition } from "react"
import type { YouthWithDisabilities } from "@/lib/data"
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

export default function YouthWithDisabilitiesPage() {
  const [data, setData] = useState<YouthWithDisabilities[]>([])
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
    seeing: "",
    hearing: "",
    physical: "",
    learning: "",
    selfcare: "",
    speech: "",
  })
  const { trackActivity } = useActivity()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] Youth with Disabilities: Supabase client not available")
        setIsLoading(false)
        return
      }

      const { data: disabilitiesData, error } = await supabase
        .from("youth_with_disabilities")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching youth with disabilities data:", error)
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: error.message,
        })
      } else if (disabilitiesData) {
        const mappedData: YouthWithDisabilities[] = disabilitiesData.map((item) => ({
          id: item.id.toString(),
          ageGroup: item.age_group,
          total: item.total,
          male: item.male,
          female: item.female,
          urban: item.urban,
          rural: item.rural,
          seeing: item.seeing,
          hearing: item.hearing,
          physical: item.physical,
          learning: item.learning,
          selfcare: item.selfcare,
          speech: item.speech,
        }))
        setData(mappedData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [toast])

  const handleEdit = (item: YouthWithDisabilities) => {
    setEditingId(item.id)
    setFormData({
      ageGroup: item.ageGroup,
      total: item.total.toString(),
      male: item.male.toString(),
      female: item.female.toString(),
      urban: item.urban.toString(),
      rural: item.rural.toString(),
      seeing: item.seeing.toString(),
      hearing: item.hearing.toString(),
      physical: item.physical.toString(),
      learning: item.learning.toString(),
      selfcare: item.selfcare.toString(),
      speech: item.speech.toString(),
    })
    setOpen(true)
    trackActivity("View", "Youth with Disabilities", `Opened form to edit entry for ${item.ageGroup}`)
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
      const { error } = await supabase.from("youth_with_disabilities").delete().eq("id", deleteId)

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
          .from("youth_with_disabilities")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: YouthWithDisabilities[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            ageGroup: item.age_group,
            total: item.total,
            male: item.male,
            female: item.female,
            urban: item.urban,
            rural: item.rural,
            seeing: item.seeing,
            hearing: item.hearing,
            physical: item.physical,
            learning: item.learning,
            selfcare: item.selfcare,
            speech: item.speech,
          }))
          setData(mappedData)
        }

        trackActivity("Delete", "Youth with Disabilities", `Deleted entry`)
        router.refresh()
      }
      setDeleteId(null)
    })
  }

  const handleBulkDelete = async (selectedRows: YouthWithDisabilities[]) => {
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

      const { error } = await supabase.from("youth_with_disabilities").delete().in("id", ids)

      if (error) throw error

      const { data: refreshedData } = await supabase
        .from("youth_with_disabilities")
        .select("*")
        .order("id", { ascending: true })

      if (refreshedData) {
        const mappedData: YouthWithDisabilities[] = refreshedData.map((item) => ({
          id: item.id.toString(),
          ageGroup: item.age_group,
          total: item.total,
          male: item.male,
          female: item.female,
          urban: item.urban,
          rural: item.rural,
          seeing: item.seeing,
          hearing: item.hearing,
          physical: item.physical,
          learning: item.learning,
          selfcare: item.selfcare,
          speech: item.speech,
        }))
        setData(mappedData)
      }

      toast({
        title: "Success",
        description: `Successfully deleted ${ids.length} record(s)`,
      })

      trackActivity("Delete", "Youth with Disabilities", `Bulk deleted ${ids.length} entries`)
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
      seeing: Number.parseInt(formData.seeing),
      hearing: Number.parseInt(formData.hearing),
      physical: Number.parseInt(formData.physical),
      learning: Number.parseInt(formData.learning),
      selfcare: Number.parseInt(formData.selfcare),
      speech: Number.parseInt(formData.speech),
    }

    startTransition(async () => {
      let error

      if (editingId) {
        const result = await supabase.from("youth_with_disabilities").update(entry).eq("id", editingId)
        error = result.error
      } else {
        const result = await supabase.from("youth_with_disabilities").insert([entry])
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
          .from("youth_with_disabilities")
          .select("*")
          .order("id", { ascending: true })

        if (refreshedData) {
          const mappedData: YouthWithDisabilities[] = refreshedData.map((item) => ({
            id: item.id.toString(),
            ageGroup: item.age_group,
            total: item.total,
            male: item.male,
            female: item.female,
            urban: item.urban,
            rural: item.rural,
            seeing: item.seeing,
            hearing: item.hearing,
            physical: item.physical,
            learning: item.learning,
            selfcare: item.selfcare,
            speech: item.speech,
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
        seeing: "",
        hearing: "",
        physical: "",
        learning: "",
        selfcare: "",
        speech: "",
      })

      trackActivity(
        editingId ? "Edit" : "Add",
        "Youth with Disabilities",
        `${editingId ? "Updated" : "Added new"} entry for age group ${formData.ageGroup} with total ${formData.total}`,
      )
      router.refresh()
    })
  }

  const columns: ColumnDef<YouthWithDisabilities>[] = [
    {
      accessorKey: "ageGroup",
      header: "Age Group",
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
      accessorKey: "urban",
      header: "Urban",
    },
    {
      accessorKey: "rural",
      header: "Rural",
    },
    {
      accessorKey: "seeing",
      header: "Seeing",
    },
    {
      accessorKey: "hearing",
      header: "Hearing",
    },
    {
      accessorKey: "physical",
      header: "Physical",
    },
    {
      accessorKey: "learning",
      header: "Learning",
    },
    {
      accessorKey: "selfcare",
      header: "Self-care",
    },
    {
      accessorKey: "speech",
      header: "Speech",
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
            <p className="text-gray-600">Loading youth with disabilities data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youth With Disabilities Data</h1>
        <div className="flex gap-2">
          <DataImportDialog tableName="youth_with_disabilities" />
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
                    seeing: "",
                    hearing: "",
                    physical: "",
                    learning: "",
                    selfcare: "",
                    speech: "",
                  })
                } else if (!editingId) {
                  trackActivity(
                    "View",
                    "Youth with Disabilities",
                    "Opened form to add new youth with disabilities entry",
                  )
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
                    <DialogTitle>{editingId ? "Edit" : "Add New"} Youth With Disabilities Entry</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the {editingId ? "updated" : "new"} youth with disabilities entry.
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
                      <div className="space-y-2">
                        <Label htmlFor="seeing">Seeing</Label>
                        <Input
                          id="seeing"
                          name="seeing"
                          type="number"
                          value={formData.seeing}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hearing">Hearing</Label>
                        <Input
                          id="hearing"
                          name="hearing"
                          type="number"
                          value={formData.hearing}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="physical">Physical</Label>
                        <Input
                          id="physical"
                          name="physical"
                          type="number"
                          value={formData.physical}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="learning">Learning</Label>
                        <Input
                          id="learning"
                          name="learning"
                          type="number"
                          value={formData.learning}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="selfcare">Self-care</Label>
                        <Input
                          id="selfcare"
                          name="selfcare"
                          type="number"
                          value={formData.selfcare}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="speech">Speech</Label>
                        <Input
                          id="speech"
                          name="speech"
                          type="number"
                          value={formData.speech}
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
        filename="youth-with-disabilities-data"
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
