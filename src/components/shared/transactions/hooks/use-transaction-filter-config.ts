import type { FilterConfig } from '@/components/filter';

export function useTransactionFilterConfig(): FilterConfig {
  return [
    {
      type: 'text',
      name: 'Reference',
      columnKey: 'reference',
    },
    {
      type: 'single-select',
      name: 'Transaction Flow',
      columnKey: 'transactionFlow',
      options: [
        { label: 'Credit', value: 'CREDIT' },
        { label: 'Debit', value: 'DEBIT' },
      ],
    },
    {
      type: 'single-select',
      name: 'Transaction Type',
      columnKey: 'transactionType',
      options: [
        { label: 'Booking Payment', value: 'BOOKING_PAYMENT' },
        { label: 'Booking Remittance', value: 'BOOKING_REMITTANCE' },
        { label: 'Subscription Payment', value: 'SUBSCRIPTION_PAYMENT' },
        { label: 'Wallet Funding', value: 'WALLET_FUNDING' },
        { label: 'Withdrawal', value: 'WITHDRAWAL' },
      ],
    },
  ];
}
