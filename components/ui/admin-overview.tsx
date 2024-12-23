import { Card } from "@/components/ui/card"

interface AdminOverviewProps {
  totalUsers: number;
  totalGroups: number;
}

export function AdminOverview({ totalUsers, totalGroups }: AdminOverviewProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Card className="p-7">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground text-center">Total Users</p>
          <p className="text-2xl font-bold text-center">{totalUsers}</p>
        </div>
      </Card>
      <Card className="p-7">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground text-center">Total Groups</p>
          <p className="text-2xl font-bold text-center">{totalGroups}</p>
        </div>
      </Card>
    </div>
  )
} 