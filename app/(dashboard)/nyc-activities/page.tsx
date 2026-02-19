"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { type NYCActivity, registeredOrgsSummary } from "@/lib/nyc-activities-data"
import type { RegisteredYouthOrg } from "@/lib/registered-orgs-data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  PlusCircle,
  Users,
  Target,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Lightbulb,
  Leaf,
  Heart,
  Palette,
  Trophy,
  Building2,
  Globe,
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
import { useActivity } from "@/contexts/activity-context"
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
} from "recharts"
import { DataImportDialog } from "@/components/data-import-dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { FileUploadResult } from "@/types/file-upload-result" // Import FileUploadResult
import { CanEditWrapper } from "@/components/can-edit-wrapper"

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Leadership Development":
      return Award
    case "Skills Development":
      return Lightbulb
    case "Entrepreneurship":
      return TrendingUp
    case "Environmental":
      return Leaf
    case "Health & Wellness":
      return Heart
    case "Arts & Culture":
      return Palette
    case "Sports & Recreation":
      return Trophy
    default:
      return Target
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Leadership Development":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Skills Development":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Entrepreneurship":
      return "bg-green-100 text-green-800 border-green-200"
    case "Environmental":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "Health & Wellness":
      return "bg-red-100 text-red-800 border-red-200"
    case "Arts & Culture":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Sports & Recreation":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getFunderColor = (funder: string) => {
  switch (funder) {
    case "UNDP":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "EU":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "World Bank":
      return "bg-green-100 text-green-800 border-green-200"
    case "GEF":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "WHO":
      return "bg-red-100 text-red-800 border-red-200"
    case "UNESCO":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "FIFA Foundation":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "Ongoing":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Planned":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function NYCActivitiesPage() {
  const [data, setData] = useState<NYCActivity[]>([])
  const [registeredOrgs, setRegisteredOrgs] = useState<RegisteredYouthOrg[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedOrgRegion, setSelectedOrgRegion] = useState<string>("all")
  const [formData, setFormData] = useState({
    activityName: "",
    category: "",
    region: "",
    year: "",
    beneficiaries: "",
    male: "",
    female: "",
    fundingPartner: "",
    description: "",
    status: "",
  })
  const { trackActivity } = useActivity()
  const [isPending, startTransition] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      if (!supabase) {
        console.log("[v0] NYC Activities: Supabase client not available")
        setIsLoading(false)
        return
      }

      // Fetch NYC activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("nyc_activities")
        .select("*")
        .order("year", { ascending: false })

      if (activitiesError) {
        console.error("Error fetching NYC activities:", activitiesError)
        toast({
          variant: "destructive",
          title: "Error loading activities",
          description: activitiesError.message,
        })
      } else if (activitiesData && activitiesData.length > 0) {
        const mappedData: NYCActivity[] = activitiesData.map((item) => ({
          id: item.id,
          activityName: item.activity_name,
          category: item.category,
          region: item.region,
          year: item.year,
          beneficiaries: item.beneficiaries,
          male: item.male,
          female: item.female,
          fundingPartner: item.funding_partner,
          description: item.description,
          status: item.status as "Completed" | "Ongoing" | "Planned",
        }))
        setData(mappedData)
      }

      // Fetch registered organizations
      const { data: orgsData, error: orgsError } = await supabase
        .from("registered_youth_orgs")
        .select("*")
        .order("organization_name")

      if (orgsError) {
        console.error("Error fetching registered orgs:", orgsError)
        toast({
          variant: "destructive",
          title: "Error loading organizations",
          description: orgsError.message,
        })
      } else if (orgsData && orgsData.length > 0) {
        const transformedData: RegisteredYouthOrg[] = orgsData.map((org) => ({
          id: org.id,
          organizationName: org.organization_name,
          acronym: org.acronym,
          dateEstablished: org.date_established,
          interventionArea: org.intervention_area,
          contactPerson: org.contact_person,
          email: org.email,
          contactNo: org.contact_no,
          region: org.region,
          registeredWith: org.registered_with,
        }))
        setRegisteredOrgs(transformedData)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [toast])

  const handleFileUpload = (result: FileUploadResult) => {
    if (result.success && result.data) {
      const updatedData = [...data, ...(result.data as NYCActivity[])]
      setData(updatedData)
      trackActivity("Upload", "NYC Activities", `Uploaded ${result.data.length} activities from file`)
    }
  }

  const filteredData = data.filter((item) => {
    return (
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (selectedRegion === "all" || item.region === selectedRegion) &&
      (selectedYear === "all" || item.year.toString() === selectedYear)
    )
  })

  const filteredOrgs = registeredOrgs.filter((org) => {
    return selectedOrgRegion === "all" || org.region === selectedOrgRegion
  })

  const safeNumber = (value: any): number => {
    if (value === null || value === undefined || value === "") return 0
    const num = Number(value)
    return isNaN(num) ? 0 : num
  }

  const totalBeneficiaries = filteredData.reduce((sum, item) => sum + safeNumber(item.beneficiaries), 0)
  const totalMale = filteredData.reduce((sum, item) => sum + safeNumber(item.male), 0)
  const totalFemale = filteredData.reduce((sum, item) => sum + safeNumber(item.female), 0)

  const categoryData = [
    "Leadership Development",
    "Skills Development",
    "Entrepreneurship",
    "Environmental",
    "Health & Wellness",
    "Arts & Culture",
    "Sports & Recreation",
  ].map((category) => ({
    name: category,
    value: data
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + safeNumber(item.beneficiaries), 0),
    color:
      COLORS[
        [
          "Leadership Development",
          "Skills Development",
          "Entrepreneurship",
          "Environmental",
          "Health & Wellness",
          "Arts & Culture",
          "Sports & Recreation",
        ].indexOf(category)
      ],
  }))

  const yearlyData = [2022, 2023, 2024].map((year) => ({
    year: year.toString(),
    activities: data.filter((item) => item.year === year).length,
    beneficiaries: data
      .filter((item) => item.year === year)
      .reduce((sum, item) => sum + safeNumber(item.beneficiaries), 0),
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
      activityName: "",
      category: "",
      region: "",
      year: "",
      beneficiaries: "",
      male: "",
      female: "",
      fundingPartner: "",
      description: "",
      status: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Database connection not available",
      })
      return
    }

    const newActivity: NYCActivity = {
      id: `nyc_${Date.now()}`,
      activityName: formData.activityName,
      category: formData.category,
      region: formData.region,
      year: Number.parseInt(formData.year) || 0,
      beneficiaries: Number.parseInt(formData.beneficiaries) || 0,
      male: Number.parseInt(formData.male) || 0,
      female: Number.parseInt(formData.female) || 0,
      fundingPartner: formData.fundingPartner,
      description: formData.description,
      status: formData.status as "Completed" | "Ongoing" | "Planned",
    }

    startTransition(async () => {
      const { error } = await supabase.from("nyc_activities").insert([
        {
          id: newActivity.id,
          activity_name: newActivity.activityName,
          category: newActivity.category,
          region: newActivity.region,
          year: newActivity.year,
          beneficiaries: newActivity.beneficiaries,
          male: newActivity.male,
          female: newActivity.female,
          funding_partner: newActivity.fundingPartner,
          description: newActivity.description,
          status: newActivity.status,
        },
      ])

      if (error) {
        toast({
          variant: "destructive",
          title: "Error inserting data",
          description: error.message,
        })
      } else {
        toast({
          title: "Success",
          description: "Successfully added activity to the database",
        })

        // Refresh data from database
        const { data: refreshedData } = await supabase
          .from("nyc_activities")
          .select("*")
          .order("year", { ascending: false })

        if (refreshedData) {
          const mappedData: NYCActivity[] = refreshedData.map((item) => ({
            id: item.id,
            activityName: item.activity_name,
            category: item.category,
            region: item.region,
            year: item.year,
            beneficiaries: item.beneficiaries,
            male: item.male,
            female: item.female,
            fundingPartner: item.funding_partner,
            description: item.description,
            status: item.status as "Completed" | "Ongoing" | "Planned",
          }))
          setData(mappedData)
        }
      }

      setOpen(false)
      resetForm()
      trackActivity("Add", "NYC Activity", `Added new activity: ${formData.activityName}`)
      router.refresh()
    })
  }

  const columns: ColumnDef<NYCActivity>[] = [
    {
      id: "number",
      header: "No.",
      cell: ({ row }) => <div className="text-center font-medium">{row.index + 1}</div>,
    },
    {
      accessorKey: "activityName",
      header: "Activity",
      cell: ({ row }) => <div className="font-medium max-w-md">{row.getValue("activityName")}</div>,
    },
    {
      accessorKey: "region",
      header: "Coverage",
      cell: ({ row }) => {
        const coverage = row.getValue("region") as string
        return (
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gray-500" />
            <span className="text-sm">{coverage}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "beneficiaries",
      header: "Output",
      cell: ({ row }) => {
        const value = safeNumber(row.getValue("beneficiaries"))
        return <div className="text-center font-bold text-gray-900">{value.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "fundingPartner",
      header: "Funder",
      cell: ({ row }) => {
        const funder = row.getValue("fundingPartner") as string
        return (
          <Badge variant="outline" className={getFunderColor(funder)}>
            {funder}
          </Badge>
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
            <p className="text-gray-600">Loading NYC activities data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">NYC</h1>
          <p className="text-gray-600 mt-1">National Youth Council</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="https://nyc.gm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Visit NYC Website
            </a>
          </Button>
          <DataImportDialog tableName="nyc_activities" onImportComplete={() => window.location.reload()} />
          <CanEditWrapper>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New NYC Activity</DialogTitle>
                    <DialogDescription>Fill in the details for the new activity entry.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="activityName">Activity Name</Label>
                        <Input
                          id="activityName"
                          name="activityName"
                          value={formData.activityName}
                          onChange={handleInputChange}
                          required
                        />
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
                            <SelectItem value="Leadership Development">Leadership Development</SelectItem>
                            <SelectItem value="Skills Development">Skills Development</SelectItem>
                            <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                            <SelectItem value="Environmental">Environmental</SelectItem>
                            <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                            <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                            <SelectItem value="Sports & Recreation">Sports & Recreation</SelectItem>
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
                            <SelectItem value="GBA">Greater Banjul Area (GBA)</SelectItem>
                            <SelectItem value="KM">Kanifing (KM)</SelectItem>
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
                        <Label htmlFor="fundingPartner">Funding Partner</Label>
                        <Select
                          value={formData.fundingPartner}
                          onValueChange={(value) => handleSelectChange("fundingPartner", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select funder" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UNDP">UNDP</SelectItem>
                            <SelectItem value="EU">European Union</SelectItem>
                            <SelectItem value="World Bank">World Bank</SelectItem>
                            <SelectItem value="GEF">Global Environment Facility</SelectItem>
                            <SelectItem value="WHO">World Health Organization</SelectItem>
                            <SelectItem value="UNESCO">UNESCO</SelectItem>
                            <SelectItem value="FIFA Foundation">FIFA Foundation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="beneficiaries">Total Beneficiaries</Label>
                        <Input
                          id="beneficiaries"
                          name="beneficiaries"
                          type="number"
                          value={formData.beneficiaries}
                          onChange={handleInputChange}
                          min="0"
                        />
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
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Planned">Planned</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Saving..." : "Save Activity"}
                    </Button>
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
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="organizations" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredData.length}</div>
                <p className="text-xs text-muted-foreground">Across all programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBeneficiaries.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Youth reached</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Male Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalMale.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {totalBeneficiaries > 0 ? Math.round((totalMale / totalBeneficiaries) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Female Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">{totalFemale.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {totalBeneficiaries > 0 ? Math.round((totalFemale / totalBeneficiaries) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registered Youth Organizations</CardTitle>
              <CardDescription>
                Total of {registeredOrgsSummary.totalRegistered} organizations across all regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {registeredOrgs.length === 0 ? (
                <div className="text-center py-4">Loading organizations...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(registeredOrgsSummary.byRegion).map(([region, count]) => (
                    <div key={region} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{count}</div>
                      <div className="text-sm text-gray-600 mt-1">{region}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yearly Activity Trends</CardTitle>
              <CardDescription>Activities and beneficiaries by year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="activities" fill="#3B82F6" name="Activities" />
                  <Bar yAxisId="right" dataKey="beneficiaries" fill="#10B981" name="Beneficiaries" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Activities Implemented and Total People Reached (2022-2024)</CardTitle>
              <CardDescription>Summary of NYC activities and beneficiaries by year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Year</th>
                      <th className="text-center p-4 font-semibold">No. of Activities Implemented</th>
                      <th className="text-center p-4 font-semibold">Total Number of People Reached (Beneficiaries)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyData.map((item) => (
                      <tr key={item.year} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{item.year}</td>
                        <td className="p-4 text-center font-bold text-blue-600">{item.activities}</td>
                        <td className="p-4 text-center font-bold text-green-600">
                          {item.beneficiaries.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                      <td className="p-4">Total</td>
                      <td className="p-4 text-center text-blue-600">
                        {yearlyData.reduce((sum, item) => sum + item.activities, 0)}
                      </td>
                      <td className="p-4 text-center text-green-600">
                        {yearlyData.reduce((sum, item) => sum + item.beneficiaries, 0).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activities by Category</CardTitle>
                <CardDescription>Distribution of activities across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => safeNumber(value).toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Male vs Female participation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Male", value: totalMale, color: "#3B82F6" },
                        { name: "Female", value: totalFemale, color: "#EC4899" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#EC4899" />
                    </Pie>
                    <Tooltip formatter={(value) => safeNumber(value).toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="category-filter">Category:</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Leadership Development">Leadership Development</SelectItem>
                  <SelectItem value="Skills Development">Skills Development</SelectItem>
                  <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                  <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                  <SelectItem value="Sports & Recreation">Sports & Recreation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="region-filter">Region:</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="GBA">GBA</SelectItem>
                  <SelectItem value="KM">KM</SelectItem>
                  <SelectItem value="WCR">West Coast Region</SelectItem>
                  <SelectItem value="NBR">North Bank Region</SelectItem>
                  <SelectItem value="LRR">Lower River Region</SelectItem>
                  <SelectItem value="CRR">Central River Region</SelectItem>
                  <SelectItem value="URR">Upper River Region</SelectItem>
                  <SelectItem value="National">National</SelectItem>
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
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable columns={columns} data={filteredData} searchKey="activityName" filename="nyc-activities" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
