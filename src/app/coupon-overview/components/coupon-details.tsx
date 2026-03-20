import type { Coupon } from '@/types/coupons.ts';
import { CouponDiscountType } from '@/types/coupons.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { BadgeContext, Badge as CustomBadge } from '@/components/badge';
import { formatDate, formatMoney, formatNumber } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';

interface CouponDetailsProps {
  coupon: Coupon;
}
export function CouponDetails({ coupon }: CouponDetailsProps) {
  return (
    <Card>
      <CardContent className="space-y-10">
        <div className="grid grid-cols-5 gap-6 [&_h6]:text-sm [&_h6]:font-semibold">
          <div>
            <h6>Coupon ID</h6>
            <p>{coupon.id}</p>
          </div>
          <div>
            <h6>Coupon Name</h6>
            <p>{coupon.name}</p>
          </div>
          <div>
            <h6>Description</h6>
            <p>{coupon.description}</p>
          </div>
          <div>
            <h6>Status</h6>
            <p>
              <CustomBadge context={BadgeContext.COUPON_STATUS} value={coupon.status} />
            </p>
          </div>
          <div>
            <h6>Created At</h6>
            <p>{formatDate(coupon.createdAt)}</p>
          </div>
          <div>
            <h6>Total Limit</h6>
            <p>{formatNumber(coupon.totalUsageLimit, 'standard')}</p>
          </div>
          <div>
            <h6>Per Customer Limit</h6>
            <p>{formatNumber(coupon.usagePerCustomerLimit, 'standard')}</p>
          </div>
          <div>
            <h6>Used</h6>
            <p>{formatNumber(coupon.usageCount, 'standard')}</p>
          </div>
          <div>
            <h6>Valid From</h6>
            <p>{formatDate(coupon.validFrom)}</p>
          </div>
          <div>
            <h6>Valid Until</h6>
            <p>{formatDate(coupon.validUntil)}</p>
          </div>
          <div>
            <h6>Discount</h6>
            {coupon.discountType === CouponDiscountType.PERCENTAGE ? (
              <p>
                <span>{coupon.discountValue}%</span>{' '}
                <Badge>
                  Capped: {formatMoney(coupon.discountAmountCap, coupon.country.currency.symbol)}
                </Badge>
              </p>
            ) : (
              <p>{formatMoney(coupon.discountValue, coupon.country.currency.symbol)}</p>
            )}
          </div>
          <div>
            <h6>System Generated</h6>
            <p>
              <CustomBadge context={BadgeContext.BOOLEAN} value={coupon.systemGenerated} />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
