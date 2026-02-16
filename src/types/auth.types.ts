import type { UserSignupType } from '@/types/user.types.ts';

interface BaseLoginRequest {
  signupType?: UserSignupType;
  userType?: 'CUSTOMER';
}

export interface PasswordLoginRequest extends BaseLoginRequest {
  signupType: UserSignupType.PASSWORD;
  login: string;
  password: string;
}

export interface ThirdPartyLoginRequest extends BaseLoginRequest {
  signupType: Exclude<UserSignupType, UserSignupType.PASSWORD>;
  thirdPartyToken: string;
}

export type LoginRequest = PasswordLoginRequest | ThirdPartyLoginRequest;

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  TWO_FACTOR_AUTH_TOKEN = 'TWO_FACTOR_AUTH_TOKEN',
  VERIFICATION_TOKEN = 'VERIFICATION_TOKEN',
  RESET_PASSWORD_TOKEN = 'RESET_PASSWORD_TOKEN',
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  type: TokenType;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
