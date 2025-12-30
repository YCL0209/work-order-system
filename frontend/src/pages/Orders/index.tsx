import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/common';
import { mockOrders } from '@/mocks/orders';
import { mockCustomers } from '@/mocks/customers';
import { WORKFLOW_STAGES } from '@/constants/workflow';

export default function Orders() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<number | 'all'>('all');

  // 取得客戶名稱
  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer?.name || customerId;
  };

  // 取得階段狀態樣式
  const getStageStyle = (stage: number) => {
    if (stage === 10) return 'bg-success text-white';
    if (stage >= 7) return 'bg-primary text-white';
    if (stage >= 4) return 'bg-info text-white';
    return 'bg-secondary-light text-secondary-dark';
  };

  // 過濾訂單
  const filteredOrders = mockOrders.filter(order => {
    const matchSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.icInfo.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCustomerName(order.customerId).toLowerCase().includes(searchTerm.toLowerCase());

    const matchStage = stageFilter === 'all' || order.currentStage === stageFilter;

    return matchSearch && matchStage;
  });

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">訂單管理</h1>
          <p className="text-gray-500 mt-1">管理所有訂單與流程進度</p>
        </div>
        <button
          onClick={() => navigate('/order-flow')}
          className="btn btn-primary"
        >
          + 新增訂單
        </button>
      </div>

      {/* 篩選區 */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          {/* 搜尋 */}
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="搜尋訂單編號、IC 型號、客戶名稱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>

          {/* 階段篩選 */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-text-secondary">階段篩選：</label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="form-input w-40"
            >
              <option value="all">全部階段</option>
              {WORKFLOW_STAGES.map(stage => (
                <option key={stage.id} value={stage.id}>
                  {stage.id}. {stage.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* 訂單列表 */}
      <Card>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>客戶</th>
              <th>IC 型號</th>
              <th>目前階段</th>
              <th>進料數量</th>
              <th>建立日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-text-hint">
                  沒有符合條件的訂單
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.orderId} className="hover:bg-bg-section cursor-pointer">
                  <td className="font-semibold text-primary">{order.orderId}</td>
                  <td>{getCustomerName(order.customerId)}</td>
                  <td className="font-mono text-sm">{order.icInfo.partNumber}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/order-flow?id=${order.orderId}`)}
                      className={`badge ${getStageStyle(order.currentStage)} cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center gap-1`}
                    >
                      階段 {order.currentStage}/7 ▶
                    </button>
                  </td>
                  <td>
                    {order.inventory.incomingQty > 0
                      ? order.inventory.incomingQty.toLocaleString()
                      : '-'}
                  </td>
                  <td className="text-text-secondary">{formatDate(order.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/order-flow?id=${order.orderId}`)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      查看
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
