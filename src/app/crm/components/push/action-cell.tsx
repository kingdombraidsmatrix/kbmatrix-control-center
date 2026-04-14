import { useShallow } from 'zustand/react/shallow';
import { Ellipsis, Trash2 } from 'lucide-react';
import { isBefore } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import type { BroadcastPushListItem } from '@/types/crm.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useCrmStore } from '@/app/crm/store/crm-store.ts';
import { confirmPrompt } from '@/utils';
import { useDeleteCrmPushMessage } from '@/services/crm';
import { handleHttpError } from '@/lib/utils.ts';

interface PushNotificationActionCellProps {
  row: BroadcastPushListItem;
}
export function PushNotificationActionCell({ row }: PushNotificationActionCellProps) {
  const openPushModal = useCrmStore(useShallow((state) => state.openPushModal));

  const { mutateAsync } = useDeleteCrmPushMessage();

  const handleDelete = useCallback(async () => {
    try {
      await mutateAsync(row.id);
      toast.success('Successfully deleted');
    } catch (error) {
      handleHttpError(error);
      throw error;
    }
  }, [mutateAsync]);

  const cannotEdit = useMemo(
    () =>
      !row.scheduled || (!!row.scheduledTime && isBefore(new Date(row.scheduledTime), Date.now())),
    [row],
  );

  const handleDeleteClick = useCallback(() => {
    confirmPrompt({
      title: 'Are you sure?',
      message: 'Deleting this message is not reversible and is lost forever',
      icon: Trash2,
      variant: 'destructive',
      confirmButton: {
        label: 'Delete',
        variant: 'destructive',
        onClick: handleDelete,
      },
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={cannotEdit} onClick={() => openPushModal(row.id, 'edit')}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openPushModal(row.id, 'duplicate')}>
            Create copy
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
