import { prisma } from "@/util/prisma";
import { verifySession } from "@/lib/session";
import { AdminDashboardContent } from "@/components/admin-dashboard-content";

export default async function AdminDashboardPage() {
  // Verify session and check if user is admin
  const { userId } = await verifySession();
  
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
