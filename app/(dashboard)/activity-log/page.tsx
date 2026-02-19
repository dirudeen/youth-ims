"use client"

import { useState } from "react"
import { useActivity } from "@/contexts/activity-context"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Activity } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

export default function ActivityLogPage() {
  const { activities } = useActivity()
  const [filter, setFilter] = useState("all")

  // Filter activities based on selected filter
  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.action.toLowerCase() === filter.toLowerCase())

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "userName",
      header: "User",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.getValue("action") as string
        return (
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${action === "Login" || action === "Add" ? "bg-green-100 text-green-800" : ""}
            ${action === "Logout" || action === "Delete" ? "bg-red-100 text-red-800" : ""}
            ${action === "Edit" || action === "Update" ? "bg-blue-100 text-blue-800" : ""}
            ${action === "View" || action === "Export" || action === "Navigate" ? "bg-gray-100 text-gray-800" : ""}
          `}
          >
            {action}
          </div>
        )
      },
    },
    {
      accessorKey: "target",
      header: "Target",
    },
    {
      accessorKey: "details",
      header: "Details",
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => {
        const timestamp = row.getValue("timestamp") as string
        return new Date(timestamp).toLocaleString()
      },
    },
    {
      accessorKey: "ipAddress",
      header: "IP Address",
    },
  ]

  // Count activities by type
  const loginCount = activities.filter((a) => a.action === "Login").length
  const logoutCount = activities.filter((a) => a.action === "Logout").length
  const addCount = activities.filter((a) => a.action === "Add").length
  const editCount = activities.filter((a) => a.action === "Edit").length
  const viewCount = activities.filter((a) => a.action === "View").length
  const exportCount = activities.filter((a) => a.action === "Export").length

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Activity Log</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="filter-action">Filter by Action:</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="add">Add</SelectItem>
              <SelectItem value="edit">Edit</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="navigate">Navigate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Log</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activities.length}</div>
                <p className="text-xs text-muted-foreground">All recorded user activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Login/Logout</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loginCount}/{logoutCount}
                </div>
                <p className="text-xs text-muted-foreground">Login and logout activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Operations</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{addCount + editCount}</div>
                <p className="text-xs text-muted-foreground">
                  Add: {addCount}, Edit: {editCount}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Access</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{viewCount}</div>
                <p className="text-xs text-muted-foreground">View operations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Exports</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exportCount}</div>
                <p className="text-xs text-muted-foreground">Export operations</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details">
          <DataTable columns={columns} data={filteredActivities} searchKey="userName" filename="activity-log" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
