import { cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { cn, formatNumber } from '@/lib/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const statCardVariants = cva('', {
  variants: {
    color: {
      primary: 'bg-primary/10 text-primary',
      indigo: 'bg-indigo-600/10 text-indigo-600',
      amber: 'bg-amber-600/10 text-amber-600',
      emerald: 'bg-emerald-600/10 text-emerald-600',
      rose: 'bg-rose-600/10 text-rose-600',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
  value?: number;
  isLoading?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}
export function StatCard({
  color,
  title,
  subtitle,
  value,
  isLoading,
  icon: Icon,
  onClick,
  isActive,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'gap-0 flex-row px-6 shadow-none transition',
        !!onClick && 'hover:bg-background hover:border-zinc-400 cursor-pointer',
        isActive && 'ring-4 ring-offset-0 ring-primary/30 bg-primary/10 hover:bg-primary/10 text-primary',
      )}
      onClick={onClick}
    >
      <div className="flex-1">
        <CardHeader className="p-0 gap-0">
          <CardTitle className="text-sm">{title}</CardTitle>
          {!!subtitle && <CardDescription className="text-xs">{subtitle}</CardDescription>}
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div>
            {isLoading ? (
              <Skeleton className="w-full max-w-20 h-8" />
            ) : (
              <h1 className="leading-none font-semibold">
                {typeof value === 'number' ? formatNumber(value) : '...'}
              </h1>
            )}
          </div>
        </CardContent>
      </div>
      {!!Icon && (
        <div
          className={cn(
            statCardVariants({ color }),
            'size-10 rounded-md flex items-center justify-center',
          )}
        >
          <Icon className="size-5" />
        </div>
      )}
    </Card>
  );
}
