import { PageHeader } from '@/components/page-header';
import { Breadcrumb } from '@/components/breadcrumb';
import { PushNotificationCRM } from '@/app/crm/components/push';

export function CrmPage() {
  return (
    <div className="grid gap-4">
      <Breadcrumb items={[{ title: 'CRM' }]} />
      <PageHeader subtitle="Customer Relations Management">CRM</PageHeader>

      <div className="grid grid-cols-3 gap-4">
        <PushNotificationCRM />
      </div>
    </div>
  );
}
