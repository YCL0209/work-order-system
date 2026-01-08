import { Card, Badge } from '@/components/common';
import { mockOrders, mockCustomers } from '@/mocks';
import type { PaymentStatus } from '@/types';

export default function Finance() {
  const getPaymentStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return { variant: 'payment-paid' as const, label: '已付款', icon: '✅' };
      case 'invoiced':
        return { variant: 'payment-invoiced' as const, label: '已請款', icon: '📄' };
      case 'overdue':
        return { variant: 'payment-overdue' as const, label: '逾期', icon: '⚠️' };
      default:
        return { variant: 'payment-pending' as const, label: '待請款', icon: '⏳' };
    }
  };

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-800">金流管理</h1>
      </div>

      {/* 訂單列表 */}
      <Card title="應收帳款明細">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th style={{ width: '12%' }}>訂單編號</th>
              <th style={{ width: '20%' }}>客戶</th>
              <th style={{ width: '12%' }}>金額</th>
              <th style={{ width: '12%' }}>發票號碼</th>
              <th style={{ width: '14%' }}>開票日期</th>
              <th style={{ width: '14%' }}>到期日</th>
              <th style={{ width: '10%' }}>狀態</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => {
              const customer = mockCustomers.find(c => c.id === order.customerId);
              const statusBadge = getPaymentStatusBadge(order.finance.paymentStatus);

              return (
                <tr key={order.orderId}>
                  <td className="font-mono">{order.orderId}</td>
                  <td>{customer?.name}</td>
                  <td className="font-semibold">
                    ${order.finance.totalAmount.toLocaleString()}
                  </td>
                  <td className="font-mono">{order.finance.invoiceNo || '-'}</td>
                  <td>{order.finance.invoiceDate || '-'}</td>
                  <td>{order.finance.dueDate || '-'}</td>
                  <td>
                    <Badge variant={statusBadge.variant}>
                      {statusBadge.icon} {statusBadge.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
