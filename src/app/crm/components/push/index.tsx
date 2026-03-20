import { BellDot } from 'lucide-react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.tsx';
import { PushNotificationForm } from '@/app/crm/components/push/form.tsx';

export function PushNotificationCRM() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="gap-0 flex-row px-6 shadow-none transition">
      <div className="flex-1">
        <CardHeader className="p-0 gap-0">
          <CardTitle className="text-sm">Broadcast Push Notification</CardTitle>
          <CardDescription>Send broadcast push notification to user devices</CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Send Now</Button>
            </DialogTrigger>
            <DialogContent className="w-4xl p-0 !max-w-[unset] overflow-hidden">
              <PushNotificationForm close={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
      <div className="size-10 rounded-md flex items-center justify-center bg-emerald-600/10 text-emerald-600">
        <BellDot className="size-5" />
      </div>
    </Card>
  );
}
