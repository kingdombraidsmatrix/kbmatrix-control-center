import { Download, Loader2 } from 'lucide-react';
import type { ExportProps } from '@/components/export-button/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { useExport } from '@/components/export-button/use-export.ts';

export function ExportButton(props: ExportProps) {
  const { isExporting, handleExport } = useExport(props);

  return (
    <Button variant="secondary" disabled={isExporting} onClick={handleExport}>
      {isExporting ? <Loader2 className="animate-spin" /> : <Download />} Export
    </Button>
  );
}
