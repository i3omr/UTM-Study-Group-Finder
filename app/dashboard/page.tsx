import { AppSidebar } from "@/components/app-sidebar"
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

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 "> 
            <div className=" aspect-video rounded-xl bg-muted/50" > <Mycomponent text1={"User Count"} text2={"Live Count"} usercount={"23"}/>  </div>
            <div className=" aspect-video rounded-xl bg-muted/50" > <Mycomponent text1={"User Online"} text2={"Live Count"} usercount={"30"}/> </div>
            <div className=" aspect-video rounded-xl bg-muted/50" > <Mycomponent text1={"Study Groups"} text2={"Live Count"} usercount={"5"}/> </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"> <DataTable /> </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
