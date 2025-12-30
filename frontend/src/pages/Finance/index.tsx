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

  // 計算統計
  const totalAmount = mockOrders.reduce((sum, o) => sum + o.finance.totalAmount, 0);
  const pendingAmount = mockOrders
    .filter(o => o.finance.paymentStatus !== 'paid')
    .reduce((sum, o) => sum + o.finance.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">金流管理</h1>
        <p className="text-gray-500 mt-1">追蹤訂單付款狀態與應收帳款</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-sm text-gray-500">總金額</div>
          <div className="text-2xl font-bold text-primary mt-1">
            ${totalAmount.toLocaleString()}
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">待收款</div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            ${pendingAmount.toLocaleString()}
          </div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">已收款</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            ${(totalAmount - pendingAmount).toLocaleString()}
          </div>
        </Card>
      </div>

      {/* 訂單列表 */}
      <Card title="應收帳款明細">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>客戶</th>
              <th>金額</th>
              <th>發票號碼</th>
              <th>開票日期</th>
              <th>到期日</th>
              <th>狀態</th>
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
                  <td className="font-semibold text-right">
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
