import { formatPhoneNumberIntl } from 'react-phone-number-input';

export function formatPhoneNumber(value?: string | null) {
  if (!value) return '';
  const strippedNumber = value.replace(/\D/g, '');
  return formatPhoneNumberIntl(`+${strippedNumber}`);
}
