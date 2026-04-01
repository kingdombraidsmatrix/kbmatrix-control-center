import { ChevronDownIcon, SquarePen } from 'lucide-react';
import { useForm, useFormContext } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { addMonths, endOfDay, endOfToday, startOfDay, startOfToday } from 'date-fns';
import { formatDateRange } from 'little-date';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { DateRange } from 'react-day-picker';
import type { Stylist } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { CheckboxInput, SelectInput } from '@/components/text-input';
import { useGetPlansService, useManageSubscription } from '@/services/plans';
import { BillingFrequency } from '@/types/plans.ts';
import { handleHttpError } from '@/lib/utils.ts';

interface ManageSubscriptionProps {
  stylist: Stylist;
}
export function ManageSubscription({ stylist }: ManageSubscriptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Alert variant="warning">
        <SquarePen />
        <AlertTitle>Manage Subscription</AlertTitle>
        <AlertDescription>
          <p className="text-sm">Apply new plan to stylist</p>
          <Button variant="default" onClick={() => setIsOpen(true)}>
            Manage
          </Button>
        </AlertDescription>
      </Alert>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>Apply new plan to stylist</DialogDescription>
          </DialogHeader>
          <ManageSubscriptionForm stylist={stylist} onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const formSchema = z.object({
  planId: z.coerce.number(),
  chargeStylist: z.boolean().default(false),
  enforceImmediately: z.boolean().default(true),
  billingFrequency: z.nativeEnum(BillingFrequency),
  startDate: z.date(),
  endDate: z.date(),
});

type FormType = z.infer<typeof formSchema>;

interface ManageSubscriptionFormProps {
  stylist: Stylist;
  onClose: () => void;
}
function ManageSubscriptionForm({ stylist, onClose }: ManageSubscriptionFormProps) {
  const { mutateAsync, isPending } = useManageSubscription();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: startOfToday(),
      endDate: addMonths(endOfToday(), 1),
      billingFrequency: BillingFrequency.MONTHLY,
      enforceImmediately: true,
      chargeStylist: false,
    },
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      mutateAsync({ ...values, stylistId: stylist.id })
        .then(() => {
          toast.success('Request successfully sent');
          onClose();
        })
        .catch((err) => handleHttpError(err, form));
    },
    [mutateAsync, stylist, onClose],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6">
          <PlansSelect stylist={stylist} />

          <SubscriptionDuration />

          <SelectInput
            control={form.control}
            name="billingFrequency"
            options={[
              { label: 'Monthly', value: BillingFrequency.MONTHLY },
              { label: 'Annually', value: BillingFrequency.ANNUALLY },
            ]}
            label="Billing Frequency"
            description="Billing frequency after the set duration"
            placeholder="Select billing frequency"
          />

          <CheckboxInput
            control={form.control}
            name="enforceImmediately"
            label="Enforce Immediately"
            description="If the new plan should be applied immediately or wait till the end of the current subscription"
          />

          <CheckboxInput
            control={form.control}
            name="chargeStylist"
            label="Charge Stylist"
            description="Should the cost of this subscription be charged to the stylist's primary payment method"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

function SubscriptionDuration() {
  const [open, setOpen] = useState(false);
  const { watch, setValue } = useFormContext<FormType>();

  const [startDate, endDate] = watch(['startDate', 'endDate']);

  const dateRange = useMemo(
    () => ({
      from: startDate,
      to: endDate,
    }),
    [startDate, endDate],
  );

  const formattedDateRange = useMemo(
    () => formatDateRange(dateRange.from, dateRange.to),
    [dateRange],
  );

  const onChange = useCallback(
    (newValue: DateRange) => {
      !!newValue.from && setValue('startDate', startOfDay(newValue.from));
      !!newValue.to && setValue('endDate', endOfDay(newValue.to));
    },
    [setValue],
  );

  return (
    <div className="space-y-2">
      <Label>Duration</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full h-10 justify-between font-normal">
            {formattedDateRange || 'Select date range'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onChange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function PlansSelect({ stylist }: { stylist: Stylist }) {
  const { control } = useFormContext<FormType>();
  const { data, isLoading } = useGetPlansService({ countryCode: stylist.countryCode });

  const options = useMemo(
    () => data?.map((plan) => ({ label: plan.name, value: plan.id.toString() })) ?? [],
    [data],
  );

  return (
    <SelectInput
      control={control}
      name="planId"
      options={options}
      disabled={isLoading}
      label="Plan"
      placeholder={isLoading ? 'Loading plans...' : 'Select plan'}
    />
  );
}
