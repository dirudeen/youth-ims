"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { YouthPopulation } from "@/lib/data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
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
import { useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { optimisticUpdate } from "@/lib/optimistic-updates"

export default function YouthPopulationPage() {
  const [data, setData] = useState<YouthPopulation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<YouthPopulation | null>(null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    lga: "",
    totalPopulation: "",
    youthPopulation: "",
    youthShare: "",
    maleYouth: "",
    femaleYouth: "",
    urbanYouth: "",
    ruralYouth: "",
  })
  const { trackActivity } = useActivity()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      if (!supabase) {
        console.error("Supabase client not available")
        toast({
          variant: "destructive",
          title: "Database connection unavailable",
          description: "Please ensure Supabase environment variables are configured.",
        })
        setIsLoading(false)
        return
      }

      const { data: youthPopData, error } = await supabase
        .from("youth_population")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching youth population data:", error)
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: error.message,
        })
      } else if (youthPopData) {
        const mappedData: YouthPopulation[] = youthPopData.map((item) => ({
          id: item.id.toString(),
          lga: item.lga,
          totalPopulation: item.total_population,
          youthPopulation: item.youth_population,
          youthShare: item.youth_share,
          maleYouth: item.male_youth,
          femaleYouth: item.female_youth,
          urbanYouth: item.urban_youth,
          ruralYouth: item.rural_youth,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newEntry = {
      id: `temp-${Date.now()}`, // Temporary ID for optimistic update
      lga: formData.lga,
      total_population: Number.parseInt(formData.totalPopulation),
      youth_population: Number.parseInt(formData.youthPopulation),
      youth_share: Number.parseFloat(formData.youthShare),
      male_youth: Number.parseInt(formData.maleYouth),
      female_youth: Number.parseInt(formData.femaleYouth),
      urban_youth: Number.parseInt(formData.urbanYouth),
      rural_youth: Number.parseInt(formData.ruralYouth),
    }

    setOpen(false)
    setFormData({
      lga: "",
      totalPopulation: "",
      youthPopulation: "",
      youthShare: "",
      maleYouth: "",
      femaleYouth: "",
      urbanYouth: "",
      ruralYouth: "",
    })

    const { success, error } = await optimisticUpdate(
      "youth_population",
      "insert",
      newEntry,
      data,
      setData,
      (item) => ({
        id: item.id.toString(),
        lga: item.lga,
        totalPopulation: item.total_population,
        youthPopulation: item.youth_population,
        youthShare: item.youth_share,
        maleYouth: item.male_youth,
        femaleYouth: item.female_youth,
        urbanYouth: item.urban_youth,
        ruralYouth: item.rural_youth,
      }),
    )

    if (success) {
      toast({
        title: "Success",
        description: `Successfully added entry for LGA ${formData.lga}`,
      })
      trackActivity("Add", "Youth Population", `Added new entry for LGA ${formData.lga}`)
    } else {
      toast({
        variant: "destructive",
        title: "Error inserting data",
        description: error,
      })
    }
  }

  const handleEdit = (item: YouthPopulation) => {
    setSelectedItem(item)
    setFormData({
      lga: item.lga,
      totalPopulation: item.totalPopulation.toString(),
      youthPopulation: item.youthPopulation.toString(),
      youthShare: item.youthShare.toString(),
      maleYouth: item.maleYouth.toString(),
      femaleYouth: item.femaleYouth.toString(),
      urbanYouth: item.urbanYouth.toString(),
      ruralYouth: item.ruralYouth.toString(),
    })
    setEditOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return

    const updatedEntry = {
      id: selectedItem.id,
      lga: formData.lga,
      total_population: Number.parseInt(formData.totalPopulation),
      youth_population: Number.parseInt(formData.youthPopulation),
      youth_share: Number.parseFloat(formData.youthShare),
      male_youth: Number.parseInt(formData.maleYouth),
      female_youth: Number.parseInt(formData.femaleYouth),
      urban_youth: Number.parseInt(formData.urbanYouth),
      rural_youth: Number.parseInt(formData.ruralYouth),
    }

    setEditOpen(false)
    setSelectedItem(null)
    setFormData({
      lga: "",
      totalPopulation: "",
      youthPopulation: "",
      youthShare: "",
      maleYouth: "",
      femaleYouth: "",
      urbanYouth: "",
      ruralYouth: "",
    })

    const { success, error } = await optimisticUpdate(
      "youth_population",
      "update",
      {
        id: Number.parseInt(selectedItem.id),
        ...updatedEntry,
      } as any,
      data,
      setData,
      (item) => ({
        id: item.id.toString(),
        lga: item.lga,
        totalPopulation: item.total_population,
        youthPopulation: item.youth_population,
        youthShare: item.youth_share,
        maleYouth: item.male_youth,
        femaleYouth: item.female_youth,
        urbanYouth: item.urban_youth,
        ruralYouth: item.rural_youth,
      }),
    )

    if (success) {
      toast({
        title: "Success",
        description: `Successfully updated entry for LGA ${updatedEntry.lga}`,
      })
      trackActivity("Edit", "Youth Population", `Updated entry for LGA ${updatedEntry.lga}`)
    } else {
      toast({
        variant: "destructive",
        title: "Error updating data",
        description: error,
      })
    }
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    setDeleteOpen(false)
    const lgaName = selectedItem.lga

    const { success, error } = await optimisticUpdate(
      "youth_population",
      "delete",
      { id: Number.parseInt(selectedItem.id) } as any,
      data,
      setData,
      (item) => ({
        id: item.id.toString(),
        lga: item.lga,
        totalPopulation: item.total_population,
        youthPopulation: item.youth_population,
        youthShare: item.youth_share,
        maleYouth: item.male_youth,
        femaleYouth: item.female_youth,
        urbanYouth: item.urban_youth,
        ruralYouth: item.rural_youth,
      }),
    )

    setSelectedItem(null)

    if (success) {
      toast({
        title: "Success",
        description: `Successfully deleted entry for LGA ${lgaName}`,
      })
      trackActivity("Delete", "Youth Population", `Deleted entry for LGA ${lgaName}`)
    } else {
      toast({
        variant: "destructive",
        title: "Error deleting data",
        description: error,
      })
    }
  }

  const handleBulkDelete = async (selectedRows: YouthPopulation[]) => {
    const ids = selectedRows.map((row) => ({ id: Number.parseInt(row.id) }))

    const { success, error } = await optimisticUpdate(
      "youth_population",
      "delete",
      ids as any,
      data,
      setData,
      (item) => ({
        id: item.id.toString(),
        lga: item.lga,
        totalPopulation: item.total_population,
        youthPopulation: item.youth_population,
        youthShare: item.youth_share,
        maleYouth: item.male_youth,
        femaleYouth: item.female_youth,
        urbanYouth: item.urban_youth,
        ruralYouth: item.rural_youth,
      }),
    )

    if (success) {
      toast({
        title: "Success",
        description: `Successfully deleted ${selectedRows.length} ${selectedRows.length === 1 ? "entry" : "entries"}`,
      })
      trackActivity("Delete", "Youth Population", `Bulk deleted ${selectedRows.length} entries`)
    } else {
      toast({
        variant: "destructive",
        title: "Error deleting data",
        description: error,
      })
    }
  }

  const columns: ColumnDef<YouthPopulation>[] = [
    {
      accessorKey: "lga",
      header: "LGA",
    },
    {
      accessorKey: "totalPopulation",
      header: "Total Population",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("totalPopulation"))
      },
    },
    {
      accessorKey: "youthPopulation",
      header: "Youth Population",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("youthPopulation"))
      },
    },
    {
      accessorKey: "youthShare",
      header: "Youth Share (%)",
    },
    {
      accessorKey: "maleYouth",
      header: "Male Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("maleYouth"))
      },
    },
    {
      accessorKey: "femaleYouth",
      header: "Female Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("femaleYouth"))
      },
    },
    {
      accessorKey: "urbanYouth",
      header: "Urban Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("urbanYouth"))
      },
    },
    {
      accessorKey: "ruralYouth",
      header: "Rural Youth",
      cell: ({ row }) => {
        return new Intl.NumberFormat().format(row.getValue("ruralYouth"))
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
              <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedItem(item)
                  setDeleteOpen(true)
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
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
            <p className="text-gray-600">Loading youth population data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Youth Population Data</h1>
        <div className="flex gap-2">
          <DataImportDialog tableName="youth_population" />
          <CanEditWrapper>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New Youth Population Entry</DialogTitle>
                    <DialogDescription>Fill in the details for the new youth population entry.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lga">LGA</Label>
                        <Input id="lga" name="lga" value={formData.lga} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalPopulation">Total Population</Label>
                        <Input
                          id="totalPopulation"
                          name="totalPopulation"
                          type="number"
                          value={formData.totalPopulation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youthPopulation">Youth Population</Label>
                        <Input
                          id="youthPopulation"
                          name="youthPopulation"
                          type="number"
                          value={formData.youthPopulation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youthShare">Youth Share (%)</Label>
                        <Input
                          id="youthShare"
                          name="youthShare"
                          type="number"
                          step="0.1"
                          value={formData.youthShare}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maleYouth">Male Youth</Label>
                        <Input
                          id="maleYouth"
                          name="maleYouth"
                          type="number"
                          value={formData.maleYouth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="femaleYouth">Female Youth</Label>
                        <Input
                          id="femaleYouth"
                          name="femaleYouth"
                          type="number"
                          value={formData.femaleYouth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urbanYouth">Urban Youth</Label>
                        <Input
                          id="urbanYouth"
                          name="urbanYouth"
                          type="number"
                          value={formData.urbanYouth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ruralYouth">Rural Youth</Label>
                        <Input
                          id="ruralYouth"
                          name="ruralYouth"
                          type="number"
                          value={formData.ruralYouth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Saving..." : "Save Entry"}
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
        filename="youth-population-data"
        enableRowSelection={true}
        onBulkDelete={handleBulkDelete}
      />

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Edit Youth Population Entry</DialogTitle>
              <DialogDescription>Update the details for this youth population entry.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-lga">LGA</Label>
                  <Input id="edit-lga" name="lga" value={formData.lga} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-totalPopulation">Total Population</Label>
                  <Input
                    id="edit-totalPopulation"
                    name="totalPopulation"
                    type="number"
                    value={formData.totalPopulation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-youthPopulation">Youth Population</Label>
                  <Input
                    id="edit-youthPopulation"
                    name="youthPopulation"
                    type="number"
                    value={formData.youthPopulation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-youthShare">Youth Share (%)</Label>
                  <Input
                    id="edit-youthShare"
                    name="youthShare"
                    type="number"
                    step="0.1"
                    value={formData.youthShare}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-maleYouth">Male Youth</Label>
                  <Input
                    id="edit-maleYouth"
                    name="maleYouth"
                    type="number"
                    value={formData.maleYouth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-femaleYouth">Female Youth</Label>
                  <Input
                    id="edit-femaleYouth"
                    name="femaleYouth"
                    type="number"
                    value={formData.femaleYouth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-urbanYouth">Urban Youth</Label>
                  <Input
                    id="edit-urbanYouth"
                    name="urbanYouth"
                    type="number"
                    value={formData.urbanYouth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ruralYouth">Rural Youth</Label>
                  <Input
                    id="edit-ruralYouth"
                    name="ruralYouth"
                    type="number"
                    value={formData.ruralYouth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Entry"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the entry for LGA "{selectedItem?.lga}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
