import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export interface ExportProps {
  triggerFn: UseMutateFunction<AxiosResponse<string>, Error, undefined>;
  filePrefix?: string;
}
