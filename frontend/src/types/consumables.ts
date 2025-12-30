// 料帶資料
export interface Tape {
  id: string;              // 料帶編號 (CT-XXX)
  model: string;           // 型號
  spec: string;            // 規格
  stock: number;           // 目前庫存
  unit: string;            // 單位
  safetyStock: number;     // 安全庫存量
  perOrderUsage: number;   // 每單預估用量
}

// 料帶庫存狀態
export type TapeStockStatus = 'sufficient' | 'low' | 'out_of_stock';

// 燒錄座資料
export interface Socket {
  id: string;              // 燒錄座編號 (SK-XXX)
  model: string;           // 型號
  usedCount: number;       // 已使用次數
  maxCount: number;        // 使用上限
  lastCheck: string;       // 上次檢查日期
  nextCheck: string;       // 下次檢查日期
  status: SocketStatus;    // 狀態
}

// 燒錄座狀態
export type SocketStatus = 'normal' | 'warning' | 'critical';

// 計算料帶庫存狀態
export function getTapeStockStatus(
  tape: Tape,
  requiredQty: number
): TapeStockStatus {
  if (tape.stock < requiredQty) {
    return 'out_of_stock';
  }
  if (tape.stock - requiredQty < tape.safetyStock) {
    return 'low';
  }
  return 'sufficient';
}

// 計算燒錄座使用率
export function getSocketUsageRate(socket: Socket): number {
  return (socket.usedCount / socket.maxCount) * 100;
}

// 計算燒錄座狀態
export function getSocketStatus(socket: Socket): SocketStatus {
  const usageRate = getSocketUsageRate(socket);
  if (usageRate >= 99) {
    return 'critical';
  }
  if (usageRate >= 90) {
    return 'warning';
  }
  return 'normal';
}
