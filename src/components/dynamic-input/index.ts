import {
  BooleanInput,
  NumberTextInput,
  StringTextInput,
} from '@/components/dynamic-input/dynamic-input.tsx';
import { FeeDynamicInput } from '@/components/dynamic-input/fee-dynamic-input.tsx';

export const DynamicInput = {
  NUMBER: NumberTextInput,
  STRING: StringTextInput,
  BOOLEAN: BooleanInput,
  FEE: FeeDynamicInput,
};
