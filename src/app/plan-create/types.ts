import type { FieldPath, UseFormReturn } from 'react-hook-form';
import type { Feature, PlanRequest } from '@/types/plans.ts';

export type FieldName = FieldPath<PlanRequest>;

export interface FeatureInputProps {
  form: UseFormReturn<PlanRequest>;
  name: FieldName;
  feature: Feature;
}
