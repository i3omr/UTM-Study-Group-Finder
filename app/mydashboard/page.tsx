import { Mydashboardsidebar } from "@/components/mydashboardsidebar"
import { prisma } from "@/util/prisma"

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
import { Mycomponent } from "@/components/ui/mycomponent"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Studentcoursetable } from "@/components/ui/studentcoursetable"
import Useroverview from "@/components/ui/useroverview";
import { group } from "console";
import { getNumberOfGroups, getNumberOfGroupsForUser, getNumberOfUsers, getUserInfo } from "@/prisma/user/userqueries"


export default async function Page() {
  
  const user = await getUserInfo("b3590661-7620-418e-9df7-17bc01dc562e");
  return (
    <SidebarProvider>
      <Mydashboardsidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {
            
             <Useroverview name ={user?.name?? "Guest"} /*email={user.email} major={user.major}*/ />

          }
          <br/>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 "> 
            { <div className=" aspect-video rounded-xl bg-muted/50 " > <Mycomponent text1={"My Active Study Groups"} text2={"Live Count"} usercount={getNumberOfGroupsForUser("b3590661-7620-418e-9df7-17bc01dc562e")}/>  </div> }
            <div className=" aspect-video rounded-xl bg-muted/50" > <Mycomponent text1={"Study Groups Available"} text2={"Live Count"} usercount={getNumberOfGroups()}/> </div>
            <div className=" aspect-video rounded-xl bg-muted/50" >  <Mycomponent text1={"Number Of Users"} text2={"Live Count"} usercount={getNumberOfUsers()}/></div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"> <Studentcoursetable /> </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
