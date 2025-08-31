import { Cog } from 'lucide-react';

export function EmptySettingsPage() {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center gap-4 min-h-[70vh]">
      <Cog className="size-40 text-zinc-300" />
      <p className="text-muted-foreground">Select something on the left to manage</p>
    </div>
  );
}
