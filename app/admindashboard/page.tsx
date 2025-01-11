import { redirect } from "next/navigation";
import { prisma } from "@/util/prisma";
import { verifySession } from "@/lib/session";
import { AdminDashboardContent } from "@/components/admin-dashboard-content";
import { getUserInfo } from "@/prisma/user/userqueries";

export default async function AdminDashboardPage() {
  // Verify session and get user details
  const { userId } = await verifySession();
  const user = await getUserInfo(userId);
  if(user?.role!=='admin'){
    redirect("/mydashboard");
  }
  
  

  // Fetch all users and groups for admin
  const users = await prisma.user.findMany({
    include: {
      groups: true,
    },
  });

  const groups = await prisma.group.findMany({
    include: {
      members: true,
    },
  });

  const totalUsers = await prisma.user.count();
  const totalGroups = await prisma.group.count();

  return (
    <AdminDashboardContent 
      users={users} 
      groups={groups} 
      totalUsers={totalUsers} 
      totalGroups={totalGroups}
    />
  );
}
