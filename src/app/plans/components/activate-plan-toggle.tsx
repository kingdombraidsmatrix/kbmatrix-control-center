import { useCallback } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { Plan } from '@/types/plans.ts';
import { Switch } from '@/components/ui/switch.tsx';
import { useTogglePlanActivation } from '@/services/plans';

interface ActivatePlanToggleProps {
  plan: Plan;
}
export function ActivatePlanToggle({ plan }: ActivatePlanToggleProps) {
  const { mutateAsync, isPending } = useTogglePlanActivation(plan.id);
  const queryClient = useQueryClient();

  const togglePlan = useCallback(
    async (checked: boolean) => {
      try {
        await mutateAsync(checked);
        toast.success(`"${plan.name}" has been ${checked ? 'activated' : 'deactivated'}`);
        await queryClient.invalidateQueries({ queryKey: ['plans'] });
      } catch (error) {
        console.error(error);
        toast.error(`Unable to ${checked ? 'activate' : 'deactivate'} "${plan.name}"`);
      }
    },
    [plan.name, mutateAsync],
  );

  return <Switch checked={plan.active} onCheckedChange={togglePlan} disabled={isPending} />;
}
