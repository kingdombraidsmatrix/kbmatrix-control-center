import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import { PushNotificationForm } from '@/app/crm/components/push/form.tsx';
import { useCrmStore } from '@/app/crm/store/crm-store.ts';

export function PushNotificationCRMModal() {
  const { isPushModalOpen, closePushModal } = useCrmStore();

  return (
    <Dialog open={isPushModalOpen} onOpenChange={closePushModal}>
      <DialogContent className="w-4xl p-0 !max-w-[unset] overflow-hidden">
        <PushNotificationForm />
      </DialogContent>
    </Dialog>
  );
}
