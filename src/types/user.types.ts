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

export interface User {
  id: number
  fullName: string
  email: string
  login: string
  image: string
  enabled: boolean
  status: UserStatus
  signupType: UserSignupType
  authorities: Array<string>
  createdAt: string
}
