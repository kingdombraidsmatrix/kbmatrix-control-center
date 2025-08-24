import { Star } from 'lucide-react';
import { useMemo } from 'react';
import type { AverageRating } from '@/types';
import { formatNumber } from '@/lib/utils.ts';

interface StarRatingProps {
  averageRating: AverageRating;
}
export function StarRating({ averageRating }: StarRatingProps) {
  const roundedValue = useMemo(() => Math.round(averageRating.rating), [averageRating.rating]);

  const totalRatings = useMemo(() => {
    const { r1, r2, r3, r4, r5 } = averageRating;
    return r1 + r2 + r3 + r4 + r5;
  }, [averageRating]);

  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex gap-0.5 items-center">
        {[...Array(roundedValue)].map((_, index) => (
          <Star key={`star-rating_${index}`} fill="currentColor" className="size-4 text-primary" />
        ))}
        {[...Array(5 - roundedValue)].map((_, index) => (
          <Star
            key={`star-rating-open_${index}`}
            fill="currentColor"
            className="size-4 text-zinc-300"
          />
        ))}
      </div>
      <p className="text-xs font-semibold text-muted-foreground leading-none">
        {averageRating.rating.toFixed(2)} ({formatNumber(totalRatings)})
      </p>
    </div>
  );
}
