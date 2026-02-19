"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users } from "lucide-react"
import { CanEditWrapper } from "@/components/can-edit-wrapper"
import type { ColumnDef } from "@tanstack/react-table"

interface PIAStudent {
  id: string
  department: string
  year: string
  male: number
  female: number
  enrolled: number
  graduated: number
}

export default function PIAStudentsPage() {
  const [students, setStudents] = useState<PIAStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingStudent, setEditingStudent] = useState<PIAStudent | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    department: "",
    year: "",
    male: 0,
    female: 0,
    enrolled: 0,
    graduated: 0,
  })

  const departments = [
    "Tailoring & Fashion Design",
    "Auto Mechanics",
    "Metal Work",
    "Carpentry",
    "Plumbing",
    "Construction",
    "Electrical",
    "Hair Dressing",
    "Home Science",
  ]

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] PIA Students: Supabase client not available")
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("pia_students")
        .select("*")
        .order("year", { ascending: false })
        .order("department", { ascending: true })

      if (error) throw error
      setStudents(data || [])
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

    try {
      const supabase = createClient()
      if (!supabase) {
        toast({
          title: "Error",
          description: "Database connection not available",
          variant: "destructive",
        })
        return
      }

      if (editingStudent) {
        const { error } = await supabase.from("pia_students").update(formData).eq("id", editingStudent.id)

        if (error) throw error
        toast({ title: "Student record updated successfully" })
      } else {
        const id = `PIA-${Date.now()}`
        const { error } = await supabase.from("pia_students").insert([{ ...formData, id }])

        if (error) throw error
        toast({ title: "Student record added successfully" })
      }

      setShowAddDialog(false)
      setEditingStudent(null)
      resetForm()
      fetchStudents()
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

    try {
      const supabase = createClient()
      if (!supabase) {
        toast({
          title: "Error",
          description: "Database connection not available",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("pia_students").delete().eq("id", id)

      if (error) throw error
      toast({ title: "Record deleted successfully" })
      fetchStudents()
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

    try {
      const supabase = createClient()
      if (!supabase) {
        toast({
          title: "Error",
          description: "Database connection not available",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("pia_students").delete().in("id", ids)

      if (error) throw error
      toast({ title: `${ids.length} records deleted successfully` })
      fetchStudents()
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
      department: "",
      year: "",
      male: 0,
      female: 0,
      enrolled: 0,
      graduated: 0,
    })
  }

  function handleEdit(student: PIAStudent) {
    setEditingStudent(student)
    setFormData({
      department: student.department,
      year: student.year,
      male: student.male || 0,
      female: student.female || 0,
      enrolled: student.enrolled,
      graduated: student.graduated || 0,
    })
    setShowAddDialog(true)
  }

  const columns: ColumnDef<PIAStudent>[] = [
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "year",
      header: "Academic Year",
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
      accessorKey: "enrolled",
      header: "Enrolled",
    },
    {
      accessorKey: "graduated",
      header: "Graduated",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original
        return (
          <CanEditWrapper>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(student)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(student.id)}>
                <Trash2 className="h-4 w-4 text-blue-500" />
              </Button>
            </div>
          </CanEditWrapper>
        )
      },
    },
  ]

  // Calculate analytics
  const totalEnrolled = students.reduce((sum, s) => sum + (s.enrolled || 0), 0)
  const totalGraduated = students.reduce((sum, s) => sum + (s.graduated || 0), 0)
  const totalMale = students.reduce((sum, s) => sum + (s.male || 0), 0)
  const totalFemale = students.reduce((sum, s) => sum + (s.female || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">President's International Award</h1>
        <p className="text-muted-foreground">Skills Training Centre Student Data</p>
      </div>

      <Tabs defaultValue="data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="data">Student Data</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          <CanEditWrapper>
            <Button onClick={() => setShowAddDialog(true)}>Add Student Record</Button>
          </CanEditWrapper>

          <DataTable
            data={students}
            columns={columns}
            searchKey="department"
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            enableRowSelection={true}
            onBulkDelete={handleBulkDelete}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Enrolled</p>
                  <p className="text-2xl font-bold">{totalEnrolled}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Graduated</p>
                  <p className="text-2xl font-bold">{totalGraduated}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Male Students</p>
                  <p className="text-2xl font-bold">{totalMale}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Female Students</p>
                  <p className="text-2xl font-bold">{totalFemale}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit Student Record" : "Add Student Record"}</DialogTitle>
            <DialogDescription>Enter the student enrollment and graduation data</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Academic Year</Label>
              <Input
                id="year"
                placeholder="e.g., 2023-2024"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="male">Male</Label>
                <Input
                  id="male"
                  type="number"
                  min="0"
                  value={formData.male}
                  onChange={(e) => setFormData({ ...formData, male: Number.parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="female">Female</Label>
                <Input
                  id="female"
                  type="number"
                  min="0"
                  value={formData.female}
                  onChange={(e) => setFormData({ ...formData, female: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="enrolled">Enrolled</Label>
                <Input
                  id="enrolled"
                  type="number"
                  min="0"
                  value={formData.enrolled}
                  onChange={(e) => setFormData({ ...formData, enrolled: Number.parseInt(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduated">Graduated</Label>
                <Input
                  id="graduated"
                  type="number"
                  min="0"
                  value={formData.graduated}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      graduated: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddDialog(false)
                  setEditingStudent(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">{editingStudent ? "Update" : "Add"} Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
