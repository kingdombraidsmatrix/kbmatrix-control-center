import { endOfMonth, startOfMonth } from 'date-fns';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { formatDateRange } from 'little-date';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { cn, formatDateISO } from '@/lib/utils.ts';
import { useGetAvailabilityDays } from '@/services/bookings/use-get-availability-days.ts';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';

interface StylistAvailabilityCalendarProps {
  stylistId: number;
}
export function StylistAvailabilityCalendar({ stylistId }: StylistAvailabilityCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date());

  const { isLoading, data } = useGetAvailabilityDays({
    stylistId,
    from: formatDateISO(startOfMonth(month)),
    to: formatDateISO(endOfMonth(month)),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 items-center">
        <CardTitle className="flex-1">Availability</CardTitle>
        {isLoading && <Loader className="animate-spin size-4" />}
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          className="w-full"
          classNames={{
            day: 'w-full',
          }}
          components={{
            DayButton: ({ children, modifiers, day, className, ...props }) => {
              const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
              const dateStr = formatDateISO(day.date);
              const availableDay = data?.[dateStr];
              const isAvailable =
                !!availableDay && !availableDay.closed && availableDay.timeSlots.length > 0;

              return (
                <HoverCard
                  openDelay={0}
                  closeDelay={0}
                  open={!modifiers.outside ? undefined : false}
                >
                  <HoverCardTrigger asChild>
                    <CalendarDayButton
                      day={day}
                      modifiers={modifiers}
                      className={cn(
                        'aspect-auto min-h-full py-3 font-medium',
                        isAvailable && 'bg-emerald-50',
                        isWeekend && 'text-destructive',
                        modifiers.outside && 'opacity-40 pointer-events-none',
                        className,
                      )}
                      {...props}
                    >
                      {children}
                    </CalendarDayButton>
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-fit">
                    {isAvailable ? (
                      <div>
                        <p className="text-xs font-medium">Available</p>
                        {availableDay.timeSlots.map((timeslot, index) => {
                          const startTimeArr = timeslot.startTime.split(':');
                          const startDate = new Date(day.date);
                          startDate.setHours(Number(startTimeArr[0]));
                          startDate.setMinutes(Number(startTimeArr[1]));

                          const endTimeArr = timeslot.endTime.split(':');
                          const endDate = new Date(day.date);
                          endDate.setHours(Number(endTimeArr[0]));
                          endDate.setMinutes(Number(endTimeArr[1]));
                          return (
                            <p key={index} className="text-sm">
                              {formatDateRange(startDate, endDate)}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Stylist closed for the day</p>
                    )}
                  </HoverCardContent>
                </HoverCard>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
