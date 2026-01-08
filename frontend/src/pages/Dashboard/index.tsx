import { Link } from 'react-router-dom';
import { Card, Badge } from '@/components/common';
import { mockOrders, mockCustomers, mockSockets } from '@/mocks';

export default function Dashboard() {
  // 統計數據
  const stats = {
    totalOrders: mockOrders.length,
    inProgressOrders: mockOrders.filter(o => o.currentStage > 1 && o.currentStage < 10).length,
    completedOrders: mockOrders.filter(o => o.currentStage === 10).length,
    pendingPayment: mockOrders.filter(o => o.finance.paymentStatus === 'pending').length,
    totalCustomers: mockCustomers.length,
    criticalSockets: mockSockets.filter(s => s.status === 'critical').length,
    warningSockets: mockSockets.filter(s => s.status === 'warning').length,
  };

  return (
    <div>
      {/* 頁面標題 */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-800">系統總覽</h1>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-4 gap-6 mt-8" style={{ marginBottom: '32px' }}>
        <Card className="text-center">
          <div className="text-3xl font-bold text-primary">{stats.totalOrders}</div>
          <div className="text-sm text-gray-500 mt-1">總訂單數</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.inProgressOrders}</div>
          <div className="text-sm text-gray-500 mt-1">進行中</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">{stats.completedOrders}</div>
          <div className="text-sm text-gray-500 mt-1">已完成</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.pendingPayment}</div>
          <div className="text-sm text-gray-500 mt-1">待請款</div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-6">
        {/* 近期訂單 */}
        <Card title="近期訂單" extra={<Link to="/orders" className="text-primary text-sm">查看全部</Link>}>
          <div className="space-y-3">
            {mockOrders.slice(0, 4).map(order => {
              const customer = mockCustomers.find(c => c.id === order.customerId);
              return (
                <Link
                  key={order.orderId}
                  to="/order-flow"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-card hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-mono font-semibold">{order.orderId}</div>
                    <div className="text-sm text-gray-500">{customer?.name}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={order.currentStage === 10 ? 'completed' : 'active'}>
                      階段 {order.currentStage}
                    </Badge>
                    <div className="text-sm text-gray-400 mt-1">
                      {order.icInfo.partNumber}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* 燒錄座狀態 */}
        <Card
          title="燒錄座狀態"
          extra={<Link to="/consumables/sockets" className="text-primary text-sm">管理</Link>}
        >
          {stats.criticalSockets > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-card mb-3">
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-semibold">⚠️ 需更換</span>
                <Badge variant="danger">{stats.criticalSockets} 座</Badge>
              </div>
              <p className="text-sm text-red-600 mt-1">
                有燒錄座已達使用上限，請盡快更換
              </p>
            </div>
          )}

          {stats.warningSockets > 0 && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-card mb-3">
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-semibold">接近上限</span>
                <Badge variant="warning">{stats.warningSockets} 座</Badge>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                有燒錄座使用率超過 90%，請注意
              </p>
            </div>
          )}

          <div className="space-y-2">
            {mockSockets.map(socket => (
              <div key={socket.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-mono text-sm">{socket.id}</span>
                  <span className="text-gray-500 text-sm ml-2">{socket.model}</span>
                </div>
                <Badge
                  variant={
                    socket.status === 'critical'
                      ? 'danger'
                      : socket.status === 'warning'
                        ? 'warning'
                        : 'success'
                  }
                >
                  {((socket.usedCount / socket.maxCount) * 100).toFixed(0)}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
