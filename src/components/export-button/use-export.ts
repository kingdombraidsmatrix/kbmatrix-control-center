import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import type { ExportProps } from '@/components/export-button/types.ts';
import { useGetExportDownloadUrl } from '@/services/export';

export function useExport({ triggerFn, filePrefix }: ExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { mutateAsync: getDownloadUrl } = useGetExportDownloadUrl();
  const intervalRef = useRef<number>(undefined);

  const generateFileName = useCallback(
    (downloadUrl: string) => {
      const urlParts = downloadUrl.split('/');
      const originalFileName = urlParts[urlParts.length - 1];
      return [filePrefix, originalFileName].filter(Boolean).join('_');
    },
    [filePrefix],
  );

  const handleDownload = useCallback(
    (downloadUrl: string) => {
      const aTag = document.createElement('a');
      aTag.download = generateFileName(downloadUrl);
      aTag.href = downloadUrl;
      aTag.target = '_blank';
      document.body.appendChild(aTag);
      aTag.click();
      setTimeout(() => {
        document.body.removeChild(aTag);
      }, 500);
    },
    [generateFileName],
  );

  const getExportId = useCallback(
    async () =>
      new Promise<string>((resolve, reject) => {
        triggerFn(undefined, {
          onSuccess(res) {
            resolve(res.data);
          },
          onError(err) {
            reject(err);
          },
        });
      }),
    [triggerFn],
  );

  const handleExport = useCallback(async () => {
    try {
      setIsExporting(true);
      const exportId = await getExportId();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      intervalRef.current = setInterval(async () => {
        const exportResponse = await getDownloadUrl(exportId);
        if (exportResponse.data.downloadUrl) {
          handleDownload(exportResponse.data.downloadUrl);
          clearInterval(intervalRef.current);
          setIsExporting(false);
        }
      }, 1_000);
    } catch (e) {
      setIsExporting(false);
      toast.error('Unable to export data');
    }
  }, [triggerFn, getDownloadUrl, handleDownload]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    handleExport,
    isExporting,
  };
}
