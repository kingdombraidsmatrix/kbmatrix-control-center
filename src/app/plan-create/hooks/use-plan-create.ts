import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type BaseSyntheticEvent, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { PlanRequest } from '@/types/plans.ts';
import { FeeType } from '@/types/plans.ts';
import { useCreatePlanService } from '@/services/plans/use-create-plan-service.ts';
import { useGetPlanService } from '@/services/plans/use-get-plan-service.ts';
import { transformPlanToPlanRequest } from '@/app/plan-create/util.ts';
import { useUpdatePlanService } from '@/services/plans';

export function usePlanCreate() {
  const { planId } = useParams({ from: '/_auth/settings/plans/$planId' });
  const isEdit = useMemo(() => planId !== 'new' && !isNaN(Number(planId)), [planId]);
  const { data: existingPlan, isLoading } = useGetPlanService(isEdit ? Number(planId) : undefined);

  const formSchema = z.object({
    id: z.number().optional(),
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
          .or(z.boolean())
          .or(z.coerce.number())
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

  useEffect(() => {
    if (isEdit && existingPlan) {
      form.reset(transformPlanToPlanRequest(existingPlan));
    }
  }, [isEdit, existingPlan, form]);

  const { mutateAsync: createPlan } = useCreatePlanService();
  const { mutateAsync: updatePlan } = useUpdatePlanService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = useCallback(
    async (value: PlanRequest, event?: BaseSyntheticEvent) => {
      try {
        const isPublish = (event?.nativeEvent as any).submitter?.name === 'publish';

        const fn = isEdit ? updatePlan : createPlan;
        const response = await fn({ ...value, public: isPublish });

        await queryClient.invalidateQueries({ queryKey: ['plans'] });
        await queryClient.invalidateQueries({ queryKey: ['plan', response.data.id] });

        await navigate({ to: '/settings/plans', replace: true });
        toast.success('Successfully.', {
          description: `"${response.data.name}" ${isEdit ? 'updated' : 'created'} successfully`,
        });
      } catch (err) {
        toast.error(`Error ${isEdit ? 'creating' : 'updating'} Plan`);
        console.error(err);
      }
    },
    [createPlan, updatePlan, isEdit],
  );

  return {
    form,
    onSubmit,
    isLoading: isEdit && isLoading,
    isEdit,
  };
}
