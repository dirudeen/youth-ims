"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Trophy, TrendingUp } from "lucide-react"
import { CanEditWrapper } from "@/components/can-edit-wrapper"
import { Pencil, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface SportsFinancing {
  id: string
  association_name: string
  amount: number
  year: number
  period: string
}

export default function SportsFinancingPage() {
  const [financing, setFinancing] = useState<SportsFinancing[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingRecord, setEditingRecord] = useState<SportsFinancing | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    association_name: "",
    amount: 0,
    year: 2025,
    period: "January to October",
  })

  useEffect(() => {
    fetchFinancing()
  }, [])

  async function fetchFinancing() {
    const supabase = createClient()

    if (!supabase) {
      console.log("[v0] Sports Financing: Supabase client not available")
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.from("sports_financing").select("*").order("amount", { ascending: false })

      if (error) throw error
      setFinancing(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
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

    try {
      if (editingRecord) {
        const { error } = await supabase.from("sports_financing").update(formData).eq("id", editingRecord.id)

        if (error) throw error
        toast({ title: "Financing record updated successfully" })
      } else {
        const id = `SF-${Date.now()}`
        const { error } = await supabase.from("sports_financing").insert([{ ...formData, id }])

        if (error) throw error
        toast({ title: "Financing record added successfully" })
      }

      setShowAddDialog(false)
      setEditingRecord(null)
      resetForm()
      fetchFinancing()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this record?")) return

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
      const { error } = await supabase.from("sports_financing").delete().eq("id", id)

      if (error) throw error
      toast({ title: "Record deleted successfully" })
      fetchFinancing()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function handleBulkDelete(ids: string[]) {
    if (!confirm(`Are you sure you want to delete ${ids.length} records?`)) return

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
      const { error } = await supabase.from("sports_financing").delete().in("id", ids)

      if (error) throw error
      toast({ title: `${ids.length} records deleted successfully` })
      fetchFinancing()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  function resetForm() {
    setFormData({
      association_name: "",
      amount: 0,
      year: 2025,
      period: "January to October",
    })
  }

  function handleEdit(record: SportsFinancing) {
    setEditingRecord(record)
    setFormData({
      association_name: record.association_name,
      amount: record.amount,
      year: record.year,
      period: record.period,
    })
    setShowAddDialog(true)
  }

  const columns: ColumnDef<SportsFinancing>[] = [
    {
      accessorKey: "association_name",
      header: "Association/Federation",
    },
    {
      accessorKey: "amount",
      header: "Amount (D)",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number
        return `D${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      },
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "period",
      header: "Period",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const record = row.original
        return (
          <CanEditWrapper>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(record)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(record.id)}>
                <Trash2 className="h-4 w-4 text-blue-500" />
              </Button>
            </div>
          </CanEditWrapper>
        )
      },
    },
  ]

  // Calculate analytics
  const totalFinancing = financing.reduce((sum, f) => sum + (f.amount || 0), 0)
  const averageFinancing = financing.length > 0 ? totalFinancing / financing.length : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sports Financing</h1>
        <p className="text-muted-foreground">Support to Sports Associations and Federations</p>
      </div>

      <Tabs defaultValue="data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="data">Financing Data</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          <CanEditWrapper>
            <Button onClick={() => setShowAddDialog(true)}>Add Financing Record</Button>
          </CanEditWrapper>

          <DataTable
            data={financing}
            columns={columns}
            searchKey="association_name"
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            enableRowSelection={true}
            onBulkDelete={handleBulkDelete}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Financing</p>
                  <p className="text-2xl font-bold">D{totalFinancing.toLocaleString()}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Associations Supported</p>
                  <p className="text-2xl font-bold">{financing.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Average Support</p>
                  <p className="text-2xl font-bold">D{Math.round(averageFinancing).toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingRecord ? "Edit Financing Record" : "Add Financing Record"}</DialogTitle>
            <DialogDescription>Enter the sports association financing details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="association_name">Association/Federation Name</Label>
              <Input
                id="association_name"
                placeholder="e.g., Gambia Basketball Association"
                value={formData.association_name}
                onChange={(e) => setFormData({ ...formData, association_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Dalasi)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 1800000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  min="2020"
                  max="2030"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) || 2025 })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  placeholder="e.g., January to October"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddDialog(false)
                  setEditingRecord(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">{editingRecord ? "Update" : "Add"} Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
