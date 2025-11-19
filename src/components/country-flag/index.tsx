import { cn } from '@/lib/utils.ts';

interface CountryFlagProps {
  countryCode: string;
  className?: string;
}
export function CountryFlag({ countryCode, className }: CountryFlagProps) {
  return (
    <img
      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
      className={cn('size-6 object-cover object-center overflow-hidden rounded-full', className)}
      alt={countryCode}
    />
  );
}
