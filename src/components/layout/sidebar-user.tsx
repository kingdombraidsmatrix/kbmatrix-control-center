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
import { Link } from '@tanstack/react-router';

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
          <DropdownMenuItem asChild>
            <Link to="/profile/{-$section}" params={{ section: undefined }}>
              <User2 /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/{-$section}" params={{ section: 'security' }}>
              <ShieldAlert /> Security
            </Link>
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
