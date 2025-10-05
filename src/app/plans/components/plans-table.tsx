import { useCallback, useEffect, useState } from 'react';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { toast } from 'sonner';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import type { DragEndEvent } from '@dnd-kit/core';
import type { Plan } from '@/types/plans.ts';
import { useRearrangePlansService } from '@/services/plans';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';

interface PlansTableProps {
  plans: Array<Plan>;
}
export function PlansTable({ plans }: PlansTableProps) {
  const [state, setState] = useState<Array<Plan>>(plans);
  const { mutateAsync: saveRearrangement } = useRearrangePlansService();
  const queryClient = useQueryClient();

  useEffect(() => {
    setState(plans);
  }, [plans]);

  const handlePersistRearrangement = useCallback(
    async (ids: Array<number>, oldArray: Array<Plan>) => {
      try {
        const response = await saveRearrangement(ids);
        setState(response.data);
        toast.success('Rearrangement saved successfully');
        await queryClient.invalidateQueries({ queryKey: ['plans'] });
      } catch (e) {
        console.error(e);
        toast.error('Unable to save rearrangement');
        setState(oldArray);
      }
    },
    [saveRearrangement, setState],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldArray = [...state];
        const oldIndex = state.findIndex((item) => item.id.toString() === active.id);
        const newIndex = state.findIndex((item) => item.id.toString() === over?.id);
        const finalArray = arrayMove(state, oldIndex, newIndex);
        setState(finalArray);

        const finalArrayIds = finalArray.map((item) => item.id);
        handlePersistRearrangement(finalArrayIds, oldArray);
      }
    },
    [state, handlePersistRearrangement, setState],
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      autoScroll={false}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext
        items={state.map((plan) => plan.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.map((plan) => (
                <TableRow id={plan.id.toString()} key={plan.id} hasGripHandle>
                  <TableCell className="py-4">{plan.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SortableContext>
    </DndContext>
  );
}
