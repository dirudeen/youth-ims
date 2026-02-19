"use client"
import { useState, useEffect } from "react"
import type React from "react"

import type { NYSSProgram, NYSSGraduate } from "@/lib/nyss-data"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Briefcase, TrendingUp, MapPin, Target, BarChart3, Globe, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useActivity } from "@/contexts/activity-context"
import { DataImportDialog } from "@/components/data-import-dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
import { CanEditWrapper } from "@/components/can-edit-wrapper"

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"]

const getEmploymentStatusColor = (status: string) => {
  switch (status) {
    case "Employed":
      return "bg-green-100 text-green-800 border-green-200"
    case "Self-Employed":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Seeking Employment":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Further Education":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getSectorColor = (sector: string) => {
  const colors: { [key: string]: string } = {
    "Business & Entrepreneurship": "bg-blue-100 text-blue-800 border-blue-200",
    "Information Technology": "bg-indigo-100 text-indigo-800 border-indigo-200",
    Agriculture: "bg-green-100 text-green-800 border-green-200",
    "Tourism & Hospitality": "bg-orange-100 text-orange-800 border-orange-200",
    Healthcare: "bg-red-100 text-red-800 border-red-200",
    "Renewable Energy": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Technical Skills": "bg-gray-100 text-gray-800 border-gray-200",
    "Creative Industries": "bg-purple-100 text-purple-800 border-purple-200",
    Construction: "bg-yellow-100 text-yellow-800 border-yellow-200",
  }
  return colors[sector] || "bg-gray-100 text-gray-800 border-gray-200"
}

export default function NYSSPage() {
  const [programData, setProgramData] = useState<NYSSProgram[]>([])
  const [graduateData, setGraduateData] = useState<NYSSGraduate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedSector, setSelectedSector] = useState<string>("all")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    programName: "",
    institution: "",
    year: "",
    region: "",
    sector: "",
    totalGraduates: "",
    maleGraduates: "",
    femaleGraduates: "",
    employmentRate: "",
  })
  const { trackActivity } = useActivity()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchAllData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] NYSS: Supabase client not available")
        setIsLoading(false)
        return
      }

      // Fetch programs
      const { data: programsData, error: programsError } = await supabase
        .from("nyss_programs")
        .select("*")
        .order("year", { ascending: false })

      if (programsError) {
        console.error("Error fetching NYSS programs:", programsError)
        toast({
          variant: "destructive",
          title: "Error loading programs",
          description: programsError.message,
        })
      } else if (programsData && programsData.length > 0) {
        const mappedPrograms: NYSSProgram[] = programsData.map((item) => ({
          id: item.id.toString(),
          programName: item.program_name,
          institution: item.institution,
          year: item.year,
          region: item.region,
          sector: item.sector,
          totalGraduates: item.total_graduates,
          maleGraduates: item.male_graduates,
          femaleGraduates: item.female_graduates,
          employmentRate: Number(item.employment_rate) || 0,
        }))
        setProgramData(mappedPrograms)
      }

      // Fetch graduates
      const { data: graduatesData, error: graduatesError } = await supabase
        .from("nyss_graduates")
        .select("*")
        .order("id", { ascending: true })

      if (graduatesError) {
        console.error("Error fetching NYSS graduates:", graduatesError)
        toast({
          variant: "destructive",
          title: "Error loading graduates",
          description: graduatesError.message,
        })
      } else if (graduatesData && graduatesData.length > 0) {
        const mappedGraduates: NYSSGraduate[] = graduatesData.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          age: item.age,
          gender: item.gender as "Male" | "Female",
          region: item.region,
          trainingProgram: item.training_program,
          graduationYear: item.graduation_year,
          employmentStatus: item.employment_status as
            | "Employed"
            | "Self-Employed"
            | "Seeking Employment"
            | "Further Education",
          sector: item.sector,
        }))
        setGraduateData(mappedGraduates)
      }

      setIsLoading(false)
    }

    fetchAllData()
  }, [toast])

  const filteredPrograms = programData.filter((item) => {
    return (
      (selectedYear === "all" || item.year.toString() === selectedYear) &&
      (selectedRegion === "all" || item.region === selectedRegion) &&
      (selectedSector === "all" || item.sector === selectedSector)
    )
  })

  const safeNumber = (value: any): number => {
    if (value === null || value === undefined || value === "") return 0
    const num = Number(value)
    return isNaN(num) ? 0 : num
  }

  const totalGraduates = filteredPrograms.reduce((sum, prog) => sum + safeNumber(prog.totalGraduates), 0)
  const totalMale = filteredPrograms.reduce((sum, prog) => sum + safeNumber(prog.maleGraduates), 0)
  const totalFemale = filteredPrograms.reduce((sum, prog) => sum + safeNumber(prog.femaleGraduates), 0)
  const avgEmploymentRate =
    filteredPrograms.filter((p) => p.employmentRate > 0).length > 0
      ? filteredPrograms
          .filter((p) => p.employmentRate > 0)
          .reduce((sum, prog) => sum + safeNumber(prog.employmentRate), 0) /
        filteredPrograms.filter((p) => p.employmentRate > 0).length
      : 0

  // Chart data
  const sectorData = Array.from(new Set(programData.map((p) => p.sector))).map((sector) => ({
    name: sector,
    value: programData.filter((p) => p.sector === sector).reduce((sum, p) => sum + safeNumber(p.totalGraduates), 0),
  }))

  const yearlyData = [2022, 2023, 2024, 2025].map((year) => ({
    year: year.toString(),
    graduates: programData.filter((p) => p.year === year).reduce((sum, p) => sum + safeNumber(p.totalGraduates), 0),
    programs: programData.filter((p) => p.year === year).length,
    employmentRate:
      programData.filter((p) => p.year === year && p.employmentRate > 0).length > 0
        ? programData
            .filter((p) => p.year === year && p.employmentRate > 0)
            .reduce((sum, p) => sum + p.employmentRate, 0) / programData.filter((p) => p.year === year).length
        : 0,
  }))

  const employmentStatusData = [
    {
      name: "Employed",
      value: graduateData.filter((g) => g.employmentStatus === "Employed").length,
      color: "#10B981",
    },
    {
      name: "Self-Employed",
      value: graduateData.filter((g) => g.employmentStatus === "Self-Employed").length,
      color: "#3B82F6",
    },
    {
      name: "Seeking Employment",
      value: graduateData.filter((g) => g.employmentStatus === "Seeking Employment").length,
      color: "#F59E0B",
    },
    {
      name: "Further Education",
      value: graduateData.filter((g) => g.employmentStatus === "Further Education").length,
      color: "#8B5CF6",
    },
  ]

  const programColumns: ColumnDef<NYSSProgram>[] = [
    {
      accessorKey: "programName",
      header: "Program Name",
      cell: ({ row }) => <div className="font-medium max-w-xs">{row.getValue("programName")}</div>,
    },
    {
      accessorKey: "institution",
      header: "Institution",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          {row.getValue("institution")}
        </Badge>
      ),
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          {row.getValue("year")}
        </Badge>
      ),
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-gray-500" />
          <span className="text-sm">{row.getValue("region")}</span>
        </div>
      ),
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => {
        const sector = row.getValue("sector") as string
        return (
          <Badge variant="outline" className={getSectorColor(sector)}>
            {sector}
          </Badge>
        )
      },
    },
    {
      accessorKey: "totalGraduates",
      header: "Graduates",
      cell: ({ row }) => {
        const value = safeNumber(row.getValue("totalGraduates"))
        return <div className="text-center font-bold text-gray-900">{value.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "maleGraduates",
      header: "Male",
      cell: ({ row }) => {
        const value = safeNumber(row.getValue("maleGraduates"))
        return <div className="text-center font-medium text-blue-600">{value.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "femaleGraduates",
      header: "Female",
      cell: ({ row }) => {
        const value = safeNumber(row.getValue("femaleGraduates"))
        return <div className="text-center font-medium text-pink-600">{value.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "employmentRate",
      header: "Employment Rate",
      cell: ({ row }) => {
        const rate = safeNumber(row.getValue("employmentRate"))
        return (
          <div className="text-center">
            <Badge
              variant="outline"
              className={
                rate >= 70
                  ? "bg-green-100 text-green-800 border-green-200"
                  : rate >= 50
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : rate > 0
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
              }
            >
              {rate > 0 ? `${rate}%` : "N/A"}
            </Badge>
          </div>
        )
      },
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
            <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.original.id)}>
              <Trash2 className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </CanEditWrapper>
      ),
    },
  ]

  const graduateColumns: ColumnDef<NYSSGraduate>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string
        return (
          <Badge
            variant="outline"
            className={gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"}
          >
            {gender}
          </Badge>
        )
      },
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-gray-500" />
          <span className="text-sm">{row.getValue("region")}</span>
        </div>
      ),
    },
    {
      accessorKey: "trainingProgram",
      header: "Training Program",
      cell: ({ row }) => <div className="max-w-xs">{row.getValue("trainingProgram")}</div>,
    },
    {
      accessorKey: "graduationYear",
      header: "Graduation Year",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          {row.getValue("graduationYear")}
        </Badge>
      ),
    },
    {
      accessorKey: "employmentStatus",
      header: "Employment Status",
      cell: ({ row }) => {
        const status = row.getValue("employmentStatus") as string
        return (
          <Badge variant="outline" className={getEmploymentStatusColor(status)}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => {
        const sector = row.getValue("sector") as string
        return (
          <Badge variant="outline" className={getSectorColor(sector)}>
            {sector}
          </Badge>
        )
      },
    },
  ]

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      programName: "",
      institution: "",
      year: "",
      region: "",
      sector: "",
      totalGraduates: "",
      maleGraduates: "",
      femaleGraduates: "",
      employmentRate: "",
    })
  }

  // Handle Edit function
  const handleEdit = (program: NYSSProgram) => {
    setEditingId(program.id)
    setFormData({
      programName: program.programName,
      institution: program.institution,
      year: program.year.toString(),
      region: program.region,
      sector: program.sector,
      totalGraduates: program.totalGraduates.toString(),
      maleGraduates: program.maleGraduates.toString(),
      femaleGraduates: program.femaleGraduates.toString(),
      employmentRate: program.employmentRate.toString(),
    })
    setOpen(true)
  }

  // Handle Submit function for add/edit
  const handleSubmitProgram = async () => {
    const supabase = createClient()
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Database connection not available",
      })
      return
    }

    const programData = {
      program_name: formData.programName,
      institution: formData.institution,
      year: Number.parseInt(formData.year),
      region: formData.region,
      sector: formData.sector,
      total_graduates: Number.parseInt(formData.totalGraduates) || 0,
      male_graduates: Number.parseInt(formData.maleGraduates) || 0,
      female_graduates: Number.parseInt(formData.femaleGraduates) || 0,
      employment_rate: Number.parseFloat(formData.employmentRate) || 0,
    }

    try {
      if (editingId) {
        // Update existing
        const { error } = await supabase.from("nyss_programs").update(programData).eq("id", editingId)

        if (error) throw error

        setProgramData((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  programName: programData.program_name,
                  institution: programData.institution,
                  year: programData.year,
                  region: programData.region,
                  sector: programData.sector,
                  totalGraduates: programData.total_graduates,
                  maleGraduates: programData.male_graduates,
                  femaleGraduates: programData.female_graduates,
                  employmentRate: programData.employment_rate,
                }
              : item,
          ),
        )

        trackActivity("Update", "NYSS Programs", `Updated program: ${formData.programName}`)
        toast({ title: "Success", description: "Program updated successfully." })
      } else {
        // Add new
        const { data: insertedData, error } = await supabase
          .from("nyss_programs")
          .insert([programData])
          .select()
          .single()

        if (error) throw error

        const newProgram: NYSSProgram = {
          id: insertedData.id.toString(),
          programName: insertedData.program_name,
          institution: insertedData.institution,
          year: insertedData.year,
          region: insertedData.region,
          sector: insertedData.sector,
          totalGraduates: insertedData.total_graduates,
          maleGraduates: insertedData.male_graduates,
          femaleGraduates: insertedData.female_graduates,
          employmentRate: Number(insertedData.employment_rate) || 0,
        }

        setProgramData((prev) => [newProgram, ...prev])

        trackActivity("Add", "NYSS Programs", `Added new program: ${formData.programName}`)
        toast({ title: "Success", description: "Program added successfully." })
      }

      setOpen(false)
      setEditingId(null)
      resetForm()
    } catch (error) {
      console.error("Error saving program:", error)
      toast({
        title: "Error",
        description: "Failed to save program. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle Delete function
  const handleDeleteProgram = async () => {
    const supabase = createClient()
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Database connection not available",
      })
      return
    }

    if (!deleteId) return

    try {
      const { error } = await supabase.from("nyss_programs").delete().eq("id", deleteId)

      if (error) throw error

      setProgramData((prev) => prev.filter((item) => item.id !== deleteId))
      setDeleteId(null)

      trackActivity("Delete", "NYSS Programs", "Deleted program")
      toast({ title: "Success", description: "Program deleted successfully." })
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading NYSS data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">National Youth Service Scheme</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="https://nyss.gov.gm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Visit NYSS Website
            </a>
          </Button>
          <DataImportDialog tableName="nyss_programs" onImportComplete={() => window.location.reload()} />
          <CanEditWrapper>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Program
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={(e) => e.preventDefault()}>
                  <DialogHeader>
                    <DialogTitle>{editingId ? "Edit Program" : "Add New Program"}</DialogTitle>
                    <DialogDescription>Fill in the program details.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="programName">Program Name</Label>
                        <Input
                          id="programName"
                          name="programName"
                          value={formData.programName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select value={formData.region} onValueChange={(value) => handleSelectChange("region", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GBA">GBA</SelectItem>
                            <SelectItem value="KM">KM</SelectItem>
                            <SelectItem value="WCR">WCR</SelectItem>
                            <SelectItem value="NBR">NBR</SelectItem>
                            <SelectItem value="LRR">LRR</SelectItem>
                            <SelectItem value="CRR">CRR</SelectItem>
                            <SelectItem value="URR">URR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector</Label>
                        <Input
                          id="sector"
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalGraduates">Total Graduates</Label>
                        <Input
                          id="totalGraduates"
                          name="totalGraduates"
                          type="number"
                          value={formData.totalGraduates}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maleGraduates">Male Graduates</Label>
                        <Input
                          id="maleGraduates"
                          name="maleGraduates"
                          type="number"
                          value={formData.maleGraduates}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="femaleGraduates">Female Graduates</Label>
                        <Input
                          id="femaleGraduates"
                          name="femaleGraduates"
                          type="number"
                          value={formData.femaleGraduates}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employmentRate">Employment Rate (%)</Label>
                        <Input
                          id="employmentRate"
                          name="employmentRate"
                          type="number"
                          value={formData.employmentRate}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitProgram}>{editingId ? "Update Program" : "Save Program"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CanEditWrapper>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the program.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProgram}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="graduates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Graduates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programData.length}</div>
                <p className="text-xs text-muted-foreground">Training programs offered</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Graduates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGraduates.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {totalMale.toLocaleString()} M / {totalFemale.toLocaleString()} F
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Employment Rate</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgEmploymentRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Graduates employed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sectors</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sectorData.length}</div>
                <p className="text-xs text-muted-foreground">Training sectors</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Program Trends</CardTitle>
                <CardDescription>Programs and graduates by year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="programs" fill="#3B82F6" name="Programs" />
                    <Bar dataKey="graduates" fill="#10B981" name="Graduates" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Rate Trend</CardTitle>
                <CardDescription>Employment rate over years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="employmentRate"
                      stroke="#8B5CF6"
                      name="Employment Rate %"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Label>Year:</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label>Region:</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="GBA">GBA</SelectItem>
                  <SelectItem value="KM">KM</SelectItem>
                  <SelectItem value="WCR">WCR</SelectItem>
                  <SelectItem value="NBR">NBR</SelectItem>
                  <SelectItem value="LRR">LRR</SelectItem>
                  <SelectItem value="CRR">CRR</SelectItem>
                  <SelectItem value="URR">URR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label>Sector:</Label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {Array.from(new Set(programData.map((p) => p.sector))).map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            columns={programColumns}
            data={filteredPrograms}
            searchKey="programName"
            filename="nyss-programs"
            pageSize={10}
          />
        </TabsContent>

        <TabsContent value="graduates" className="space-y-6">
          <DataTable
            columns={graduateColumns}
            data={graduateData}
            searchKey="name"
            filename="nyss-graduates"
            pageSize={10}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Graduates by Sector</CardTitle>
                <CardDescription>Distribution across training sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => safeNumber(value).toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Status</CardTitle>
                <CardDescription>Current status of graduates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={employmentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {employmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution by Sector</CardTitle>
              <CardDescription>Male vs Female graduates across sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={Array.from(new Set(programData.map((p) => p.sector))).map((sector) => ({
                    sector,
                    male: programData.filter((p) => p.sector === sector).reduce((sum, p) => sum + p.maleGraduates, 0),
                    female: programData
                      .filter((p) => p.sector === sector)
                      .reduce((sum, p) => sum + p.femaleGraduates, 0),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" fill="#3B82F6" name="Male" />
                  <Bar dataKey="female" fill="#EC4899" name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
