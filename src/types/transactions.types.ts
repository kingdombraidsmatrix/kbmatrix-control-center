import type { User } from '@/types/user.types.ts';
import type { Stylist } from '@/types/stylist.types.ts';
import type { Booking } from '@/types/bookings.types.ts';
import type { Currency } from '@/types/geo.ts';
import type { Subscription } from '@/types/plans.ts';
import type { DateString } from '@/types/common.types.ts';

export enum TransactionType {
  UNKNOWN = 'UNKNOWN',
  BOOKING_PAYMENT = 'BOOKING_PAYMENT',
  BOOKING_REMITTANCE = 'BOOKING_REMITTANCE',
  SUBSCRIPTION_PAYMENT = 'SUBSCRIPTION_PAYMENT',
  WALLET_FUNDING = 'WALLET_FUNDING',
  WITHDRAWAL = 'WITHDRAWAL',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum TransactionFlow {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum PaymentMethodType {
  CARD = 'CARD',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
}

export interface Transaction {
  id: number;
  reference: string;
  externalReference?: string;
  description?: string;
  currency?: Currency;
  subAmount: number;
  fee: number;
  totalAmount: number;
  failureReason: string;
  user?: User;
  stylist?: Stylist;
  transactionFlow: TransactionFlow;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  providerImplName: string;
  booking?: Booking;
  subscription?: Subscription;
  paymentMethod: PaymentMethod;
  createdAt: DateString;
}

export interface PaymentMethod {
  id: number;
  active: boolean;
  providerImplName: string;
  user: User;
  stylist: Stylist;
  paymentMethodType: PaymentMethodType;
  defaultPaymentMethod: boolean;
  card?: PaymentMethodCard;
  bankAccount?: PaymentMethodBankAccount;
  updatedAt: DateString;
  createdAt: DateString;
}

export interface PaymentMethodCard {
  id: number;
  cardBrand: string;
  countryCode: string;
  expiryMonth: string;
  expiryYear: string;
  fundingType: string;
  last4: string;
  threeDSecure: boolean;
  createdAt: DateString;
}

export interface PaymentMethodBankAccount {
  id: number;
  accountType: string;
  accountHolderName: string;
  bankName: string;
  last4: string;
  routingNumber: string;
}

export interface TransactionsFilter {
  reference: string;
  externalReference: string;
  userId: number;
  stylistId: number;
  transactionFlow: TransactionFlow;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  providerImplName: string;
  bookingId: number;
  subscriptionId: number;
  paymentMethodId: number;
  page: number;
  size: number;
  sort: string;
}

export interface WalletBalance {
  currency: Currency;
  balance: number;
}
