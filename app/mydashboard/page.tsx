import { Mydashboardsidebar } from "@/components/mydashboardsidebar"
import { prisma } from "@/util/prisma"

async function getUsers() {
  const users= await prisma.user.findMany({})
  return users;
}

export async function getNumberOfUsers() {
  const userCount = await prisma.user.count();
  return userCount;
}

export async function getNumberOfGroups() {
  const groupCount = await prisma.group.count();
  return groupCount;
}

export async function getNumberOfGroupsForUser(userId: string) {
  const groupCount = await prisma.group.count({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
  });

  return groupCount;
}

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


export default async function Page() {
  const users = await getUsers();
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
            users.map((user)=>{
              return(
                <Useroverview name ={user.name} /*email={user.email} major={user.major}*/ />
              )
            })
          }
          <br/>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 "> 
            { <div className=" aspect-video rounded-xl bg-muted/50 " > <Mycomponent text1={"My Courses"} text2={"Live Count"} usercount={getNumberOfGroupsForUser()}/>  </div> }
            <div className=" aspect-video rounded-xl bg-muted/50" > <Mycomponent text1={"Study Groups Available"} text2={"Live Count"} usercount={getNumberOfGroups()}/> </div>
            <div className=" aspect-video rounded-xl bg-muted/50" >  <Mycomponent text1={"Number Of Users"} text2={"Live Count"} usercount={getNumberOfUsers()}/></div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"> <Studentcoursetable /> </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
