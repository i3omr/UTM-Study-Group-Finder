import { Mydashboardsidebar } from "@/components/mydashboardsidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserInfo } from "@/prisma/user/userqueries";
import { verifySession } from "@/lib/session";
import { UserProfile } from "@/components/ui/user-profile";
import { Toaster } from "sonner";
import { DeleteAccountButton } from '@/components/delete-account-button'

export default async function PageProfile() {
  const { userId } = await verifySession();
  const user = await getUserInfo(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <SidebarProvider>
      <Mydashboardsidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/mydashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6">
          <UserProfile user={user} />
        </div>
        <div className="mt-6 px-6 pb-6">
          <DeleteAccountButton />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
