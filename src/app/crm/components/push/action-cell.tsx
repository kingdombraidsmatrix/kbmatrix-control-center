import { useShallow } from 'zustand/react/shallow';
import { Ellipsis } from 'lucide-react';
import { isBefore } from 'date-fns';
import { useMemo } from 'react';
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

interface PushNotificationActionCellProps {
  row: BroadcastPushListItem;
}
export function PushNotificationActionCell({ row }: PushNotificationActionCellProps) {
  const openPushModal = useCrmStore(useShallow((state) => state.openPushModal));

  const cannotEdit = useMemo(
    () =>
      !row.scheduled || (!!row.scheduledTime && isBefore(new Date(row.scheduledTime), Date.now())),
    [row],
  );

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
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
