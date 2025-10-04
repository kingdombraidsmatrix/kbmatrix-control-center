import type { Country } from '@/types/geo.ts';

export enum FeatureValueType {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  FEE = 'FEE',
}

export enum FeeType {
  PERCENTAGE = 'PERCENTAGE',
  FLAT = 'FLAT',
}

export interface Fee {
  feeType: FeeType;
  amount: number;
  capped: boolean;
  cappedAmount: number;
  currencyCode: string;
}

export interface BaseFeature {
  name: string;
  description: string;
  key: string;
}

interface NumberFeature extends BaseFeature {
  valueType: FeatureValueType.NUMBER;
  defaultValue: number;
}

interface StringFeature extends BaseFeature {
  valueType: FeatureValueType.STRING;
  defaultValue: string;
}

interface BooleanFeature extends BaseFeature {
  valueType: FeatureValueType.BOOLEAN;
  defaultValue: boolean;
}

interface FeeFeature extends BaseFeature {
  valueType: FeatureValueType.FEE;
  defaultValue: Fee;
}

export type Feature = NumberFeature | StringFeature | BooleanFeature | FeeFeature;

export interface PlanFeature {
  feature: string;
  description: string;
  value: Feature['defaultValue'];
}

export interface PlanRequest {
  name: string;
  description: string;
  trialDays?: number;
  monthlyPrice: number;
  annualPrice: number;
  hasDiscount?: boolean;
  discountMonthlyPrice?: number;
  discountAnnualPrice?: number;
  countryCode: string;
  features: Array<PlanFeature>;
  public?: boolean;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  trialDays: number;
  monthlyPrice: number;
  annualPrice: number;
  hasDiscount: boolean;
  discountMonthlyPrice: number;
  discountAnnualPrice: number;
  position: number;
  country: Country;
  features: Array<PlanFeature>;
  createdAt: string;
  public: boolean;
  active: boolean;
}
