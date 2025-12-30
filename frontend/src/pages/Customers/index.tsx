import { Card, Badge } from '@/components/common';
import { mockCustomers } from '@/mocks';
import { getPaymentTermByCode } from '@/constants';

export default function Customers() {
  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">客戶管理</h1>
        <p className="text-gray-500 mt-1">管理客戶資料與付款條件</p>
      </div>

      <Card>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>客戶編號</th>
              <th>客戶名稱</th>
              <th>付款條件</th>
              <th>標籤模板</th>
              <th>建立日期</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map(customer => {
              const paymentTerm = getPaymentTermByCode(customer.paymentTerm);

              return (
                <tr key={customer.id}>
                  <td className="font-mono">{customer.id}</td>
                  <td className="font-semibold">{customer.name}</td>
                  <td>
                    <Badge variant="info">{paymentTerm?.name}</Badge>
                  </td>
                  <td>
                    <Badge variant="pending">{customer.labelTemplate}</Badge>
                  </td>
                  <td className="text-gray-500">{customer.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
