// User Activity Data
export type Activity = {
  id: string
  userId: string
  userName: string
  action: string
  target: string
  details: string
  timestamp: string
  ipAddress: string
}

// Initial activity data
export const activityData: Activity[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    action: "Login",
    target: "System",
    details: "User logged into the system",
    timestamp: "2023-06-15T08:30:45",
    ipAddress: "192.168.1.101",
  },
  {
    id: "2",
    userId: "2",
    userName: "Jane Smith",
    action: "View",
    target: "Youth Population",
    details: "Viewed youth population data",
    timestamp: "2023-06-15T09:15:22",
    ipAddress: "192.168.1.102",
  },
  {
    id: "3",
    userId: "1",
    userName: "John Doe",
    action: "Add",
    target: "Youth with Disabilities",
    details: "Added new entry to youth with disabilities data",
    timestamp: "2023-06-15T10:05:18",
    ipAddress: "192.168.1.101",
  },
  {
    id: "4",
    userId: "3",
    userName: "Michael Johnson",
    action: "Export",
    target: "Youth Migration",
    details: "Exported youth migration data to Excel",
    timestamp: "2023-06-15T11:30:05",
    ipAddress: "192.168.1.103",
  },
  {
    id: "5",
    userId: "2",
    userName: "Jane Smith",
    action: "Edit",
    target: "User Management",
    details: "Updated user profile for Sarah Williams",
    timestamp: "2023-06-15T13:45:30",
    ipAddress: "192.168.1.102",
  },
]
