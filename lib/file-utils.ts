import type { NYCActivity } from "./nyc-activities-data"
import type { NYSSProgram } from "./nyss-data"
import type { NSCParticipant } from "./nsc-data"
import type { IndicatorData } from "./indicator-data"

export interface FileUploadResult {
  success: boolean
  message: string
  data?: any[]
  errors?: string[]
}

// Parse CSV content
export function parseCSV(content: string): string[][] {
  const lines = content.split("\n").filter((line) => line.trim())
  return lines.map((line) => {
    const values: string[] = []
    let currentValue = ""
    let insideQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim())
        currentValue = ""
      } else {
        currentValue += char
      }
    }
    values.push(currentValue.trim())
    return values
  })
}

// Parse NYC Activities from CSV
export function parseNYCActivitiesCSV(content: string): FileUploadResult {
  try {
    const rows = parseCSV(content)
    if (rows.length < 2) {
      return { success: false, message: "File is empty or has no data rows" }
    }

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const data: NYCActivity[] = []
    const errors: string[] = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      try {
        const activity: NYCActivity = {
          id: `nyc_upload_${Date.now()}_${i}`,
          activityName: row[headers.indexOf("activity name")] || row[headers.indexOf("activityname")] || "",
          category: row[headers.indexOf("category")] || "",
          region: row[headers.indexOf("region")] || "",
          year: Number.parseInt(row[headers.indexOf("year")] || "0") || 0,
          beneficiaries: Number.parseInt(row[headers.indexOf("beneficiaries")] || "0") || 0,
          male: Number.parseInt(row[headers.indexOf("male")] || "0") || 0,
          female: Number.parseInt(row[headers.indexOf("female")] || "0") || 0,
          fundingPartner: row[headers.indexOf("funding partner")] || row[headers.indexOf("fundingpartner")] || "",
          description: row[headers.indexOf("description")] || "",
          status: (row[headers.indexOf("status")] || "Ongoing") as "Completed" | "Ongoing" | "Planned",
        }

        if (activity.activityName) {
          data.push(activity)
        }
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    return {
      success: true,
      message: `Successfully imported ${data.length} activities`,
      data,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: `Error parsing file: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Parse NSC Participants from CSV
export function parseNSCParticipantsCSV(content: string): FileUploadResult {
  try {
    const rows = parseCSV(content)
    if (rows.length < 2) {
      return { success: false, message: "File is empty or has no data rows" }
    }

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const data: NSCParticipant[] = []
    const errors: string[] = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      try {
        const participant: NSCParticipant = {
          id: `NSC_upload_${Date.now()}_${i}`,
          name: row[headers.indexOf("name")] || "",
          age: Number.parseInt(row[headers.indexOf("age")] || "0") || 0,
          gender: (row[headers.indexOf("gender")] || "Male") as "Male" | "Female",
          region: row[headers.indexOf("region")] || "",
          category: row[headers.indexOf("category")] || "",
          sport: row[headers.indexOf("sport")] || "",
          level: row[headers.indexOf("level")] || "",
          status: (row[headers.indexOf("status")] || "Active") as "Active" | "Inactive" | "Retired",
          achievements: (row[headers.indexOf("achievements")] || "")
            .split(";")
            .map((a) => a.trim())
            .filter(Boolean),
          dateRegistered:
            row[headers.indexOf("date registered")] ||
            row[headers.indexOf("dateregistered")] ||
            new Date().toISOString().split("T")[0],
          contact: row[headers.indexOf("contact")] || "",
        }

        if (participant.name) {
          data.push(participant)
        }
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    return {
      success: true,
      message: `Successfully imported ${data.length} participants`,
      data,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: `Error parsing file: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Parse NYSS Programs from CSV
export function parseNYSSProgramsCSV(content: string): FileUploadResult {
  try {
    const rows = parseCSV(content)
    if (rows.length < 2) {
      return { success: false, message: "File is empty or has no data rows" }
    }

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const data: NYSSProgram[] = []
    const errors: string[] = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      try {
        const program: NYSSProgram = {
          id: `nyss_prog_upload_${Date.now()}_${i}`,
          programName: row[headers.indexOf("program name")] || row[headers.indexOf("programname")] || "",
          institution: row[headers.indexOf("institution")] || "",
          region: row[headers.indexOf("region")] || "",
          year: Number.parseInt(row[headers.indexOf("year")] || "0") || 0,
          totalGraduates:
            Number.parseInt(row[headers.indexOf("total graduates")] || row[headers.indexOf("totalgraduates")] || "0") ||
            0,
          maleGraduates:
            Number.parseInt(row[headers.indexOf("male graduates")] || row[headers.indexOf("malegraduates")] || "0") ||
            0,
          femaleGraduates:
            Number.parseInt(
              row[headers.indexOf("female graduates")] || row[headers.indexOf("femalegraduates")] || "0",
            ) || 0,
          employmentRate:
            Number.parseInt(row[headers.indexOf("employment rate")] || row[headers.indexOf("employmentrate")] || "0") ||
            0,
          sector: row[headers.indexOf("sector")] || "",
          duration: row[headers.indexOf("duration")] || "",
          fundingPartner: row[headers.indexOf("funding partner")] || row[headers.indexOf("fundingpartner")] || "",
        }

        if (program.programName) {
          data.push(program)
        }
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    return {
      success: true,
      message: `Successfully imported ${data.length} programs`,
      data,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: `Error parsing file: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Parse Indicator Data from CSV
export function parseIndicatorDataCSV(content: string): FileUploadResult {
  try {
    const rows = parseCSV(content)
    if (rows.length < 2) {
      return { success: false, message: "File is empty or has no data rows" }
    }

    const headers = rows[0].map((h) => h.toLowerCase().trim())
    const data: IndicatorData[] = []
    const errors: string[] = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]
      try {
        const indicator: IndicatorData = {
          id: `indicator_upload_${Date.now()}_${i}`,
          organization: row[headers.indexOf("organization")] || "",
          indicator: row[headers.indexOf("indicator")] || "",
          year: Number.parseInt(row[headers.indexOf("year")] || "0") || 0,
          region: row[headers.indexOf("region")] || "",
          male: Number.parseInt(row[headers.indexOf("male")] || "0") || 0,
          female: Number.parseInt(row[headers.indexOf("female")] || "0") || 0,
          total: Number.parseInt(row[headers.indexOf("total")] || "0") || 0,
          referenceSource: row[headers.indexOf("reference source")] || row[headers.indexOf("referencesource")] || "",
          category: (row[headers.indexOf("category")] || "training") as "finance" | "training" | "sport_financing",
        }

        if (indicator.organization) {
          data.push(indicator)
        }
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    return {
      success: true,
      message: `Successfully imported ${data.length} indicators`,
      data,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: `Error parsing file: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Read file as text
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = (e) => reject(e)
    reader.readAsText(file)
  })
}
