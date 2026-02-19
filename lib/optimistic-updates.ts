import { createClient } from "@/lib/supabase/client"

/**
 * Optimistic update helper that instantly updates UI before database confirms
 * This makes the UI feel instant instead of waiting for database roundtrips
 */
export async function optimisticUpdate<T extends { id: string }>(
  tableName: string,
  operation: "insert" | "update" | "delete",
  data: T[] | T,
  currentData: T[],
  setData: (data: T[]) => void,
  mapFunction: (dbItem: any) => T,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  if (operation === "insert") {
    const newItems = Array.isArray(data) ? data : [data]
    setData([...currentData, ...newItems])
  } else if (operation === "update" && !Array.isArray(data)) {
    setData(currentData.map((item) => (item.id === data.id ? data : item)))
  } else if (operation === "delete") {
    const idsToDelete = Array.isArray(data) ? data.map((d) => d.id) : [data.id]
    setData(currentData.filter((item) => !idsToDelete.includes(item.id)))
  }

  try {
    if (operation === "insert") {
      const { error } = await supabase.from(tableName).insert(Array.isArray(data) ? data : [data])
      if (error) throw error
    } else if (operation === "update" && !Array.isArray(data)) {
      const { error } = await supabase.from(tableName).update(data).eq("id", data.id)
      if (error) throw error
    } else if (operation === "delete") {
      const ids = Array.isArray(data) ? data.map((d) => d.id) : [data.id]
      const { error } = await supabase.from(tableName).delete().in("id", ids)
      if (error) throw error
    }

    return { success: true }
  } catch (error: any) {
    const { data: rollbackData } = await supabase.from(tableName).select("*").order("id", { ascending: true })
    if (rollbackData) {
      setData(rollbackData.map(mapFunction))
    }
    return { success: false, error: error.message }
  }
}
