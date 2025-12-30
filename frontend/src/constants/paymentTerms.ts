import type { PaymentTerm, PaymentTermCode } from '@/types';

// 付款條件定義
export const PAYMENT_TERMS: PaymentTerm[] = [
  { code: 'NET30', name: '月結 30 天', days: 30 },
  { code: 'NET60', name: '月結 60 天', days: 60 },
  { code: 'NET90', name: '月結 90 天', days: 90 },
];

// 根據代碼取得付款條件
export function getPaymentTermByCode(code: PaymentTermCode): PaymentTerm | undefined {
  return PAYMENT_TERMS.find(term => term.code === code);
}

// 計算到期日
export function calculateDueDate(invoiceDate: string, paymentTermCode: PaymentTermCode): string {
  const term = getPaymentTermByCode(paymentTermCode);
  if (!term) return invoiceDate;

  const date = new Date(invoiceDate);
  date.setDate(date.getDate() + term.days);
  return date.toISOString().split('T')[0];
}
