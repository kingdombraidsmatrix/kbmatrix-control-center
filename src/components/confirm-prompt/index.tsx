import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { ConfirmPromptParam } from '@/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx';
import { CONFIRM_PROMPT_EVENT_NAME } from '@/utils';

export function ConfirmPrompt() {
  const [data, setData] = useState<ConfirmPromptParam | undefined>(undefined);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const isOpen = useMemo(() => !!data, [data]);

  useEffect(() => {
    document.addEventListener<any>(CONFIRM_PROMPT_EVENT_NAME, (evt) => {
      setData(evt.detail);
    });

    return () => {
      document.removeEventListener(CONFIRM_PROMPT_EVENT_NAME, () => {});
    };
  }, []);

  const closeModal = useCallback(() => {
    setData(undefined);
  }, []);

  const handleConfirm = useCallback(async () => {
    try {
      setIsConfirming(true);
      await data?.confirmButton?.onClick?.();
      closeModal();
    } finally {
      setIsConfirming(false);
    }
  }, [data, closeModal]);

  const handleCancel = useCallback(async () => {
    try {
      setIsCanceling(true);
      await data?.cancelButton?.onClick?.();
      closeModal();
    } finally {
      setIsCanceling(false);
    }
  }, [data, closeModal]);

  if (!data) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={closeModal}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          {data.icon && (
            <AlertDialogMedia variant={data.variant}>
              <data.icon />
            </AlertDialogMedia>
          )}
          {!!data.title && <AlertDialogTitle>{data.title}</AlertDialogTitle>}
          {!!data.message && <AlertDialogDescription>{data.message}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isConfirming || isCanceling}
            variant={data.cancelButton?.variant || 'outline'}
            size={data.cancelButton?.size || 'default'}
            onClick={async (e) => {
              e.preventDefault();
              await handleCancel();
            }}
          >
            {data.cancelButton?.label || 'Cancel'}{' '}
            {isCanceling && <Loader2 className="animate-spin" />}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isConfirming || isCanceling}
            variant={data.confirmButton?.variant || 'default'}
            size={data.confirmButton?.size || 'default'}
            onClick={async (e) => {
              e.preventDefault();
              await handleConfirm();
            }}
          >
            {data.confirmButton?.label || 'Continue'}{' '}
            {isConfirming && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
