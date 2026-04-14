import type { User } from '@/types/user.types.ts';
import type { Stylist } from '@/types/stylist.types.ts';
import type { DateString } from '@/types/common.types.ts';

export enum BroadcastPushStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  CANCELLED = 'CANCELLED',
}

export interface CrmPushRequest {
  title?: string;
  subtitle?: string;
  body: string;
  userIds?: Array<number>;
  stylistIds?: Array<number>;
  allUsers?: boolean;
  allStylists?: boolean;
  scheduled?: boolean;
  scheduledTime?: Date;
}

export interface UpdateCrmPushRequest extends CrmPushRequest {
  id: number
}

export interface BroadcastPush {
  id: number;
  title?: string;
  subtitle?: string;
  body?: string;
  allUsers: boolean;
  allStylists: boolean;
  status: BroadcastPushStatus;
  scheduledTime?: DateString;
  scheduled: boolean;
  users: Array<User>;
  stylists: Array<Stylist>;
  updatedAt?: DateString;
  createdAt: DateString;
}

export interface BroadcastPushListItem {
  id: number;
  title?: string;
  subtitle?: string;
  allUsers: boolean;
  allStylists: boolean;
  status: BroadcastPushStatus;
  scheduledTime?: DateString;
  scheduled: boolean;
  userCount: number;
  stylistCount: number;
  updatedAt: DateString;
  createdAt: DateString;
}
