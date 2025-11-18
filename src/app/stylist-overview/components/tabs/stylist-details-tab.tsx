import { Mail, MapPin, PhoneCall } from 'lucide-react';
import type { Stylist } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { formatPhoneNumber } from '@/utils';
import { StylistAvailabilityCalendar } from '@/app/stylist-overview/components/stylist-availability-calendar.tsx';
import { cn } from '@/lib/utils.ts';

interface StylistDetailsTabProps {
  stylist: Stylist;
}
export function StylistDetailsTab({ stylist }: StylistDetailsTabProps) {
  return (
    <div className="grid gap-6 pt-2">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <a
                href="https://maps.google.com"
                target="_blank"
                className={cn(
                  'flex items-center p-4 gap-6 bg-muted rounded-md border border-transparent hover:border-primary/30',
                  !stylist.contact.address && 'pointer-events-none',
                )}
              >
                <MapPin className="size-5" />
                <div className="flex-1">
                  <p className="font-medium">
                    {stylist.contact.address?.formattedAddress || 'N/A'}
                  </p>
                  {!!stylist.contact.address && (
                    <p className="text-sm text-muted-foreground">
                      [{stylist.contact.address.latitude}, {stylist.contact.address.longitude}]
                    </p>
                  )}
                </div>
              </a>
              <a
                href={`tel:${stylist.contact.phoneNumber}`}
                target="_blank"
                className={cn(
                  'flex items-center p-4 gap-6 bg-muted rounded-md border border-transparent hover:border-primary/30',
                  !stylist.contact.phoneNumber && 'pointer-events-none',
                )}
              >
                <PhoneCall className="size-5" />
                <div className="flex-1">
                  <p className="font-medium">
                    {formatPhoneNumber(stylist.contact.phoneNumber) || 'N/A'}
                  </p>
                  <p className="text-sm text-muted-foreground">Business Phone Number</p>
                </div>
              </a>
              <a
                href={`mailto:${stylist.contact.email}`}
                target="_blank"
                className="flex items-center p-4 gap-6 bg-muted rounded-md border border-transparent hover:border-primary/30"
              >
                <Mail className="size-5" />
                <div className="flex-1">
                  <p className="font-medium">{stylist.contact.email}</p>
                  <p className="text-sm text-muted-foreground">Business Email</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <StylistAvailabilityCalendar stylistId={stylist.id} />
      </div>
    </div>
  );
}
