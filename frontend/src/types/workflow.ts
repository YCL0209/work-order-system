import type { FirstArticleApproval } from './firstArticleApproval';

// 流程階段狀態
export type StageStatus = 'pending' | 'active' | 'completed';

// 流程階段定義
export interface WorkflowStage {
  id: number;
  name: string;
  description: string;
}

// 階段前進條件檢查函數類型
export type StageConditionChecker = (orderData: OrderData) => boolean;

// 訂單資料類型（前向宣告，在 order.ts 中完整定義）
export interface OrderData {
  orderId: string;
  customerId: string;
  hasExistingData: boolean | null;
  currentStage: number;
  icInfo: ICInfo;
  workOrders: WorkOrders;
  inventory: Inventory;
  consumables: ConsumablesSelection;
  shipping: ShippingInfo;
  finance: FinanceInfo;
  firstArticleApproval: FirstArticleApproval | null;  // 首見承認書（新增承認書時填寫）
  createdAt: string;
  updatedAt: string;
}

// IC 燒錄資訊
export interface ICInfo {
  partNumber: string;
  checkSum: string;
  history: HistoryRecord[];
}

// 歷史紀錄
export interface HistoryRecord {
  id: string;
  date: string;
  totalQty: number;
  okQty: number;
  ngQty: number;
  ngDetails: NGDetail[];
  operator: string;
}

// NG 明細
export interface NGDetail {
  reason: NGReasonCode;
  qty: number;
  note: string;
}

// NG 原因代碼
export type NGReasonCode =
  | 'BURN_FAIL'
  | 'CHECKSUM_ERR'
  | 'PIN_DAMAGE'
  | 'EMPTY_BURN'
  | 'TIMEOUT'
  | 'OTHER';

// 委工單
export interface WorkOrders {
  processing: WorkOrderItem;  // 加工單
  programming: WorkOrderItem; // 燒錄單
}

// 委工單項目
export interface WorkOrderItem {
  type: '加工單' | '燒錄單';
  source: WorkOrderSource | null;
  status: WorkOrderStatus;
}

// 派工來源
export type WorkOrderSource = 'internal' | 'external' | 'na';

// 委工單狀態
export type WorkOrderStatus = 'pending' | 'active' | 'completed';

// 進出料資訊
export interface Inventory {
  selectedInventoryId: string | null;  // 選擇的 IC 庫存項目 ID
  incomingQty: number;    // 進料數量
  okQty: number;          // 良品數量
  ngQty: number;          // 不良品數量
  ngDetails: NGDetail[];  // NG 明細
  isReconciled: boolean;  // 是否已勾稽
}

// 耗材選擇
export interface ConsumablesSelection {
  selectedTape: string | null;    // 選擇的料帶編號
  selectedSocket: string | null;  // 選擇的燒錄座編號
  tapeRequired: number;           // 料帶需求量
  isChecked: boolean;             // 是否已檢查
}

// 出貨資訊
export interface ShippingInfo {
  quantity: number;       // 出貨數量
  batchNo: string;        // 批號
  labelPrinted: boolean;  // 標籤是否已列印
}

// 金流資訊
export interface FinanceInfo {
  unitPrice: number;                      // 單價
  totalAmount: number;                    // 總金額
  paymentStatus: PaymentStatus;           // 付款狀態
  invoiceNo: string | null;               // 發票號碼
  invoiceDate: string | null;             // 開票日期
  invoiceAmount: number | null;           // 發票金額
  taxAmount: number | null;               // 稅額
  invoiceRemark: string | null;           // 發票備註
  dueDate: string | null;                 // 到期日
  paidDate: string | null;                // 付款日期
}

// 付款狀態
export type PaymentStatus = 'pending' | 'invoiced' | 'paid' | 'overdue';
