"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserMinus,
  Activity,
  FileText,
  BarChart3,
  Building2,
  Trophy,
  GraduationCap,
  Globe,
  UserCircle,
  AlertTriangle,
  Award,
  DollarSign,
} from "lucide-react"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <SidebarPrimitive>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
            <img
              src="/images/moys-logo.jpg"
              alt="Ministry of Youth and Sports Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">Youth IMS</h2>
            <p className="text-xs text-gray-500">Ministry of Youth & Sports</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-sky-500" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Youth Population */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/youth-population"}>
                  <Link href="/youth-population" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-violet-500" />
                    <span>Youth Population</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Youth with Disabilities */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/youth-with-disabilities"}>
                  <Link href="/youth-with-disabilities" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-violet-500" />
                    <span>Youth with Disabilities</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Youth without Disabilities */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/youth-without-disabilities"}>
                  <Link href="/youth-without-disabilities" className="flex items-center gap-2">
                    <UserMinus className="h-4 w-4 text-violet-500" />
                    <span>Youth without Disabilities</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Human Trafficking */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/human-trafficking"}>
                  <Link href="/human-trafficking" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Human Trafficking</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Youth Migration */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/youth-migration"}>
                  <Link href="/youth-migration" className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-red-500" />
                    <span>Youth Migration</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* NYC Activities */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/nyc-activities"}>
                  <Link href="/nyc-activities" className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span>NYC</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* NSC */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/nsc"}>
                  <Link href="/nsc" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <span>NSC</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* NYSS */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/nyss"}>
                  <Link href="/nyss" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-orange-500" />
                    <span>NYSS</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* PIA Students */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/pia-students"}>
                  <Link href="/pia-students" className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>PIA</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* NEDI Programs */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/nedi-programs"}>
                  <Link href="/nedi-programs" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-green-500" />
                    <span>NEDI</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Indicator Data */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/indicator-data"}>
                  <Link href="/indicator-data" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <span>Indicator Data</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sports Financing */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/sports-financing"}>
                  <Link href="/sports-financing" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    <span>Sports Financing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Activity Log */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/activity-log"}>
                  <Link href="/activity-log" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>Activity Log</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* User Management */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/user-management"}>
                  <Link href="/user-management" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-gray-500" />
                    <span>User Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-6 py-4">
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <div className="text-center">
            <div>Ministry of Youth & Sports</div>
            <span>© 2025</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </SidebarPrimitive>
  )
}
