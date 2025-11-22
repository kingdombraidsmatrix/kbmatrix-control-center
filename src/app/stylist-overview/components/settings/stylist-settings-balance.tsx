import type { StylistSettingsComponent } from '@/app/stylist-overview/types.ts';
import type { Stylist } from '@/types';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { formatMoney } from '@/lib/utils.ts';
import { TransactionsTable } from '@/components/shared/transactions/transactions-table.tsx';
import { TransactionType } from '@/types/transactions.types.ts';
import { PaymentMethodCard } from '@/components/payment-method-card';
import {
  useGetBalance,
  useGetPaymentMethods,
  useGetWithdrawalMethods,
} from '@/services/transactions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';

export function StylistSettingsBalance({ stylist }: StylistSettingsComponent) {
  return (
    <div>
      <PageHeader title="Wallet Balance" />

      <div className="mt-6 space-y-4">
        <Card>
          <CardContent className="space-y-6">
            <BalanceSection stylist={stylist} />

            <PaymentMethodsSection stylist={stylist} />

            <WithdrawalMethodsSection stylist={stylist} />
          </CardContent>
        </Card>

        <TransactionsTable
          title="Payouts"
          filters={{ stylistId: stylist.id, transactionType: TransactionType.WITHDRAWAL }}
          exclude={['transactionType', 'to', 'transactionFlow']}
        />
      </div>
    </div>
  );
}

function BalanceSection({ stylist }: { stylist: Stylist }) {
  const { data, isLoading } = useGetBalance({ stylistId: stylist.id });

  if (isLoading) {
    return (
      <div>
        <p>Loading balance...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Unable to load wallet balance</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-secondary p-6 rounded-2xl max-w-sm">
      <p className="text-muted-foreground">Available Balance</p>
      <h1 className="font-bold">{formatMoney(data.balance, data.currency.symbol)}</h1>
    </div>
  );
}

function PaymentMethodsSection({ stylist }: { stylist: Stylist }) {
  const { data, isLoading } = useGetPaymentMethods({ stylistId: stylist.id });

  return (
    <div>
      <h4 className="font-semibold">Payment Methods</h4>

      {isLoading ? (
        <div>Loading...</div>
      ) : !data?.length ? (
        <div className="bg-muted p-6 text-center rounded-2xl mt-4">
          <p className="text-sm text-muted-foreground">No payment methods</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,24rem)] gap-4 max-w-sm">
          {data.map((item) => (
            <PaymentMethodCard key={item.id} paymentMethod={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function WithdrawalMethodsSection({ stylist }: { stylist: Stylist }) {
  const { data, isLoading } = useGetWithdrawalMethods({ stylistId: stylist.id });

  return (
    <div>
      <h4 className="font-semibold">Withdrawal Methods</h4>

      {isLoading ? (
        <div>Loading...</div>
      ) : !data?.length ? (
        <div className="bg-muted p-6 text-center rounded-2xl mt-4">
          <p className="text-sm text-muted-foreground">No withdrawal methods</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,24rem)] gap-4 mt-4">
          {data.map((item) => (
            <PaymentMethodCard key={item.id} paymentMethod={item} />
          ))}
        </div>
      )}
    </div>
  );
}
