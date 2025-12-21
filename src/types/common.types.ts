import type { User } from '@/types/user.types.ts';
import type { Stylist } from '@/types/stylist.types.ts';

export interface Page<TData> {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Array<TData>;
}

export type DateString = string;

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  UNKNOWN = 'UNKNOWN',
}
export interface Media {
  id: number;
  url: string;
  type: MediaType;
  defaultMedia: boolean;
  createdAt: DateString;
}

export interface Review {
  id: number;
  review: string;
  rating: number;
  creatorType: 'USER';
  user: User;
  stylist: Stylist;
  media: Array<Media>;
  createdAt: DateString;
}

export enum ExportStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface ExportResponse {
  status: ExportStatus;
  downloadUrl?: string;
}
