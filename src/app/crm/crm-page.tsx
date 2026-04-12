import { PageHeader } from '@/components/page-header';
import { Breadcrumb } from '@/components/breadcrumb';
import { PushNotificationCRM } from '@/app/crm/components/push';
import { PushNotificationCRMTable } from '@/app/crm/components/push/table.tsx';

export function CrmPage() {
  return (
    <div className="grid gap-4">
      <Breadcrumb items={[{ title: 'CRM' }]} />
      <PageHeader subtitle="Customer Relations Management">CRM</PageHeader>

      <div className="grid grid-cols-3 gap-4">
        <PushNotificationCRM />
      </div>

      <PushNotificationCRMTable />
    </div>
  );
}
