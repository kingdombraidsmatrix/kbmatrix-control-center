import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';
import type { Plan } from '@/types/plans.ts';
import { useUpdatePlanService } from '@/services/plans';
import { Switch } from '@/components/ui/switch.tsx';
import { transformPlanToPlanRequest } from '@/app/plan-create/util.ts';

interface PublishPlanToggleProps {
  plan: Plan;
}
export function PublishPlanToggle({ plan }: PublishPlanToggleProps) {
  const { mutateAsync, isPending } = useUpdatePlanService();
  const queryClient = useQueryClient();

  const togglePlan = useCallback(
    async (checked: boolean) => {
      try {
        const request = transformPlanToPlanRequest(plan);
        await mutateAsync({ ...request, public: checked });
        toast.success(`"${plan.name}" has been ${checked ? 'published' : 'unpublished'}`);
        await queryClient.invalidateQueries({ queryKey: ['plans'] });
        await queryClient.invalidateQueries({ queryKey: ['plan', plan.id] });
      } catch (error) {
        console.error(error);
        toast.error(`Unable to ${checked ? 'publish' : 'depublish'} "${plan.name}"`);
      }
    },
    [plan, mutateAsync, queryClient],
  );

  return <Switch checked={plan.public} onCheckedChange={togglePlan} disabled={isPending} />;
}
