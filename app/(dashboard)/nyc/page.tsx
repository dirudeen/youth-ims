"use client"

import { useState, useEffect } from "react"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/local-storage"
import { nycParticipantsData, regionalNYCStats, nycColumnTotals, type NYCParticipant } from "@/lib/nyc-data"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Download, Plus, Trophy, Users, Award, Globe } from "lucide-react"
import { useActivityTracker } from "@/contexts/activity-context"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataImportDialog } from "@/components/data-import-dialog"
import { CanEditWrapper } from "@/components/can-edit-wrapper"
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function NYCPage() {
  const [data, setData] = useState<NYCParticipant[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [newParticipant, setNewParticipant] = useState<Partial<NYCParticipant>>({
    name: "",
    age: 0,
    gender: "Male",
    region: "",
    category: "",
    sport: "",
    level: "",
    status: "Active",
    achievements: [],
    dateRegistered: new Date().toISOString().split("T")[0],
    contact: "",
  })
  const { logActivity } = useActivityTracker()

  useEffect(() => {
    const storedData = loadFromLocalStorage("nycData", nycParticipantsData)
    if (storedData && Array.isArray(storedData) && storedData.length > 0) {
      setData(storedData)
    } else {
      setData(nycParticipantsData)
      saveToLocalStorage("nycData", nycParticipantsData)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded && data.length > 0) {
      saveToLocalStorage("nycData", data)
    }
  }, [data, isLoaded])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading NYC data...</p>
        </div>
      </div>
    )
  }

  const handleAddParticipant = () => {
    if (!newParticipant.name || !newParticipant.region || !newParticipant.sport) {
      alert("Please fill in all required fields")
      return
    }

    const participant: NYCParticipant = {
      id: `NYC${String(data.length + 1).padStart(3, "0")}`,
      name: newParticipant.name || "",
      age: newParticipant.age || 0,
      gender: newParticipant.gender || "Male",
      region: newParticipant.region || "",
      category: newParticipant.category || "",
      sport: newParticipant.sport || "",
      level: newParticipant.level || "",
      status: newParticipant.status || "Active",
      achievements: newParticipant.achievements || [],
      dateRegistered: newParticipant.dateRegistered || new Date().toISOString().split("T")[0],
      contact: newParticipant.contact || "",
    }

    const updatedData = [...data, participant]
    setData(updatedData)
    saveToLocalStorage("nycData", updatedData)

    logActivity("add", "NYC", `Added participant: ${participant.name}`)

    setNewParticipant({
      name: "",
      age: 0,
      gender: "Male",
      region: "",
      category: "",
      sport: "",
      level: "",
      status: "Active",
      achievements: [],
      dateRegistered: new Date().toISOString().split("T")[0],
      contact: "",
    })
    setOpen(false)
  }

  const handleExport = () => {
    const csv = [
      [
        "ID",
        "Name",
        "Age",
        "Gender",
        "Region",
        "Category",
        "Sport",
        "Level",
        "Status",
        "Achievements",
        "Date Registered",
        "Contact",
      ],
      ...data.map((p) => [
        p.id,
        p.name,
        p.age,
        p.gender,
        p.region,
        p.category,
        p.sport,
        p.level,
        p.status,
        p.achievements?.join("; ") || "",
        p.dateRegistered,
        p.contact,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nyc_participants_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    logActivity("export", "NYC", "Exported NYC participants data to CSV")
  }

  const columns: ColumnDef<NYCParticipant>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <Badge variant={row.getValue("gender") === "Male" ? "default" : "secondary"}>{row.getValue("gender")}</Badge>
      ),
    },
    {
      accessorKey: "region",
      header: "Region",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "sport",
      header: "Sport",
    },
    {
      accessorKey: "level",
      header: "Level",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Active" ? "default" : status === "Inactive" ? "secondary" : "outline"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "achievements",
      header: "Achievements",
      cell: ({ row }) => {
        const achievements = row.getValue("achievements") as string[]
        return (
          <div className="max-w-xs truncate" title={achievements.join(", ")}>
            {achievements.length > 0 ? achievements.join(", ") : "None"}
          </div>
        )
      },
    },
    {
      accessorKey: "dateRegistered",
      header: "Date Registered",
    },
    {
      accessorKey: "contact",
      header: "Contact",
    },
  ]

  // Statistics
  const totalParticipants = data.length
  const activeParticipants = data.filter((p) => p.status === "Active").length
  const maleParticipants = data.filter((p) => p.gender === "Male").length
  const femaleParticipants = data.filter((p) => p.gender === "Female").length

  // Regional distribution
  const regionalData = regionalNYCStats.map((stat) => ({
    region: stat.region,
    total: stat.total,
    male:
      stat.amateurM +
      stat.professionalM +
      stat.paralympicM +
      stat.studentAthleteM +
      stat.nationalTeamM +
      stat.internationalM,
    female:
      stat.amateurF +
      stat.professionalF +
      stat.paralympicF +
      stat.studentAthleteF +
      stat.nationalTeamF +
      stat.internationalF,
  }))

  // Category distribution
  const categoryData = [
    { name: "Amateur", value: nycColumnTotals.amateurM + nycColumnTotals.amateurF },
    { name: "Professional", value: nycColumnTotals.professionalM + nycColumnTotals.professionalF },
    { name: "Paralympic", value: nycColumnTotals.paralympicM + nycColumnTotals.paralympicF },
    { name: "Student Athletes", value: nycColumnTotals.studentAthleteM + nycColumnTotals.studentAthleteF },
    { name: "National Team", value: nycColumnTotals.nationalTeamM + nycColumnTotals.nationalTeamF },
    { name: "International", value: nycColumnTotals.internationalM + nycColumnTotals.internationalF },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NYC</h1>
          <p className="text-muted-foreground">National Youth Council</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="https://nyc.gm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Visit NYC Website
            </a>
          </Button>
          <DataImportDialog tableName="nyc_activities" onImportComplete={() => window.location.reload()} />
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <CanEditWrapper>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Participant
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New NYC Participant</DialogTitle>
                  <DialogDescription>Enter the participant information below</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newParticipant.name}
                        onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newParticipant.age}
                        onChange={(e) =>
                          setNewParticipant({ ...newParticipant, age: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={newParticipant.gender}
                        onValueChange={(value) =>
                          setNewParticipant({ ...newParticipant, gender: value as "Male" | "Female" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region *</Label>
                      <Select
                        value={newParticipant.region}
                        onValueChange={(value) => setNewParticipant({ ...newParticipant, region: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Banjul">Banjul</SelectItem>
                          <SelectItem value="KM">Kanifing Municipal</SelectItem>
                          <SelectItem value="WCR">West Coast Region</SelectItem>
                          <SelectItem value="CRR">Central River Region</SelectItem>
                          <SelectItem value="NBR">North Bank Region</SelectItem>
                          <SelectItem value="LRR">Lower River Region</SelectItem>
                          <SelectItem value="URR">Upper River Region</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newParticipant.category}
                        onValueChange={(value) => setNewParticipant({ ...newParticipant, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Amateur">Amateur</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Paralympic">Paralympic</SelectItem>
                          <SelectItem value="Student Athlete">Student Athlete</SelectItem>
                          <SelectItem value="National Team">National Team</SelectItem>
                          <SelectItem value="International-based">International-based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sport">Sport *</Label>
                      <Input
                        id="sport"
                        value={newParticipant.sport}
                        onChange={(e) => setNewParticipant({ ...newParticipant, sport: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={newParticipant.level}
                        onValueChange={(value) => setNewParticipant({ ...newParticipant, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newParticipant.status}
                        onValueChange={(value) =>
                          setNewParticipant({ ...newParticipant, status: value as "Active" | "Inactive" | "Retired" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      type="email"
                      value={newParticipant.contact}
                      onChange={(e) => setNewParticipant({ ...newParticipant, contact: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                    <Textarea
                      id="achievements"
                      value={newParticipant.achievements?.join(", ")}
                      onChange={(e) =>
                        setNewParticipant({
                          ...newParticipant,
                          achievements: e.target.value.split(",").map((a) => a.trim()),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddParticipant}>Add Participant</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CanEditWrapper>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="statistics">Regional Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{nycColumnTotals.grandTotal}</div>
                <p className="text-xs text-muted-foreground">Registered participants</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Professional</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {nycColumnTotals.professionalM + nycColumnTotals.professionalF}
                </div>
                <p className="text-xs text-muted-foreground">Professional athletes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">National Team</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {nycColumnTotals.nationalTeamM + nycColumnTotals.nationalTeamF}
                </div>
                <p className="text-xs text-muted-foreground">National team members</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">International</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {nycColumnTotals.internationalM + nycColumnTotals.internationalF}
                </div>
                <p className="text-xs text-muted-foreground">International-based</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill="#0088FE" name="Male" />
                    <Bar dataKey="female" fill="#FF8042" name="Female" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>NYC Participants Database</CardTitle>
              <CardDescription>Complete list of registered NYC participants</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} searchKey="name" filename="nyc-participants" pageSize={10} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Regional Statistics</CardTitle>
              <CardDescription>Comprehensive breakdown by region and category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Region</th>
                      <th className="border p-2 text-center" colSpan={2}>
                        Amateur
                      </th>
                      <th className="border p-2 text-center" colSpan={2}>
                        Professional
                      </th>
                      <th className="border p-2 text-center" colSpan={2}>
                        Paralympic
                      </th>
                      <th className="border p-2 text-center" colSpan={2}>
                        Student Athletes
                      </th>
                      <th className="border p-2 text-center" colSpan={2}>
                        National Team
                      </th>
                      <th className="border p-2 text-center" colSpan={2}>
                        International
                      </th>
                      <th className="border p-2 text-center">Total</th>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border p-2"></th>
                      <th className="border p-2 text-xs">M</th>
                      <th className="border p-2 text-xs">F</th>
                      <th className="border p-2 text-xs">M</th>
                      <th className="border p-2 text-xs">F</th>
                      <th className="border p-2 text-xs">M</th>
                      <th className="border p-2 text-xs">F</th>
                      <th className="border p-2 text-xs">M</th>
                      <th className="border p-2 text-xs">F</th>
                      <th className="border p-2 text-xs">M</th>
                      <th className="border p-2 text-xs">F</th>
                      <th className="border p-2 text-xs">M</th>
                      <th className="border p-2 text-xs">F</th>
                      <th className="border p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalNYCStats.map((stat) => (
                      <tr key={stat.region} className="hover:bg-gray-50">
                        <td className="border p-2 font-medium">{stat.region}</td>
                        <td className="border p-2 text-center">{stat.amateurM}</td>
                        <td className="border p-2 text-center">{stat.amateurF}</td>
                        <td className="border p-2 text-center">{stat.professionalM}</td>
                        <td className="border p-2 text-center">{stat.professionalF}</td>
                        <td className="border p-2 text-center">{stat.paralympicM}</td>
                        <td className="border p-2 text-center">{stat.paralympicF}</td>
                        <td className="border p-2 text-center">{stat.studentAthleteM}</td>
                        <td className="border p-2 text-center">{stat.studentAthleteF}</td>
                        <td className="border p-2 text-center">{stat.nationalTeamM}</td>
                        <td className="border p-2 text-center">{stat.nationalTeamF}</td>
                        <td className="border p-2 text-center">{stat.internationalM}</td>
                        <td className="border p-2 text-center">{stat.internationalF}</td>
                        <td className="border p-2 text-center font-bold">{stat.total}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50 font-bold">
                      <td className="border p-2">TOTAL</td>
                      <td className="border p-2 text-center">{nycColumnTotals.amateurM}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.amateurF}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.professionalM}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.professionalF}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.paralympicM}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.paralympicF}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.studentAthleteM}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.studentAthleteF}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.nationalTeamM}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.nationalTeamF}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.internationalM}</td>
                      <td className="border p-2 text-center">{nycColumnTotals.internationalF}</td>
                      <td className="border p-2 text-center text-lg">{nycColumnTotals.grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
