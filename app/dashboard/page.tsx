import { AppSidebar } from "@/components/app-sidebar"
import { Mydashboardsidebar } from "@/components/mydashboardsidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { LogoutButton } from "@/components/ui/logout-button"
import { Mycomponent } from "@/components/ui/mycomponent"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Studentcoursetable } from "@/components/ui/studentcoursetable"
import Useroverview from "@/components/ui/useroverview"
import { getNumberOfGroupsForUser, getNumberOfGroups, getNumberOfUsers } from "@/prisma/user/userqueries"

export default function Page() {
  return (
    <SidebarProvider>
      <Mydashboardsidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb></Breadcrumb>
          </div>
          <div className="px-3">
            <LogoutButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {
            <Useroverview name={""}              /* email={user.email} major={user.major} */
            />
          }
          <br />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
            {
              <div className=" aspect-video rounded-xl bg-muted/50 font-bold">
                <Mycomponent
                  text1={"My Active Study Groups"}
                  text2={"Live Count"}
                />
              </div>
            }
            <div className=" aspect-video rounded-xl bg-muted/50  font-bold">
              <Mycomponent
                text1={"Study Groups Available"}
                text2={"Live Count"}
                usercount={getNumberOfGroups()}
              />
            </div>
            <div className=" aspect-video rounded-xl bg-muted/50  font-bold">
              <Mycomponent
                text1={"Number Of Users"}
                text2={"Live Count"}
                usercount={getNumberOfUsers()}
              />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
