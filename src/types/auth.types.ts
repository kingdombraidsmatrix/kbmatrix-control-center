import type { UserSignupType } from '@/types/user.types.ts';

export interface LoginRequest {
  login: string;
  password: string;
  signupType?: UserSignupType;
  userType?: 'CUSTOMER';
}

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
