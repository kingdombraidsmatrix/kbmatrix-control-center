import { BellDot } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useCrmStore } from '@/app/crm/store/crm-store.ts';

export function PushNotificationCRM() {
  const { openPushModal } = useCrmStore();

  return (
    <Card className="gap-0 flex-row px-6 shadow-none transition">
      <div className="flex-1">
        <CardHeader className="p-0 gap-0">
          <CardTitle className="text-sm">Broadcast Push Notification</CardTitle>
          <CardDescription>Send broadcast push notification to user devices</CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <Button onClick={() => openPushModal()}>Schedule / Send Now</Button>
        </CardContent>
      </div>
      <div className="size-10 rounded-md flex items-center justify-center bg-emerald-600/10 text-emerald-600">
        <BellDot className="size-5" />
      </div>
    </Card>
  );
}
