import { useState, useMemo } from 'react';
import { Badge, Button, Card } from '@/components/common';
import { mockICInventory } from '@/mocks';
import type { ICInventory, ICInventoryStatus } from '@/types';
import { IC_INVENTORY_STATUS_LABELS, IC_INVENTORY_STATUS_COLORS } from '@/types';

export default function ICInventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ICInventoryStatus | 'all'>('all');

  // 篩選資料
  const filteredData = useMemo(() => {
    return mockICInventory.filter((item) => {
      const matchSearch =
        item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [searchTerm, statusFilter]);

  // 統計資料
  const stats = useMemo(() => {
    const total = mockICInventory.length;
    const totalQty = mockICInventory.reduce((sum, item) => sum + item.quantity, 0);
    const pending = mockICInventory.filter((item) => item.status === 'pending').length;
    const processing = mockICInventory.filter((item) => item.status === 'processing').length;
    return { total, totalQty, pending, processing };
  }, []);

  const getStatusBadge = (status: ICInventoryStatus) => {
    const variant = IC_INVENTORY_STATUS_COLORS[status] as 'warning' | 'active' | 'success' | 'completed';
    return <Badge variant={variant}>{IC_INVENTORY_STATUS_LABELS[status]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">IC 庫存管理</h1>
          <p className="text-gray-500 mt-1">管理廠內 IC 寄放與庫存狀態</p>
        </div>
        <Button variant="primary">
          + 新增庫存
        </Button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-sm text-gray-500">總筆數</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">總數量</div>
          <div className="text-2xl font-bold text-primary mt-1">{stats.totalQty.toLocaleString()}</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">待加工</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500">加工中</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{stats.processing}</div>
        </Card>
      </div>

      {/* 搜尋和篩選 */}
      <Card>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜尋 IC 料號、客戶名稱、批號..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input w-full"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ICInventoryStatus | 'all')}
              className="form-input"
            >
              <option value="all">全部狀態</option>
              <option value="pending">待加工</option>
              <option value="processing">加工中</option>
              <option value="completed">已完成</option>
              <option value="shipped">已出貨</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 資料表格 */}
      <Card>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>IC 料號</th>
              <th>數量</th>
              <th>客戶名稱</th>
              <th>寄放日期</th>
              <th>批號</th>
              <th>儲位</th>
              <th>狀態</th>
              <th>備註</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  沒有符合條件的資料
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono font-medium">{item.partNumber}</td>
                  <td className="font-semibold">{item.quantity.toLocaleString()}</td>
                  <td>{item.customerName}</td>
                  <td>{item.depositDate}</td>
                  <td className="font-mono text-sm">{item.batchNo}</td>
                  <td>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">{item.location}</span>
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td className="text-gray-500 text-sm">{item.remark || '-'}</td>
                  <td>
                    <Button variant="outline-primary" size="mini">
                      編輯
                    </Button>
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
