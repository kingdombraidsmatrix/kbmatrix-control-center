import { MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'

export function SidebarUser() {
  return (
    <div className="flex gap-2 p-2 rounded-lg">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm truncate">Raheem Adebayo</p>
        <p className="text-xs truncate text-muted-foreground">admin@kbmatrix.com</p>
      </div>
      <Button size="icon" variant="secondary">
        <MoreHorizontal />
      </Button>
    </div>
  )
}
