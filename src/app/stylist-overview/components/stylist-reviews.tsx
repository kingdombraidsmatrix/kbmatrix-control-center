import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import type { ChartConfig } from '@/components/ui/chart.tsx';
import type { Stylist } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { formatNumber } from '@/lib/utils.ts';

const chartConfig = {
  count: {
    label: 'Reviews',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

interface StylistReviewsProps {
  stylist: Stylist;
}
export function StylistReviews({ stylist }: StylistReviewsProps) {
  const { r5, r4, r3, r2, r1, rating } = stylist.averageRating;

  const total = useMemo(() => r5 + r4 + r3 + r2 + r1, [r5, r4, r3, r2, r1]);

  const chartData = useMemo(
    () => [
      { rating: '5', count: r5 },
      { rating: '4', count: r4 },
      { rating: '3', count: r3 },
      { rating: '2', count: r2 },
      { rating: '1', count: r1 },
    ],
    [r5, r4, r3, r2, r1],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid grid-cols-5">
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 text-center">
              <h1 className="font-bold text-5xl">{rating.toFixed(2)}</h1>
              <p className="text-sm">({formatNumber(total)})</p>
            </div>
            <div className="col-span-3">
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    left: -20,
                  }}
                >
                  <XAxis type="number" dataKey="count" hide />
                  <YAxis
                    dataKey="rating"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="count" fill="var(--primary)" radius={5} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
