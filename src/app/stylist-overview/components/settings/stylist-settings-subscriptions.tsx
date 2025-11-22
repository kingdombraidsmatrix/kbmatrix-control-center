import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import type { StylistSettingsComponent } from '@/app/stylist-overview/types.ts';
import type { Stylist } from '@/types';
import { PageHeader } from '@/components/page-header';
import { useGetCurrentSubscription, useGetSubscriptionsService } from '@/services/plans';
import { Badge, BadgeContext } from '@/components/badge';
import { BillingFrequency } from '@/types/plans.ts';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { SubscriptionsColumns } from '@/app/stylist-overview/components/settings/stylist-settings.constant.tsx';
import { TransactionsTable } from '@/components/shared/transactions/transactions-table.tsx';
import { TransactionType } from '@/types/transactions.types.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { formatDate, formatMoney } from '@/lib/utils.ts';

export function StylistSettingsSubscriptions({ stylist }: StylistSettingsComponent) {
  return (
    <div>
      <PageHeader title="Subscriptions" />

      <div className="mt-4 space-y-4">
        <Card>
          <CardContent className="space-y-6">
            <CurrentSubscriptionSection stylist={stylist} />
            <SubscriptionHistory stylist={stylist} />
          </CardContent>
        </Card>

        <TransactionsTable
          filters={{ stylistId: stylist.id, transactionType: TransactionType.SUBSCRIPTION_PAYMENT }}
          title="Subscription Transactions"
          exclude={['to', 'transactionFlow', 'transactionType']}
        />
      </div>
    </div>
  );
}

function CurrentSubscriptionSection({ stylist }: { stylist: Stylist }) {
  const { isLoading, data, error } = useGetCurrentSubscription(stylist.id);

  if (isLoading) {
    return (
      <div>
        <p>Loading current subscription...</p>
      </div>
    );
  }

  if (!data || error) {
    return (
      <Alert className="max-w-sm">
        <AlertTitle>Oops!</AlertTitle>
        <AlertDescription>
          {(error?.response?.data as any)?.message || 'Unable to load current subscription'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-secondary p-2 rounded-2xl w-full max-w-sm">
      <div className="p-4">
        <p className="uppercase text-xs font-bold text-muted-foreground">
          Current Plan <Badge context={BadgeContext.SUBSCRIPTION_STATUS} value={data.status} />
        </p>
        {data.billingFrequency === BillingFrequency.MONTHLY ? (
          <h2 className="font-bold">
            {formatMoney(data.currentPlan.monthlyPrice, data.currentPlan.country.currency.symbol)}
            /month
          </h2>
        ) : (
          <h2 className="font-bold">
            {formatMoney(data.currentPlan.annualPrice, data.currentPlan.country.currency.symbol)}
            /year
          </h2>
        )}
        <p className="text-xs font-medium text-muted-foreground">
          Since {formatDate(data.startDate)}
        </p>
        <p>Next Billing: {formatDate(data.endDate)}</p>
      </div>

      <Link
        to="/settings/plans/$planId"
        params={{ planId: String(data.currentPlan.id) }}
        className="bg-white border-2 border-transparent group hover:border-primary/20 py-2 px-4 rounded-lg flex items-center gap-4"
      >
        <p className="text-primary font-medium flex-1">{data.currentPlan.name}</p>
        <ChevronRight className="size-4 group-hover:text-primary" />
      </Link>
    </div>
  );
}

interface SubscriptionHistoryProps {
  stylist: Stylist;
}
function SubscriptionHistory({ stylist }: SubscriptionHistoryProps) {
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data, isLoading } = useGetSubscriptionsService({
    stylistId: stylist.id,
    page: pageIndex,
    size: pageSize,
  });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: SubscriptionsColumns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    pageCount: data?.totalPages,
    rowCount: data?.totalElements,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <h5 className="font-semibold mb-4">Subscription History</h5>

      <DataTable table={table} columns={SubscriptionsColumns} isLoading={isLoading} />
    </div>
  );
}
