import { Outlet } from '@tanstack/react-router';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { SettingsMenu } from '@/app/settings/settings-menu.tsx';

export function SettingsPage() {
  return (
    <div>
      <PageHeader subtitle="Manage platform settings" title="Settings" />

      <div className="grid grid-cols-[minmax(0,_20rem)_minmax(0,_1fr)] mt-8 gap-6">
        <SettingsMenu />
        <div>
          <Card className="shadow-none">
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
