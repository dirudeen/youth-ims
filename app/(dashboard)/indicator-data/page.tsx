"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { organizationSummaries } from "@/lib/indicator-data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DataImportDialog } from "@/components/data-import-dialog"
import { CanEditWrapper } from "@/components/can-edit-wrapper"
import {
  PlusCircle,
  Building2,
  Award,
  Sprout,
  Users,
  DollarSign,
  GraduationCap,
  MapPin,
  BarChart3,
  PieChart,
  Target,
  Trophy,
  Edit,
  Trash2,
} from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ColumnDef } from "@tanstack/react-table"
import { createClient } from "@/lib/supabase/client"
import { useActivity } from "@/contexts/activity-context"
import type { IndicatorData } from "@/lib/indicator-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"
import { useToast } from "@/hooks/use-toast"
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

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4", "#DC2626", "#334155"]

const getOrganizationIcon = (org: string) => {
  switch (org) {
    case "NEDI":
      return Building2
    case "PIA":
      return Award
    case "GSI":
      return Sprout
    case "NYSS":
      return Users
    case "NSC":
      return Trophy
    case "NYC":
      return Target
    default:
      return Building2
  }
}

const getOrganizationColor = (org: string) => {
  switch (org) {
    case "NEDI":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "PIA":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "GSI":
      return "bg-green-100 text-green-800 border-green-200"
    case "NYSS":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "NSC":
      return "bg-red-100 text-red-800 border-red-200"
    case "NYC":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function IndicatorDataPage() {
  const [data, setData] = useState<IndicatorData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [formData, setFormData] = useState({
    organization: "",
    indicator: "",
    year: "",
    region: "",
    male: "",
    female: "",
    referenceSource: "",
    category: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { trackActivity } = useActivity()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] Indicator Data: Supabase client not available")
        setIsLoaded(true)
        return
      }

      try {
        const { data: indicatorData, error } = await supabase
          .from("indicator_data")
          .select("*")
          .order("year", { ascending: false })

        if (error) throw error

        setData(indicatorData || [])
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching indicator data:", error)
        toast({
          title: "Error",
          description: "Failed to load indicator data. Please try again.",
          variant: "destructive",
        })
        setIsLoaded(true)
      }
    }

    fetchData()
  }, [toast])

  const filteredData = data.filter((item) => {
    return (
      (selectedOrg === "all" || item.organization === selectedOrg) &&
      (selectedYear === "all" || item.year.toString() === selectedYear) &&
      (selectedCategory === "all" || item.category === selectedCategory)
    )
  })

  const totalBeneficiaries = filteredData.reduce((sum, item) => sum + item.total, 0)
  const uniqueRegions = new Set(filteredData.map((item) => item.region)).size
  const financeTotal = filteredData
    .filter((item) => item.category === "finance")
    .reduce((sum, item) => sum + item.total, 0)
  const trainingTotal = filteredData
    .filter((item) => item.category === "training")
    .reduce((sum, item) => sum + item.total, 0)
  const sportFinancingTotal = filteredData
    .filter((item) => item.category === "sport_financing")
    .reduce((sum, item) => sum + item.total, 0)

  const orgSummaryData = organizationSummaries.map((org) => ({
    name: org.name,
    fullName: org.fullName,
    beneficiaries: data.filter((item) => item.organization === org.name).reduce((sum, item) => sum + item.total, 0),
    color: COLORS[organizationSummaries.indexOf(org)],
  }))

  const yearlyData = [2022, 2023, 2024].map((year) => ({
    year: year.toString(),
    NEDI: data
      .filter((item) => item.organization === "NEDI" && item.year === year)
      .reduce((sum, item) => sum + item.total, 0),
    PIA: data
      .filter((item) => item.organization === "PIA" && item.year === year)
      .reduce((sum, item) => sum + item.total, 0),
    GSI: data
      .filter((item) => item.organization === "GSI" && item.year === year)
      .reduce((sum, item) => sum + item.total, 0),
    NYSS: data
      .filter((item) => item.organization === "NYSS" && item.year === year)
      .reduce((sum, item) => sum + item.total, 0),
    NSC: data
      .filter((item) => item.organization === "NSC" && item.year === year)
      .reduce((sum, item) => sum + item.total, 0),
    NYC: data
      .filter((item) => item.organization === "NYC" && item.year === year)
      .reduce((sum, item) => sum + item.total, 0),
  }))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      organization: "",
      indicator: "",
      year: "",
      region: "",
      male: "",
      female: "",
      referenceSource: "",
      category: "",
    })
  }

  const handleEdit = (indicator: IndicatorData) => {
    setEditingId(indicator.id)
    setFormData({
      organization: indicator.organization,
      indicator: indicator.indicator,
      year: indicator.year.toString(),
      region: indicator.region,
      male: indicator.male.toString(),
      female: indicator.female.toString(),
      referenceSource: indicator.reference_source,
      category: indicator.category,
    })
    setOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingId) return

    const supabase = createClient()
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database connection not available",
        variant: "destructive",
      })
      return
    }

    const updatedIndicator = {
      organization: formData.organization,
      indicator: formData.indicator,
      year: Number.parseInt(formData.year),
      region: formData.region,
      male: Number.parseInt(formData.male) || 0,
      female: Number.parseInt(formData.female) || 0,
      total: (Number.parseInt(formData.male) || 0) + (Number.parseInt(formData.female) || 0),
      reference_source: formData.referenceSource,
      category: formData.category as "finance" | "training" | "sport_financing",
    }

    try {
      const { error } = await supabase.from("indicator_data").update(updatedIndicator).eq("id", editingId)

      if (error) throw error

      setData((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...updatedIndicator } : item)))

      setOpen(false)
      setEditingId(null)
      resetForm()

      trackActivity("Update", "Indicator Data", `Updated indicator for ${formData.organization}`)

      toast({
        title: "Success",
        description: "Indicator data updated successfully.",
      })
    } catch (error) {
      console.error("Error updating indicator:", error)
      toast({
        title: "Error",
        description: "Failed to update indicator data. Please try again.",
        variant: "destructive",
      })
    }
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

    try {
      const { error } = await supabase.from("indicator_data").delete().eq("id", deleteId)

      if (error) throw error

      setData((prev) => prev.filter((item) => item.id !== deleteId))
      setDeleteId(null)

      trackActivity("Delete", "Indicator Data", "Deleted indicator data")

      toast({
        title: "Success",
        description: "Indicator data deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting indicator:", error)
      toast({
        title: "Error",
        description: "Failed to delete indicator data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      await handleUpdate(e)
      return
    }

    const supabase = createClient()
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database connection not available",
        variant: "destructive",
      })
      return
    }

    const newIndicator = {
      organization: formData.organization,
      indicator: formData.indicator,
      year: Number.parseInt(formData.year),
      region: formData.region,
      male: Number.parseInt(formData.male) || 0,
      female: Number.parseInt(formData.female) || 0,
      total: (Number.parseInt(formData.male) || 0) + (Number.parseInt(formData.female) || 0),
      reference_source: formData.referenceSource,
      category: formData.category as "finance" | "training" | "sport_financing",
    }

    try {
      const { data: insertedData, error } = await supabase
        .from("indicator_data")
        .insert([newIndicator])
        .select()
        .single()

      if (error) throw error

      setData((prev) => [insertedData, ...prev])

      setOpen(false)
      resetForm()

      trackActivity("Add", "Indicator Data", `Added new indicator for ${formData.organization}`)

      toast({
        title: "Success",
        description: "Indicator data added successfully.",
      })
    } catch (error) {
      console.error("Error adding indicator:", error)
      toast({
        title: "Error",
        description: "Failed to add indicator data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<IndicatorData>[] = [
    {
      accessorKey: "organization",
      header: "Organization",
      cell: ({ row }) => {
        const org = row.getValue("organization") as string
        const Icon = getOrganizationIcon(org)
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <Badge variant="outline" className={getOrganizationColor(org)}>
              {org}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string
        return (
          <div className="flex items-center gap-1">
            {category === "finance" ? (
              <GraduationCap className="h-3 w-3 text-green-600" />
            ) : category === "sport_financing" ? (
              <Trophy className="h-3 w-3 text-red-600" />
            ) : (
              <GraduationCap className="h-3 w-3 text-blue-600" />
            )}
            <Badge
              variant="outline"
              className={
                category === "finance"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : category === "sport_financing"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-blue-100 text-blue-800 border-blue-200"
              }
            >
              {category === "finance" ? "Finance" : category === "sport_financing" ? "Sport Finance" : "Training"}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "male",
      header: "Male",
      cell: ({ row }) => (
        <div className="text-center font-medium text-blue-600">
          {new Intl.NumberFormat().format(row.getValue("male"))}
        </div>
      ),
    },
    {
      accessorKey: "female",
      header: "Female",
      cell: ({ row }) => (
        <div className="text-center font-medium text-pink-600">
          {new Intl.NumberFormat().format(row.getValue("female"))}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <div className="text-center font-bold text-gray-900">
          {new Intl.NumberFormat().format(row.getValue("total"))}
        </div>
      ),
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

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading indicator data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">MoYS RF-NDP Indicator Data</h1>
          <p className="text-gray-600 mt-1">National Enterprise Development Initiative & Partner Organizations</p>
        </div>
        <div className="flex gap-2">
          <DataImportDialog tableName="indicator_data" />
          <CanEditWrapper>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Indicator
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>{editingId ? "Edit Indicator Data" : "Add New Indicator Data"}</DialogTitle>
                    <DialogDescription>
                      {editingId
                        ? "Update the details for the existing indicator entry."
                        : "Fill in the details for the new indicator entry."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Select
                          value={formData.organization}
                          onValueChange={(value) => handleSelectChange("organization", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NEDI">NEDI</SelectItem>
                            <SelectItem value="PIA">PIA</SelectItem>
                            <SelectItem value="GSI">GSI</SelectItem>
                            <SelectItem value="NYSS">NYSS</SelectItem>
                            <SelectItem value="NSC">NSC</SelectItem>
                            <SelectItem value="NYC">NYC</SelectItem>
                          </SelectContent>
                        </Select>
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
                            <SelectItem value="BJL">Banjul (BJL)</SelectItem>
                            <SelectItem value="KM">Kanifing (KM)</SelectItem>
                            <SelectItem value="GBA">Greater Banjul Area (GBA)</SelectItem>
                            <SelectItem value="WCR">West Coast Region (WCR)</SelectItem>
                            <SelectItem value="NBR">North Bank Region (NBR)</SelectItem>
                            <SelectItem value="LRR">Lower River Region (LRR)</SelectItem>
                            <SelectItem value="CRR">Central River Region (CRR)</SelectItem>
                            <SelectItem value="URR">Upper River Region (URR)</SelectItem>
                            <SelectItem value="National">National</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finance">Finance Access</SelectItem>
                            <SelectItem value="training">Training/Skills</SelectItem>
                            <SelectItem value="sport_financing">Sport Financing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="male">Male Participants</Label>
                        <Input
                          id="male"
                          name="male"
                          type="number"
                          value={formData.male}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="female">Female Participants</Label>
                        <Input
                          id="female"
                          name="female"
                          type="number"
                          value={formData.female}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="indicator">Indicator Description</Label>
                        <Textarea
                          id="indicator"
                          name="indicator"
                          value={formData.indicator}
                          onChange={handleInputChange}
                          required
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="referenceSource">Reference/Source</Label>
                        <Input
                          id="referenceSource"
                          name="referenceSource"
                          value={formData.referenceSource}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">{editingId ? "Update Indicator" : "Save Indicator"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CanEditWrapper>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="organizations" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Data Table
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBeneficiaries.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Finance Access</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{financeTotal.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Youth with business finance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Graduates</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{trainingTotal.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Skills & entrepreneurship</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sport Financing</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sportFinancingTotal.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Sport financing beneficiaries</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regional Coverage</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueRegions}</div>
                <p className="text-xs text-muted-foreground">Regions covered</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Yearly Performance Trends</CardTitle>
              <CardDescription>Beneficiaries by organization and year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="NEDI" fill="#3B82F6" name="NEDI" />
                  <Bar dataKey="PIA" fill="#8B5CF6" name="PIA" />
                  <Bar dataKey="GSI" fill="#10B981" name="GSI" />
                  <Bar dataKey="NYSS" fill="#F59E0B" name="NYSS" />
                  <Bar dataKey="NSC" fill="#DC2626" name="NSC" />
                  <Bar dataKey="NYC" fill="#334155" name="NYC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {organizationSummaries.map((org) => {
              const Icon = getOrganizationIcon(org.name)
              const orgData = data.filter((item) => item.organization === org.name)
              const financeCount = orgData
                .filter((item) => item.category === "finance")
                .reduce((sum, item) => sum + item.total, 0)
              const trainingCount = orgData
                .filter((item) => item.category === "training")
                .reduce((sum, item) => sum + item.total, 0)
              const sportFinancingCount = orgData
                .filter((item) => item.category === "sport_financing")
                .reduce((sum, item) => sum + item.total, 0)

              return (
                <Card key={org.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            org.color === "blue"
                              ? "bg-blue-100"
                              : org.color === "purple"
                                ? "bg-purple-100"
                                : org.color === "green"
                                  ? "bg-green-100"
                                  : org.color === "orange"
                                    ? "bg-orange-100"
                                    : org.color === "red"
                                      ? "bg-red-100"
                                      : "bg-indigo-100"
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              org.color === "blue"
                                ? "text-blue-600"
                                : org.color === "purple"
                                  ? "text-purple-600"
                                  : org.color === "green"
                                    ? "text-green-600"
                                    : org.color === "orange"
                                      ? "text-orange-600"
                                      : org.color === "red"
                                        ? "text-red-600"
                                        : "text-indigo-600"
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{org.name}</CardTitle>
                          <CardDescription className="text-sm">{org.fullName}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{org.description}</p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {orgData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{financeCount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Finance</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{trainingCount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Training</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{sportFinancingCount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Sport Financing</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Organization Distribution</CardTitle>
                <CardDescription>Total beneficiaries by organization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={orgSummaryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="beneficiaries"
                    >
                      {orgSummaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => new Intl.NumberFormat().format(value as number)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Finance vs Training vs Sport Financing</CardTitle>
                <CardDescription>Program category distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: "Finance Access", value: financeTotal, color: "#10B981" },
                        { name: "Training Programs", value: trainingTotal, color: "#3B82F6" },
                        { name: "Sport Financing", value: sportFinancingTotal, color: "#DC2626" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#3B82F6" />
                      <Cell fill="#DC2626" />
                    </Pie>
                    <Tooltip formatter={(value) => new Intl.NumberFormat().format(value as number)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="org-filter">Organization:</Label>
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="NEDI">NEDI</SelectItem>
                  <SelectItem value="PIA">PIA</SelectItem>
                  <SelectItem value="GSI">GSI</SelectItem>
                  <SelectItem value="NYSS">NYSS</SelectItem>
                  <SelectItem value="NSC">NSC</SelectItem>
                  <SelectItem value="NYC">NYC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="year-filter">Year:</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="category-filter">Category:</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="sport_financing">Sport Financing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            searchKey="region"
            filename="moys-indicator-data"
            pageSize={10}
          />
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the indicator data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
