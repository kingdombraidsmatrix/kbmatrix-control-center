import { Link, useLocation } from '@tanstack/react-router';
import { useCallback } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { NavList } from '@/components/layout/navlist.constant.ts';
import { SidebarUser } from '@/components/layout/sidebar-user.tsx';
import { cn } from '@/lib/utils.ts';

export function AppSidebar() {
  const { pathname } = useLocation();

  const isActive = useCallback(
    (path: string) => {
      if (path === pathname) return true;
      return path !== '/' && pathname.startsWith(path);
    },
    [pathname],
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 pb-0">
          <img src="/images/kbmatrix-logo.svg" alt="kbmatrix-logo" className="size-10" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NavList.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    className={cn(
                      isActive(item.path ?? '/') &&
                        'bg-primary/10 hover:bg-primary/20 text-primary! font-semibold',
                      'h-10',
                    )}
                    asChild
                  >
                    <Link to={item.path}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
