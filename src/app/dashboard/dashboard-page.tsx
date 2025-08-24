import { BriefcaseBusiness, Ticket, Users } from 'lucide-react'
import { StatCard } from '@/components/stat-card'

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="All Users"
          color="amber"
          value={66483664}
          icon={Users}
        />
        <StatCard
          title="All Stylists"
          color="indigo"
          value={28364}
          icon={BriefcaseBusiness}
        />
        <StatCard
          title="All Booking"
          color="primary"
          value={939}
          icon={Ticket}
        />
      </div>
    </div>
  )
}
