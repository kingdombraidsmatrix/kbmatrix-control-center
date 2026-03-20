import { useForm, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodIssueCode, z } from 'zod';
import { SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormField } from '@/components/ui/form.tsx';
import { CheckboxInput, TextInput, Textarea } from '@/components/text-input';
import { CustomerSelect } from '@/components/shared/customer-select';
import { StylistSelect } from '@/components/shared/stylist-select';
import { FieldError } from '@/components/ui/field.tsx';
import { useCrmPushNotificationService } from '@/services/crm/use-crm-push-notification-service.ts';
import { handleHttpError } from '@/lib/utils.ts';

const formSchema = z
  .object({
    title: z.string().max(100, 'Title too long, max length is 100').optional(),
    subtitle: z.string().max(100, 'Subtitle too long, max length is 100').optional(),
    body: z
      .string()
      .min(1, 'Message body is required')
      .max(512, 'Message too long, max length is 512'),
    allUsers: z.boolean().default(false).optional(),
    allStylists: z.boolean().default(false).optional(),
    userIds: z.set(z.number()).default(new Set<number>()).optional(),
    stylistIds: z.set(z.number()).default(new Set<number>()).optional(),
    target: z.any().optional(),
  })
  .superRefine((data, context) => {
    if (!data.allUsers && !data.allStylists && !data.userIds?.size && !data.stylistIds?.size) {
      context.addIssue({
        path: ['target'],
        code: ZodIssueCode.custom,
        message: 'At least one target group is required',
      });
    }
  });

type FormType = z.infer<typeof formSchema>;

interface PushNotificationFormProps {
  close: () => void;
}
export function PushNotificationForm({ close }: PushNotificationFormProps) {
  const { mutateAsync } = useCrmPushNotificationService();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      subtitle: '',
      body: '',
      allUsers: false,
      allStylists: false,
      userIds: new Set(),
      stylistIds: new Set(),
    },
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      mutateAsync({
        title: values.title,
        subtitle: values.subtitle,
        body: values.body,
        allStylists: values.allStylists,
        allUsers: values.allUsers,
        userIds: values.userIds?.size ? Array.from(values.userIds) : undefined,
        stylistIds: values.stylistIds?.size ? Array.from(values.stylistIds) : undefined,
      })
        .then(() => {
          toast.success('Push notification scheduled successfully.');
          close();
        })
        .catch((error) => handleHttpError(error, form));
    },
    [form, mutateAsync],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-5 gap-4">
        <div className="col-span-2 bg-[url(/images/ios-wallpaper.jpeg)] bg-cover bg-no-repeat bg-center min-h-[40rem] p-6 relative">
          <NotificationDemo />
        </div>
        <div className="col-span-3 p-6 pl-0 flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Push Notifications</DialogTitle>
            <DialogDescription>Send broadcast push notifications to users</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <TextInput control={form.control} name="title" label="Title" placeholder="Title" />

            <TextInput
              control={form.control}
              name="subtitle"
              label="Subtitle"
              placeholder="Subtitle"
            />

            <Textarea control={form.control} name="body" label="Body" placeholder="Body" />

            <div>
              <h6 className="font-semibold mb-2">Targeting</h6>

              <FormField
                name="target"
                control={form.control}
                render={({ fieldState }) => (
                  <FieldError errors={[fieldState.error]} className="mb-4" />
                )}
              />

              <div className="grid gap-2">
                <CheckboxInput control={form.control} name="allUsers" label="All Customers" />

                <CheckboxInput control={form.control} name="allStylists" label="All Stylists" />

                <CustomerSelect control={form.control} name="userIds" className="mt-2" />

                <StylistSelect control={form.control} name="stylistIds" className="mt-2" />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-auto">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              Send <SendHorizonal />
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}

function NotificationDemo() {
  const { watch } = useFormContext<FormType>();
  const [title, subtitle, body] = watch(['title', 'subtitle', 'body']);

  return (
    <div className="absolute bottom-20 w-[calc(100%_-_2rem)] bg-white/80 p-3 backdrop-blur-sm left-4 rounded-xl h-auto font-[SF-Pro]">
      <p className="text-xs">KBMatrix</p>
      <p className="text-sm font-semibold">{title || 'Title'}</p>
      <p className="text-sm font-semibold">{subtitle || 'Subtitle'}</p>
      <p className="text-sm">{body || 'Body'}</p>
    </div>
  );
}
