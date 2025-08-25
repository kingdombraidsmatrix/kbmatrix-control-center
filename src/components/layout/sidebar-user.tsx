import { LogOut, MoreHorizontal, ShieldAlert, User2 } from 'lucide-react';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useAuthStore } from '@/stores/auth/auth.store.ts';
import { useGetUserDetails } from '@/services/auth';

export function SidebarUser() {
  const { clearToken, user, setUser } = useAuthStore();
  const { data } = useGetUserDetails();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <div className="flex gap-2 p-2 rounded-lg">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm truncate">{user?.fullName}</p>
        <p className="text-xs truncate text-muted-foreground">{user?.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="secondary">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User2 /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShieldAlert /> Security
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={clearToken}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
