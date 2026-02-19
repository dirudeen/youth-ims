"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { nediProgramsData } from "@/lib/nedi-data"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Globe, Trash2 } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ColumnDef } from "@tanstack/react-table"
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/local-storage"
import { useActivity } from "@/contexts/activity-context"
import type { NEDIProgram } from "@/lib/nedi-data"
import { CanEditWrapper } from "@/components/can-edit-wrapper"

export default function NEDIProgramsPage() {
  // Load data from localStorage or use default data
  const [data, setData] = useState<NEDIProgram[]>(() => loadFromLocalStorage("nediProgramsData", nediProgramsData))
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<NEDIProgram | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<NEDIProgram | null>(null)
  const [formData, setFormData] = useState({
    programName: "",
    targetGroup: "",
    beneficiaries: "",
    serviceType: "",
    description: "",
    status: "",
    location: "",
    maleParticipants: "",
    femaleParticipants: "",
    startDate: "",
    endDate: "",
    implementingPartner: "",
    fundingSource: "",
  })
  const { trackActivity } = useActivity()

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("nediProgramsData", data)
  }, [data])

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
      targetGroup: "",
      beneficiaries: "",
      serviceType: "",
      description: "",
      status: "",
      location: "",
      maleParticipants: "",
      femaleParticipants: "",
      startDate: "",
      endDate: "",
      implementingPartner: "",
      fundingSource: "",
    })
    setSelectedProgram(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProgram: NEDIProgram = {
      id: (data.length + 1).toString(),
      programName: formData.programName,
      targetGroup: formData.targetGroup,
      beneficiaries: Number.parseInt(formData.beneficiaries) || 0,
      serviceType: formData.serviceType,
      description: formData.description,
      status: formData.status,
      location: formData.location,
      maleParticipants: formData.maleParticipants ? Number.parseInt(formData.maleParticipants) : undefined,
      femaleParticipants: formData.femaleParticipants ? Number.parseInt(formData.femaleParticipants) : undefined,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      implementingPartner: formData.implementingPartner || undefined,
      fundingSource: formData.fundingSource || undefined,
    }

    const updatedData = [...data, newProgram]
    setData(updatedData)

    // Explicitly save to localStorage
    saveToLocalStorage("nediProgramsData", updatedData)

    setOpen(false)
    resetForm()

    // Track the activity
    trackActivity("Add", "NEDI Programs", `Added new program: ${formData.programName}`)
  }

  const handleEdit = (program: NEDIProgram) => {
    setSelectedProgram(program)
    setFormData({
      programName: program.programName,
      targetGroup: program.targetGroup,
      beneficiaries: program.beneficiaries.toString(),
      serviceType: program.serviceType,
      description: program.description,
      status: program.status,
      location: program.location,
      maleParticipants: program.maleParticipants?.toString() || "",
      femaleParticipants: program.femaleParticipants?.toString() || "",
      startDate: program.startDate,
      endDate: program.endDate || "",
      implementingPartner: program.implementingPartner || "",
      fundingSource: program.fundingSource || "",
    })
    setEditOpen(true)
  }

  const handleDelete = async () => {
    if (!programToDelete) return

    const updatedData = data.filter((program) => program.id !== programToDelete.id)
    setData(updatedData)
    saveToLocalStorage("nediProgramsData", updatedData)
    setDeleteDialogOpen(false)
    setProgramToDelete(null)
    trackActivity("Delete", "NEDI Programs", `Deleted program: ${programToDelete.programName}`)
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProgram) return

    const updatedData = data.map((program) => {
      if (program.id === selectedProgram.id) {
        return {
          ...program,
          programName: formData.programName,
          targetGroup: formData.targetGroup,
          beneficiaries: Number.parseInt(formData.beneficiaries) || 0,
          serviceType: formData.serviceType,
          description: formData.description,
          status: formData.status,
          location: formData.location,
          maleParticipants: formData.maleParticipants ? Number.parseInt(formData.maleParticipants) : undefined,
          femaleParticipants: formData.femaleParticipants ? Number.parseInt(formData.femaleParticipants) : undefined,
          startDate: formData.startDate,
          endDate: formData.endDate || undefined,
          implementingPartner: formData.implementingPartner || undefined,
          fundingSource: formData.fundingSource || undefined,
        }
      }
      return program
    })

    setData(updatedData)

    // Explicitly save to localStorage
    saveToLocalStorage("nediProgramsData", updatedData)

    setEditOpen(false)
    resetForm()

    trackActivity("Edit", "NEDI Programs", `Updated program: ${formData.programName}`)
  }

  const columns: ColumnDef<NEDIProgram>[] = [
    {
      accessorKey: "programName",
      header: "Program Name",
      cell: ({ row }) => {
        const name = row.getValue("programName") as string
        return (
          <div className="max-w-48 truncate" title={name}>
            {name}
          </div>
        )
      },
    },
    {
      accessorKey: "targetGroup",
      header: "Target Group",
    },
    {
      accessorKey: "beneficiaries",
      header: "Beneficiaries",
      cell: ({ row }) => {
        const count = row.getValue("beneficiaries") as number
        return count > 0 ? new Intl.NumberFormat().format(count) : "-"
      },
    },
    {
      accessorKey: "serviceType",
      header: "Service Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${status === "Completed" ? "bg-green-100 text-green-800" : ""}
            ${status === "Ongoing" ? "bg-blue-100 text-blue-800" : ""}
            ${status === "Operational" ? "bg-purple-100 text-purple-800" : ""}
            ${status === "Planned" ? "bg-yellow-100 text-yellow-800" : ""}
          `}
          >
            {status}
          </div>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "implementingPartner",
      header: "Partner",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const program = row.original
        return (
          <CanEditWrapper>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(program)}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setProgramToDelete(program)
                  setDeleteDialogOpen(true)
                }}
              >
                <Trash2 className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
          </CanEditWrapper>
        )
      },
    },
  ]

  const ProgramForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <form onSubmit={isEdit ? handleUpdate : handleSubmit}>
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit NEDI Program" : "Add New NEDI Program"}</DialogTitle>
        <DialogDescription>
          {isEdit ? "Update the program details." : "Fill in the details for the new NEDI program."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
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
            <Label htmlFor="targetGroup">Target Group</Label>
            <Input
              id="targetGroup"
              name="targetGroup"
              value={formData.targetGroup}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beneficiaries">Beneficiaries</Label>
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
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange("serviceType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Mentoring & Coaching">Mentoring & Coaching</SelectItem>
                <SelectItem value="Business Advisory">Business Advisory</SelectItem>
                <SelectItem value="Financial Assistance">Financial Assistance</SelectItem>
                <SelectItem value="Study Tour">Study Tour</SelectItem>
                <SelectItem value="Trade Fair Support">Trade Fair Support</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Monitoring & Evaluation">Monitoring & Evaluation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
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
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="implementingPartner">Implementing Partner</Label>
            <Select
              value={formData.implementingPartner}
              onValueChange={(value) => handleSelectChange("implementingPartner", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select partner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ActionAid International The Gambia">ActionAid International The Gambia</SelectItem>
                <SelectItem value="UNDP">UNDP</SelectItem>
                <SelectItem value="EU">European Union</SelectItem>
                <SelectItem value="World Bank">World Bank</SelectItem>
                <SelectItem value="IOM">International Organization for Migration</SelectItem>
                <SelectItem value="GIZ">GIZ</SelectItem>
                <SelectItem value="IFAD">IFAD</SelectItem>
                <SelectItem value="UNHCR">UNHCR</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maleParticipants">Male Participants</Label>
            <Input
              id="maleParticipants"
              name="maleParticipants"
              type="number"
              value={formData.maleParticipants}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="femaleParticipants">Female Participants</Label>
            <Input
              id="femaleParticipants"
              name="femaleParticipants"
              type="number"
              value={formData.femaleParticipants}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="fundingSource">Funding Source</Label>
            <Input
              id="fundingSource"
              name="fundingSource"
              value={formData.fundingSource}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{isEdit ? "Update Program" : "Save Program"}</Button>
      </DialogFooter>
    </form>
  )

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">NEDI</h1>
          <p className="text-gray-600">National Enterprise Development Initiative</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="https://nedi.gm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Visit NEDI Website
            </a>
          </Button>
          <DataImportDialog tableName="nedi_programs" onImportComplete={() => window.location.reload()} />
          <CanEditWrapper>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Program
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <ProgramForm />
              </DialogContent>
            </Dialog>
          </CanEditWrapper>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchKey="programName" filename="nedi-programs-data" />

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <ProgramForm isEdit={true} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the program "{programToDelete?.programName}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
