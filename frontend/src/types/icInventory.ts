// IC 庫存資料結構
export interface ICInventory {
  id: string;                    // 唯一識別碼
  partNumber: string;            // IC 料號
  quantity: number;              // 數量
  customerId: string;            // 客戶 ID
  customerName: string;          // 客戶名稱
  depositDate: string;           // 寄放日期
  batchNo: string;               // 批號
  location: string;              // 儲位
  status: ICInventoryStatus;     // 狀態
  remark: string;                // 備註
  createdAt: string;             // 建立時間
  updatedAt: string;             // 更新時間
}

// 庫存狀態
export type ICInventoryStatus = 'pending' | 'processing' | 'completed' | 'shipped';

// 狀態標籤對應
export const IC_INVENTORY_STATUS_LABELS: Record<ICInventoryStatus, string> = {
  pending: '待加工',
  processing: '加工中',
  completed: '已完成',
  shipped: '已出貨',
};

// 狀態顏色對應
export const IC_INVENTORY_STATUS_COLORS: Record<ICInventoryStatus, string> = {
  pending: 'warning',
  processing: 'active',
  completed: 'success',
  shipped: 'completed',
};
