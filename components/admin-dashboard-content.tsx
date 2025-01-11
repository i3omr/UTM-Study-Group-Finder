"use client"

import { Mydashboardsidebar } from "@/components/mydashboardsidebar";
import {
  Breadcrumb,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminUsersTable } from "@/components/ui/admin-users-table";
import { AdminGroupsTable } from "@/components/ui/admin-groups-table";
import { AdminOverview } from "@/components/ui/admin-overview";
import { useState } from "react";

interface AdminDashboardContentProps {
  users: any[];
  groups: any[];
  totalUsers: number;
  totalGroups: number;
}

export function AdminDashboardContent({ 
  users, 
  groups, 
  totalUsers, 
  totalGroups 
}: AdminDashboardContentProps) {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <SidebarProvider>
      <Mydashboardsidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <span>Admin Dashboard</span>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <AdminOverview totalUsers={totalUsers} totalGroups={totalGroups} />
          
          <div className="flex gap-2 border-b">
            <button
              className={`px-4 py-2 ${activeTab === "users" ? "border-b-2 border-primary font-semibold" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users Management
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "groups" ? "border-b-2 border-primary font-semibold" : ""}`}
              onClick={() => setActiveTab("groups")}
            >
              Groups Management
            </button>
          </div>
          
          <div className="mt-4">
            {activeTab === "users" ? (
              <div className="rounded-xl bg-muted/50 p-4">
                <AdminUsersTable users={users} />
              </div>
            ) : (
              <div className="rounded-xl bg-muted/50 p-4">
                <AdminGroupsTable groups={groups} />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 