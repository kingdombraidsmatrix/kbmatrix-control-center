import { useParams } from '@tanstack/react-router';
import type { BreadcrumbItem } from '@/components/breadcrumb';
import { Breadcrumb } from '@/components/breadcrumb';
import { useAuthStore } from '@/stores/auth/auth.store.ts';
import { SideTab } from '@/components/side-tab';
import { profileMenuItems } from '@/app/profile/profile.constants.ts';
import { FALLBACK_PROFILE_PICTURE } from '@/assets/constants.ts';

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const { section } = useParams({
    from: '/_auth/profile/{-$section}',
  });

  const breadcrumbs: Array<BreadcrumbItem> = [
    {
      title: 'Profile',
      url: '/profile/{-$section}',
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="grid gap-y-6">
      <Breadcrumb items={breadcrumbs} />

      <div className="flex items-center gap-3">
        <div className="size-20 overflow-hidden rounded-2xl">
          <img
            src={user.image || FALLBACK_PROFILE_PICTURE}
            alt="profile image"
            className="size-full object-cover object-center"
          />
        </div>
        <div className="leading-none space-y-1">
          <h3 className="font-semibold">{user.fullName}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <SideTab items={profileMenuItems} activeTab={section} pageId="/profile/{-$section}" />
    </div>
  );
}
