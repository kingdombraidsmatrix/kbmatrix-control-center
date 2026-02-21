import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import type {Settings, UpdateSettingsRequest} from '@/types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Form } from '@/components/ui/form.tsx';
import {
  ConfigurationField,
  ConfigurationValidation,
} from '@/app/configuration/components/configuration.constants.ts';
import { useUpdateSettings } from '@/services/settings/use-update-settings.ts';

interface ConfigurationDialogProps {
  data?: Settings;
  onClose: () => void;
}
export function ConfigurationDialog({ data, onClose }: ConfigurationDialogProps) {
  return (
    <Dialog open={!!data} onOpenChange={onClose}>
      {!!data && <Content data={data} onClose={onClose} />}
    </Dialog>
  );
}

interface ContentProps {
  data: Settings;
  onClose: () => void;
}
function Content({ data, onClose }: ContentProps) {
  const { mutate, isPending } = useUpdateSettings();

  const formSchema = z.object({
    key: z.string().min(1, 'Configuration key is required'),
    value: ConfigurationValidation[data.type],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: data.key,
      value: data.value,
    },
  });

  const FieldComponent = ConfigurationField[data.type];

  const handleSubmit = useCallback(
    (values: UpdateSettingsRequest) => {
      mutate(values, {
        onSuccess: () => {
          toast.success('Configuration updated successfully.');
          onClose();
        },
        onError: () => {
          toast.error('Configuration updated failed.');
        },
      });
    },
    [mutate],
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{data.title}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <Badge variant="warning">{data.type}</Badge>
            <p className="text-sm text-muted-foreground">{data.description}</p>

            <div className="my-6">
              <FieldComponent form={form} name="value" label="Value" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}{' '}
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
