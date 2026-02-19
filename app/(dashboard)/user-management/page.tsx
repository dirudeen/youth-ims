import { AuthCheck } from "@/components/auth-check"
import { UserManagementClient } from "@/components/user-management-client"

export default function UserManagementPage() {
  return (
    <AuthCheck requireRole="admin">
      <UserManagementClient />
    </AuthCheck>
  )
}
