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

export interface CustomersFilter {
  search?: string;
  status?: UserStatus;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: Array<string>;
}

export interface UpdateRoleRequest extends CreateRoleRequest {
  id?: number;
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

export interface PermissionGroup {
  name: string;
  permissions: Array<Permission>;
}

export interface Permission {
  name: string;
  value: string;
}

export interface InviteAdminRequest {
  email: string;
  roleId: number;
}

export interface UpdateAdminRequest {
  id: number;
  roleId?: number;
  status?: AdminStatus;
}

export interface JoinAdminRequest {
  email: string;
  phoneNumber: string;
  password?: string;
  fullName: string;
  thirdPartyToken?: string;
  signupType: UserSignupType;
  userType: 'CUSTOMER';
  countryId: number;
  token: string;
}
