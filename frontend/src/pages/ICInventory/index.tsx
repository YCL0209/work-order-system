import { useState, useMemo } from 'react';
import { Badge, Button, Card, Drawer } from '@/components/common';
import { mockICInventory } from '@/mocks';
import type { ICInventory, ICInventoryStatus } from '@/types';
import { IC_INVENTORY_STATUS_LABELS, IC_INVENTORY_STATUS_COLORS } from '@/types';

type FormData = {
  partNumber: string;
  quantity: number;
  customerName: string;
  depositDate: string;
  batchNo: string;
  location: string;
  status: ICInventoryStatus;
  remark: string;
};

const emptyForm: FormData = {
  partNumber: '',
  quantity: 0,
  customerName: '',
  depositDate: new Date().toISOString().split('T')[0],
  batchNo: '',
  location: '',
  status: 'pending',
  remark: '',
};

export default function ICInventoryPage() {
  const [inventory, setInventory] = useState<ICInventory[]>(mockICInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ICInventoryStatus | 'all'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<ICInventory | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  // 篩選資料
  const filteredData = useMemo(() => {
    return inventory.filter((item) => {
      const matchSearch =
        item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [inventory, searchTerm, statusFilter]);

  const getStatusBadge = (status: ICInventoryStatus) => {
    const variant = IC_INVENTORY_STATUS_COLORS[status] as 'warning' | 'active' | 'success' | 'completed';
    return <Badge variant={variant}>{IC_INVENTORY_STATUS_LABELS[status]}</Badge>;
  };

  // 開啟新增
  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setIsAdding(true);
  };

  // 開啟編輯
  const handleOpenEdit = (item: ICInventory) => {
    setFormData({
      partNumber: item.partNumber,
      quantity: item.quantity,
      customerName: item.customerName,
      depositDate: item.depositDate,
      batchNo: item.batchNo,
      location: item.location,
      status: item.status,
      remark: item.remark || '',
    });
    setEditingItem(item);
  };

  // 關閉 Drawer
  const handleClose = () => {
    setIsAdding(false);
    setEditingItem(null);
    setFormData(emptyForm);
  };

  // 新增庫存
  const handleAdd = () => {
    if (!formData.partNumber || !formData.customerName || formData.quantity <= 0) {
      alert('請填寫必填欄位');
      return;
    }
    const newItem: ICInventory = {
      id: `IC-${Date.now()}`,
      ...formData,
      remark: formData.remark || undefined,
    };
    setInventory(prev => [...prev, newItem]);
    handleClose();
  };

  // 儲存編輯
  const handleSave = () => {
    if (!editingItem) return;
    if (!formData.partNumber || !formData.customerName || formData.quantity <= 0) {
      alert('請填寫必填欄位');
      return;
    }
    setInventory(prev =>
      prev.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, remark: formData.remark || undefined }
          : item
      )
    );
    handleClose();
  };

  // 渲染表單
  const renderForm = () => (
    <div className="space-y-4">
      <div>
        <label className="form-label">IC 料號 *</label>
        <input
          type="text"
          className="form-input"
          placeholder="例：ATmega328P"
          value={formData.partNumber}
          onChange={e => setFormData({ ...formData, partNumber: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label">數量 *</label>
        <input
          type="number"
          className="form-input"
          placeholder="0"
          value={formData.quantity}
          onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
        />
      </div>
      <div>
        <label className="form-label">客戶名稱 *</label>
        <input
          type="text"
          className="form-input"
          placeholder="請輸入客戶名稱"
          value={formData.customerName}
          onChange={e => setFormData({ ...formData, customerName: e.target.value })}
        />
      </div>
      <div>
        <label className="form-label">寄放日期 *</label>
        <input
          type="date"
          className="form-input"
          value={formData.depositDate}
          onChange={e => setFormData({ ...formData, depositDate: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">批號</label>
          <input
            type="text"
            className="form-input"
            placeholder="例：B2024-001"
            value={formData.batchNo}
            onChange={e => setFormData({ ...formData, batchNo: e.target.value })}
          />
        </div>
        <div>
          <label className="form-label">儲位</label>
          <input
            type="text"
            className="form-input"
            placeholder="例：A-01-02"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="form-label">狀態</label>
        <select
          className="form-input"
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value as ICInventoryStatus })}
        >
          <option value="pending">待加工</option>
          <option value="processing">加工中</option>
          <option value="completed">已完成</option>
          <option value="shipped">已出貨</option>
        </select>
      </div>
      <div>
        <label className="form-label">備註</label>
        <textarea
          className="form-input"
          rows={3}
          placeholder="其他備註資訊"
          value={formData.remark}
          onChange={e => setFormData({ ...formData, remark: e.target.value })}
        />
      </div>
      <div className="flex gap-3 !mt-6 pt-6 border-t border-gray-200">
        <Button
          variant="primary"
          className="flex-[2]"
          onClick={editingItem ? handleSave : handleAdd}
        >
          {editingItem ? '儲存變更' : '新增庫存'}
        </Button>
        <Button variant="secondary" className="flex-1" onClick={handleClose}>
          取消
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">IC 庫存管理</h1>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          + 新增庫存
        </Button>
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
                    <Button variant="outline-primary" size="mini" onClick={() => handleOpenEdit(item)}>
                      編輯
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* 新增庫存 Drawer */}
      <Drawer
        isOpen={isAdding}
        onClose={handleClose}
        title="新增庫存"
        width="md"
      >
        {renderForm()}
      </Drawer>

      {/* 編輯庫存 Drawer */}
      <Drawer
        isOpen={!!editingItem}
        onClose={handleClose}
        title={editingItem ? `編輯 - ${editingItem.partNumber}` : '編輯庫存'}
        width="md"
      >
        {renderForm()}
      </Drawer>
    </div>
  );
}
