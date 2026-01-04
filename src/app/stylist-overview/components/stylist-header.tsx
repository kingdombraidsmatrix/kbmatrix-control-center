import { Dot } from 'lucide-react';
import type { Stylist } from '@/types';
import { Badge } from '@/components/ui/badge.tsx';
import { Badge as AppBadge, BadgeContext } from '@/components/badge';
import { StarRating } from '@/components/star-rating';
import { CountryFlag } from '@/components/country-flag';

interface StylistHeaderProps {
  stylist: Stylist;
}
export function StylistHeader({ stylist }: StylistHeaderProps) {
  return (
    <div>
      <div
        className="bg-secondary w-full aspect-video max-h-32 rounded-2xl overflow-hidden bg-no-repeat bg-cover bg-center border"
        style={{ backgroundImage: `url(${stylist.cover?.url})` }}
      ></div>
      <div className="flex gap-6">
        <div className="pl-6">
          <div className="size-28 rounded-2xl overflow-hidden ring-8 ring-background ring-offset-background -mt-8">
            <img
              src={stylist.logo?.url}
              alt=""
              className="size-full object-cover object-center bg-secondary"
            />
          </div>
        </div>
        <div className="flex-1 py-4 space-y-1">
          <h2 className="font-semibold">{stylist.name}</h2>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-4">
            <StarRating averageRating={stylist.averageRating} />
            <Dot />
            <p className="text-muted-foreground text-sm">@{stylist.tag}</p>
            <Dot />
            <p className="text-muted-foreground text-sm">
              {stylist.contact.address?.formattedAddress}
            </p>
            <CountryFlag countryCode={stylist.countryCode} className="size-4 ml-1" />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <AppBadge context={BadgeContext.STYLIST_STATUS} value={stylist.status} />
            {stylist.deliveryTypes.map((deliveryType) => (
              <Badge key={deliveryType}>{deliveryType}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
