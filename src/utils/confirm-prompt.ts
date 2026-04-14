import type { LucideIcon } from 'lucide-react';
import type { ButtonVariants } from '@/components/ui/button.tsx';
import type { AlertDialogMediaVariants } from '@/components/ui/alert-dialog.tsx';

export const CONFIRM_PROMPT_EVENT_NAME = 'confirm-prompt';

interface ConfirmPromptButton {
  label?: string;
  icon?: string;
  onClick?: (() => void) | (() => Promise<void>);
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
}

export interface ConfirmPromptParam {
  title?: string;
  message?: string;
  icon?: LucideIcon;
  variant?: AlertDialogMediaVariants['variant'];
  cancelButton?: ConfirmPromptButton;
  confirmButton?: ConfirmPromptButton;
}

export function confirmPrompt(params: ConfirmPromptParam) {
  const event = new CustomEvent(CONFIRM_PROMPT_EVENT_NAME, { detail: params });
  document.dispatchEvent(event);
}
