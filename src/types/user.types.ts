import type { DateString } from '@/types/common.types.ts';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  IN_REVIEW = 'IN_REVIEW',
  SCHEDULED_FOR_DELETION = 'SCHEDULED_FOR_DELETION',
  DELETED = 'DELETED',
}

export enum UserSignupType {
  PASSWORD = 'PASSWORD',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
}

export enum AdminStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  login: string;
  image: string;
  enabled: boolean;
  status: UserStatus;
  signupType: UserSignupType;
  authorities: Array<string>;
  createdAt: string;
}

export interface UsersOverview {
  newUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  allUsers: number;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Array<string>;
  createdAt: DateString;
}

export interface AdminUser {
  id: number;
  email: string;
  user?: User;
  role: Role;
  status: AdminStatus;
  createdAt: DateString;
}
