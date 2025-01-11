'use client'

import { Sidebar, SidebarHeader, SidebarMain } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  BookOpen, 
  Settings, 
  BarChart2, 
  Shield 
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Shield className="w-6 h-6" />
        <span className="ml-2 text-lg font-semibold">Admin Panel</span>
      </SidebarHeader>
      <SidebarMain>
        <nav className="space-y-2">
          <Button
            variant={pathname === '/admindashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href="/admindashboard">
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant={pathname === '/admindashboard/users' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href="/admindashboard/users">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </Link>
          </Button>
          <Button
            variant={pathname === '/admindashboard/groups' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href="/admindashboard/groups">
              <BookOpen className="mr-2 h-4 w-4" />
              Group Management
            </Link>
          </Button>
          <Button
            variant={pathname === '/admindashboard/settings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href="/admindashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </nav>
      </SidebarMain>
    </Sidebar>
  )
} 