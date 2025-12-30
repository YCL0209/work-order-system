import type { Inventory, NGDetail } from '@/types';
import { useReconciliation } from '@/hooks';
import { Card, Badge, Button } from '@/components/common';
import { getNGReasonName } from '@/constants';

interface InventoryReconciliationCardProps {
  inventory: Inventory;
  onIncomingQtyChange: (qty: number) => void;
  onOkQtyChange: (qty: number) => void;
  onAddNG: () => void;
  onRemoveNG: (index: number) => void;
  onConfirmReconciliation: () => void;
}

export function InventoryReconciliationCard({
  inventory,
  onIncomingQtyChange,
  onOkQtyChange,
  onAddNG,
  onRemoveNG,
  onConfirmReconciliation,
}: InventoryReconciliationCardProps) {
  const {
    difference,
    isBalanced,
    yieldRateDisplay,
    totalProcessed,
    reconciliationClass,
    reconciliationStatus,
    differenceNote,
  } = useReconciliation(inventory);

  return (
    <Card title="進出料管控">
      {/* 數量輸入區 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* 進料數量 */}
        <div className="p-4 bg-blue-50 rounded-card">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            進料數量
          </label>
          <input
            type="number"
            value={inventory.incomingQty || ''}
            onChange={(e) => onIncomingQtyChange(Number(e.target.value) || 0)}
            className="form-input text-lg font-semibold text-center"
            placeholder="0"
            min="0"
          />
        </div>

        {/* OK 數量 */}
        <div className="p-4 bg-green-50 rounded-card">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            OK 數量（良品）
          </label>
          <input
            type="number"
            value={inventory.okQty || ''}
            onChange={(e) => onOkQtyChange(Number(e.target.value) || 0)}
            className="form-input text-lg font-semibold text-center"
            placeholder="0"
            min="0"
          />
        </div>

        {/* NG 數量 */}
        <div className="p-4 bg-red-50 rounded-card">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            NG 數量（不良品）
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inventory.ngQty}
              readOnly
              className="form-input text-lg font-semibold text-center bg-gray-100"
            />
            <Button variant="danger" size="sm" onClick={onAddNG}>
              +
            </Button>
          </div>
        </div>
      </div>

      {/* 勾稽狀態 */}
      <div className={`p-4 rounded-card mb-6 ${reconciliationClass || 'bg-gray-50 border border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">數量勾稽</h4>
            <p className="text-sm text-gray-600 mt-1">
              進料數量 = OK 數量 + NG 數量
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {inventory.incomingQty} = {inventory.okQty} + {inventory.ngQty}
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <Badge variant={isBalanced ? 'completed' : 'danger'}>
                {reconciliationStatus}
              </Badge>
              {differenceNote && (
                <span className="text-sm text-red-600">{differenceNote}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 統計資訊 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className="text-2xl font-bold text-gray-800">{totalProcessed.toLocaleString()}</div>
          <div className="text-sm text-gray-500">總加工數</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className={`text-2xl font-bold ${
            difference === 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {difference}
          </div>
          <div className="text-sm text-gray-500">差異數</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className="text-2xl font-bold text-primary">{yieldRateDisplay}</div>
          <div className="text-sm text-gray-500">良率</div>
        </div>
      </div>

      {/* NG 明細列表 */}
      {inventory.ngDetails.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">NG 明細</h4>
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>原因</th>
                <th>數量</th>
                <th>備註</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {inventory.ngDetails.map((detail, index) => (
                <tr key={index}>
                  <td>
                    <Badge variant={detail.reason.toLowerCase().replace('_', '-') as any}>
                      {getNGReasonName(detail.reason)}
                    </Badge>
                  </td>
                  <td className="font-semibold">{detail.qty}</td>
                  <td className="text-gray-500">{detail.note || '-'}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="mini"
                      onClick={() => onRemoveNG(index)}
                    >
                      刪除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 確認按鈕 */}
      <div className="flex justify-end">
        <Button
          variant="success"
          onClick={onConfirmReconciliation}
          disabled={!isBalanced || inventory.isReconciled}
        >
          {inventory.isReconciled ? '已確認勾稽' : '確認勾稽完成'}
        </Button>
      </div>
    </Card>
  );
}
