import { useForm, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodIssueCode, z } from 'zod';
import { AlarmClock, ChevronDownIcon, Loader2, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';
import { isBefore, startOfToday } from 'date-fns';
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
import { formatDate, handleHttpError } from '@/lib/utils.ts';
import { Label } from '@/components/ui/label.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx';
import { useGetCrmPushMessage, useUpdateCrmPushMessage } from '@/services/crm';
import { useCrmStore } from '@/app/crm/store/crm-store.ts';

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
    scheduled: z.boolean().default(false).optional(),
    scheduledTime: z.date().min(new Date(), 'Cannot be scheduled for past time').optional(),
  })
  .superRefine((data, context) => {
    if (!data.allUsers && !data.allStylists && !data.userIds?.size && !data.stylistIds?.size) {
      context.addIssue({
        path: ['target'],
        code: ZodIssueCode.custom,
        message: 'At least one target group is required',
      });
    }
    if (data.scheduled && !data.scheduledTime) {
      context.addIssue({
        path: ['scheduledTime'],
        code: ZodIssueCode.custom,
        message: 'Scheduled time is required',
      });
    }
  });

type FormType = z.infer<typeof formSchema>;

export function PushNotificationForm() {
  const { closePushModal: close, selectedMessageId, action } = useCrmStore();

  const { data: selectedMessage, isLoading } = useGetCrmPushMessage(selectedMessageId);

  const { mutateAsync: createMessage } = useCrmPushNotificationService();
  const { mutateAsync: updateMessage } = useUpdateCrmPushMessage();

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
      scheduled: false,
    },
  });

  const { reset } = form;

  const onSubmit = useCallback(
    async (values: FormType) => {
      const data = {
        title: values.title,
        subtitle: values.subtitle,
        body: values.body,
        allStylists: values.allStylists,
        allUsers: values.allUsers,
        userIds: values.userIds?.size ? Array.from(values.userIds) : undefined,
        stylistIds: values.stylistIds?.size ? Array.from(values.stylistIds) : undefined,
        scheduled: values.scheduled,
        scheduledTime: values.scheduledTime,
      };

      try {
        if (selectedMessageId && action === 'edit') {
          await updateMessage({
            id: selectedMessageId,
            ...data,
          });
          toast.success('Push notification updated successfully.');
        } else {
          await createMessage(data);
          toast.success('Push notification scheduled successfully.');
        }
        close();
      } catch (e) {
        handleHttpError(e, form);
      }
    },
    [form, createMessage, updateMessage, close],
  );

  useEffect(() => {
    if (selectedMessage) {
      reset({
        title: selectedMessage.title,
        subtitle: selectedMessage.subtitle,
        body: selectedMessage.body,
        allUsers: selectedMessage.allUsers,
        allStylists: selectedMessage.allStylists,
        userIds: new Set(selectedMessage.users.map((user) => user.id)),
        stylistIds: new Set(selectedMessage.stylists.map((stylist) => stylist.id)),
        scheduled: selectedMessage.scheduled,
        scheduledTime: selectedMessage.scheduledTime
          ? new Date(selectedMessage.scheduledTime)
          : undefined,
      });
    }
  }, [selectedMessage, reset]);

  const defaultSelectedUsers = useMemo(
    () =>
      selectedMessage?.users
        ? new Map(
            selectedMessage.users.map((user) => [
              user.id,
              { label: user.fullName, value: user.id },
            ]),
          )
        : undefined,
    [selectedMessage],
  );

  const defaultSelectedStylists = useMemo(
    () =>
      selectedMessage?.stylists
        ? new Map(
            selectedMessage.stylists.map((stylist) => [
              stylist.id,
              { label: stylist.name, value: stylist.id },
            ]),
          )
        : undefined,
    [selectedMessage],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-5 gap-4">
        <div className="col-span-2 bg-[url(/images/ios-wallpaper.jpeg)] bg-cover bg-no-repeat bg-center min-h-[40rem] p-6 relative">
          <NotificationDemo />
        </div>
        <div className="col-span-3 p-6 pl-0 flex flex-col gap-6 relative">
          {isLoading && (
            <div className="absolute inset-0 size-full z-10 bg-white/80 flex items-center justify-center top-0 left-0 backdrop-blur-xs gap-2">
              <Loader2 className="animate-spin size-6" />
              <p className="text-sm">Loading...</p>
            </div>
          )}
          <DialogHeader>
            <DialogTitle>{action === 'edit' && 'Edit '} Push Notifications</DialogTitle>
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

                <CustomerSelect
                  control={form.control}
                  name="userIds"
                  className="mt-2"
                  defaultSelectedOptions={defaultSelectedUsers}
                />

                <StylistSelect
                  control={form.control}
                  name="stylistIds"
                  className="mt-2"
                  defaultSelectedOptions={defaultSelectedStylists}
                />
              </div>
            </div>

            <div>
              <h6 className="font-semibold mb-2">Delivery</h6>

              <div className="grid gap-2">
                <CheckboxInput control={form.control} name="scheduled" label="Send later" />
                <ScheduledTimeField />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-auto">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}

function SubmitButton() {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<FormType>();

  const isScheduled = watch('scheduled');

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isScheduled ? (
        <>Schedule {isSubmitting ? <Loader2 className="animate-spin" /> : <AlarmClock />}</>
      ) : (
        <>Send now {isSubmitting ? <Loader2 className="animate-spin" /> : <SendHorizonal />}</>
      )}
    </Button>
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

function ScheduledTimeField() {
  const [open, setOpen] = useState(false);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormType>();

  const [scheduled, selectedTime] = watch(['scheduled', 'scheduledTime']);

  const handleChange = useCallback(
    (newDate: Date | undefined) => {
      setValue('scheduledTime', newDate, {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  useEffect(() => {
    if (!scheduled) {
      handleChange(undefined);
    }
  }, [scheduled, handleChange]);

  const hours = useMemo(() => [12, ...Array.from({ length: 11 }, (_, i) => i + 1)], []);

  const handleTimeChange = useCallback(
    (type: 'hour' | 'minute' | 'ampm', value: string) => {
      if (selectedTime) {
        const newDate = new Date(selectedTime);
        if (type === 'hour') {
          newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
        } else if (type === 'minute') {
          newDate.setMinutes(parseInt(value));
        } else {
          const currentHours = newDate.getHours();
          newDate.setHours(value === 'PM' ? currentHours + 12 : currentHours - 12);
        }
        handleChange(newDate);
      }
    },
    [handleChange, selectedTime],
  );

  const formattedDate = useMemo(
    () => (selectedTime ? formatDate(selectedTime) : undefined),
    [selectedTime],
  );

  return (
    <div className="space-y-2">
      <Label>Scheduled Time</Label>

      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger disabled={!scheduled} asChild>
          <Button variant="outline" id="date" className="w-full h-10 justify-between font-normal">
            {formattedDate || 'Select date and time'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <div className="flex">
            <Calendar
              mode="single"
              selected={selectedTime}
              onSelect={handleChange}
              numberOfMonths={1}
              className="border-r"
              disabled={(date) => isBefore(date, startOfToday())}
              required
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        selectedTime && selectedTime.getHours() % 12 === hour % 12
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        selectedTime && selectedTime.getMinutes() === minute ? 'default' : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="">
                <div className="flex sm:flex-col p-2">
                  {['AM', 'PM'].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={
                        selectedTime &&
                        ((ampm === 'AM' && selectedTime.getHours() < 12) ||
                          (ampm === 'PM' && selectedTime.getHours() >= 12))
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('ampm', ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {errors.scheduledTime && (
        <p className="text-destructive text-sm">{errors.scheduledTime.message}</p>
      )}
    </div>
  );
}
