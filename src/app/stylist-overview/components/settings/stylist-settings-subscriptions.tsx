import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import type { StylistSettingsComponent } from '@/app/stylist-overview/types.ts';
import type { Stylist } from '@/types';
import { PageHeader } from '@/components/page-header';
import { useGetSubscriptionsService } from '@/services/plans';
import { Badge, BadgeContext } from '@/components/badge';
import { SubscriptionStatus } from '@/types/plans.ts';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { SubscriptionsColumns } from '@/app/stylist-overview/components/settings/stylist-settings.constant.tsx';
import { TransactionsTable } from '@/components/shared/transactions/transactions-table.tsx';
import { TransactionType } from '@/types/transactions.types.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';

export function StylistSettingsSubscriptions({ stylist }: StylistSettingsComponent) {
  return (
    <div>
      <PageHeader title="Subscriptions" />

      <div className="mt-4 space-y-4">
        <Card>
          <CardContent className="space-y-6">
            <div className="bg-secondary p-2 rounded-2xl w-full max-w-sm">
              <div className="p-4">
                <div className="flex items-center justify-between gap-6">
                  <p className="uppercase text-xs font-medium text-muted-foreground">
                    Current Plan{' '}
                    <Badge
                      context={BadgeContext.SUBSCRIPTION_STATUS}
                      value={SubscriptionStatus.CANCELLED_PENDING}
                    />
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">Since Apr. 6, 2025</p>
                </div>
                <h2 className="font-bold">$56/month</h2>
                <p>Next Billing: July 15, 2026</p>
              </div>

              <Link
                to="/settings/plans/$planId"
                params={{ planId: '123' }}
                className="bg-white border-2 border-transparent group hover:border-primary/20 py-2 px-4 rounded-lg flex items-center gap-4"
              >
                <p className="text-primary font-medium flex-1">Professional</p>
                <ChevronRight className="size-4 group-hover:text-primary" />
              </Link>
            </div>

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
