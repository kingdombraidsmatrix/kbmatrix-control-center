import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { PlanRequest } from '@/types/plans.ts';
import { FeeType } from '@/types/plans.ts';
import { useCreatePlanService } from '@/services/plans/use-create-plan-service.ts';

export function usePlanCreate() {
  const formSchema = z.object({
    name: z.string().min(1, 'Plan name is required'),
    description: z
      .string()
      .min(10, 'Plan description should be more than 10 characters')
      .max(255, 'Cannot be more than 255 characters'),
    trialDays: z.coerce.number().default(0),
    monthlyPrice: z.coerce.number(),
    annualPrice: z.coerce.number(),
    hasDiscount: z.boolean().default(false),
    discountMonthlyPrice: z.coerce.number().default(0),
    discountAnnualPrice: z.coerce.number().default(0),
    countryCode: z.string().length(2, 'Invalid country code'),
    features: z.array(
      z.object({
        feature: z.string().min(1, 'Feature is required'),
        description: z.string().min(1, 'Feature description is required'),
        value: z
          .string()
          .or(z.coerce.number())
          .or(z.boolean())
          .or(
            z.object({
              feeType: z.enum([FeeType.FLAT, FeeType.PERCENTAGE]),
              amount: z.coerce.number().min(0, 'Cannot be less than zero (0)'),
              capped: z.boolean(),
              cappedAmount: z.coerce.number().min(0, 'Cannot be less than zero (0)'),
              currencyCode: z.coerce.string().length(3, 'Invalid currency code'),
            }),
          ),
      }),
    ),
    public: z.boolean().default(false),
  });

  const form = useForm<PlanRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      trialDays: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      hasDiscount: false,
      discountMonthlyPrice: 0,
      discountAnnualPrice: 0,
      countryCode: '',
      features: [],
      public: false,
    },
  });

  const { mutateAsync } = useCreatePlanService();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (value: PlanRequest) => {
      try {
        await mutateAsync(value);
        await navigate({ to: '/settings/plans', replace: true });
        toast.success('Plan created successfully.', { description: 'Successfully created' });
      } catch (err) {
        toast.error('Error creating Plan');
        console.error(err);
      }
    },
    [mutateAsync],
  );

  return {
    form,
    onSubmit,
  };
}
