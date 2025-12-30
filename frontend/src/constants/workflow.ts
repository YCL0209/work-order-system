import type { WorkflowStage, OrderData } from '@/types';

// 7 階段流程定義
export const WORKFLOW_STAGES: WorkflowStage[] = [
  { id: 1, name: '確認客戶資料', description: '查詢 IC 燒錄資訊（Check Sum、歷史紀錄）' },
  { id: 2, name: '耗材檢查', description: '確認料帶庫存、燒錄座壽命' },
  { id: 3, name: '文件生成', description: '發送委工單與首件承認書給客戶' },
  { id: 4, name: '進料分派', description: '選擇進料庫存、分派至內部或外包' },
  { id: 5, name: '執行作業', description: '登記 OK/NG 數量並確認勾稽' },
  { id: 6, name: '出貨作業', description: '製作出貨標籤、包裝出貨' },
  { id: 7, name: '完成', description: '所有作業完成，等待付款' },
];

// 階段前進條件檢查
export const STAGE_CONDITIONS: Record<number, (order: OrderData) => boolean> = {
  1: (order) => order.hasExistingData !== null,
  2: (order) => order.consumables.isChecked,
  4: (order) =>
    order.inventory.incomingQty > 0 &&
    order.workOrders.processing.source !== null &&
    order.workOrders.programming.source !== null,
  5: (order) => order.inventory.okQty > 0 && order.inventory.isReconciled,
  6: (order) => order.shipping.labelPrinted,
};

// 檢查是否可以前進到下一階段
export function canAdvanceStage(currentStage: number, order: OrderData): boolean {
  const condition = STAGE_CONDITIONS[currentStage];
  if (!condition) return true;
  return condition(order);
}

// 階段自動觸發動作
export const STAGE_AUTO_ACTIONS: Record<number, string[]> = {
  4: ['顯示庫存選擇與委工單配置選項'],
  5: ['加工單與燒錄單狀態改為「進行中」'],
  6: ['加工單與燒錄單狀態改為「已完成」'],
  7: ['付款狀態改為「待請款」，等待人員填寫發票資訊'],
};

// 功能分頁定義
export const FUNCTION_TABS = [
  { key: 'workflow', label: '流程進度', icon: '📋' },
  { key: 'consumables', label: '耗材管控', icon: '🔧' },
  { key: 'inventory', label: '進出料管控', icon: '📊' },
  { key: 'icInfo', label: 'IC 燒錄資訊', icon: '💾' },
  { key: 'workOrder', label: '委工單', icon: '📄' },
  { key: 'shipping', label: '出貨標籤', icon: '📦' },
  { key: 'finance', label: '金流管理', icon: '💰' },
] as const;

export type FunctionTabKey = typeof FUNCTION_TABS[number]['key'];

// 階段對應功能分頁映射
export const STAGE_TO_TAB: Record<number, FunctionTabKey> = {
  1: 'icInfo',        // 確認客戶資料 → IC 燒錄資訊
  2: 'consumables',   // 耗材檢查 → 耗材管控
  3: 'workOrder',     // 文件生成 → 委工單
  4: 'inventory',     // 進料分派 → 進出料管控
  5: 'inventory',     // 執行作業 → 進出料管控
  6: 'shipping',      // 出貨作業 → 出貨標籤
  7: 'finance',       // 完成 → 金流管理
};
