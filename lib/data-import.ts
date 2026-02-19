import { createClient } from "@/lib/supabase/client"

export interface ImportResult {
  success: boolean
  imported: number
  failed: number
  errors: string[]
}

export interface ColumnMapping {
  csvColumn: string
  dbColumn: string
}

/**
 * Parse CSV file content
 */
export function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split("\n").filter((line) => line.trim())
  if (lines.length === 0) return []

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""))
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""))
    const row: Record<string, string> = {}

    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })

    rows.push(row)
  }

  return rows
}

/**
 * Validate row data against table schema
 */
export function validateRow(
  row: Record<string, string>,
  requiredColumns: string[],
): { valid: boolean; error?: string } {
  for (const column of requiredColumns) {
    if (!row[column] || row[column].trim() === "") {
      return { valid: false, error: `Missing required field: ${column}` }
    }
  }
  return { valid: true }
}

/**
 * Import data to a Supabase table
 */
export async function importDataToTable(
  tableName: string,
  data: Record<string, any>[],
  columnMapping: ColumnMapping[],
): Promise<ImportResult> {
  const supabase = createClient()
  const result: ImportResult = {
    success: true,
    imported: 0,
    failed: 0,
    errors: [],
  }

  for (let i = 0; i < data.length; i++) {
    try {
      const row = data[i]
      const mappedRow: Record<string, any> = {}

      // Map CSV columns to database columns
      columnMapping.forEach(({ csvColumn, dbColumn }) => {
        if (row[csvColumn] !== undefined) {
          // Convert to appropriate type
          let value = row[csvColumn]

          // Try to parse numbers
          if (!isNaN(Number(value)) && value !== "") {
            value = Number(value)
          }

          mappedRow[dbColumn] = value
        }
      })

      // Insert into database
      const { error } = await supabase.from(tableName).insert(mappedRow)

      if (error) {
        result.failed++
        result.errors.push(`Row ${i + 1}: ${error.message}`)
      } else {
        result.imported++
      }
    } catch (error) {
      result.failed++
      result.errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  result.success = result.failed === 0

  return result
}

/**
 * Get table schema information
 */
export const TABLE_SCHEMAS: Record<string, { columns: string[]; required: string[] }> = {
  nyc_activities: {
    columns: [
      "activity_name",
      "category",
      "region",
      "year",
      "beneficiaries",
      "male",
      "female",
      "status",
      "description",
      "funding_partner",
    ],
    required: ["activity_name", "region", "year"],
  },
  nsc_participants: {
    columns: [
      "name",
      "gender",
      "age",
      "sport",
      "category",
      "level",
      "region",
      "date_registered",
      "status",
      "contact",
      "achievements",
    ],
    required: ["name", "sport", "region"],
  },
  nyss_programs: {
    columns: [
      "program_name",
      "sector",
      "region",
      "institution",
      "year",
      "total_graduates",
      "male_graduates",
      "female_graduates",
      "employment_rate",
    ],
    required: ["program_name", "sector", "region", "year"],
  },
  nyss_graduates: {
    columns: ["name", "gender", "age", "region", "training_program", "sector", "graduation_year", "employment_status"],
    required: ["name", "training_program", "graduation_year"],
  },
  registered_youth_orgs: {
    columns: [
      "organization_name",
      "acronym",
      "region",
      "contact_person",
      "contact_no",
      "email",
      "date_established",
      "registered_with",
      "intervention_area",
    ],
    required: ["organization_name", "region"],
  },
  indicator_data: {
    columns: ["indicator", "category", "organization", "region", "year", "male", "female", "total", "reference_source"],
    required: ["indicator", "category", "year"],
  },
  human_trafficking: {
    columns: ["year", "lga", "ageGroup", "male", "female", "total"],
    required: ["year", "lga", "ageGroup"],
  },
  youth_migration: {
    columns: ["year", "origin", "destination", "male", "female", "total"],
    required: ["year", "origin", "destination"],
  },
  youth_population: {
    columns: [
      "lga",
      "total_population",
      "youth_population",
      "male_youth",
      "female_youth",
      "urban_youth",
      "rural_youth",
      "youth_share",
    ],
    required: ["lga", "total_population", "youth_population"],
  },
  youth_with_disabilities: {
    columns: [
      "age_group",
      "male",
      "female",
      "total",
      "urban",
      "rural",
      "seeing",
      "hearing",
      "physical",
      "learning",
      "selfcare",
      "speech",
    ],
    required: ["age_group"],
  },
  youth_without_disabilities: {
    columns: ["age_group", "male", "female", "total", "urban", "rural"],
    required: ["age_group"],
  },
}
