import type { PaymentMethod } from '@/types/transactions.types.ts';
import { PaymentMethodType } from '@/types/transactions.types.ts';
import { cn, formatDate } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  className?: string;
}
export function PaymentMethodCard({ paymentMethod, className }: PaymentMethodCardProps) {
  const isCardType = paymentMethod.paymentMethodType === PaymentMethodType.CARD;
  return (
    <div className={cn('flex gap-4 items-center bg-secondary rounded-lg p-4', className)}>
      {isCardType && (
        <div>
          <img
            src={`/images/cc/${paymentMethod.card?.cardBrand}.svg`}
            alt="card"
            className="size-6 object-center object-contain"
          />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <p className="font-semibold text-sm flex-1">
            **** **** {paymentMethod.card?.last4 || paymentMethod.bankAccount?.last4}
          </p>
          <Badge
            context={BadgeContext.BOOLEAN}
            value={paymentMethod.active}
            valueLabel={['Active', 'Inactive']}
          />
        </div>
        <p className="text-sm font-medium">
          {isCardType
            ? `Expires ${paymentMethod.card?.expiryMonth}/${paymentMethod.card?.expiryYear}`
            : `${paymentMethod.bankAccount?.accountHolderName || 'N/A'} • ${paymentMethod.bankAccount?.bankName}`}
        </p>
        <p className="text-sm text-muted-foreground">Added {formatDate(paymentMethod.createdAt)}</p>
      </div>
    </div>
  );
}
