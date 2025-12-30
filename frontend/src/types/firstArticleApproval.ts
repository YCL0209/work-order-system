// 首見承認書資料結構
export interface FirstArticleApproval {
  // 基本資料
  systemNo: string;           // 系統序號（自動產生）
  approvalNo: string;         // 首件承認書編號（自動產生）
  isRework: boolean;          // 重工品
  orderSeq: number;           // 訂單序號
  orderNo: string;            // 訂單編號
  seq: number;                // 序號
  factory: string;            // 廠別

  // IC 資訊
  brand: string;              // 廠牌
  orderType: OrderType;       // 類型 (Sample/Free/Rework/無)
  customerPartNo: string;     // 客戶IC料號
  endCustomer: string;        // 終端客戶
  internalPartNo: string;     // 內部IC料號

  // 價格資訊
  currency: Currency;         // 幣別
  unitPrice: number;          // 單價
  paymentTerm: string;        // 付款方式
  shippingFee: number;        // 運費
  packagingFee: number;       // 包材費
  setupFee: number;           // 設定費
  moq: number;                // MOQ

  // 封裝/CheckSum
  package: string;            // 封裝
  customerCheckSum: string;   // 原廠客戶CheckSum
  project: string;            // Project

  // 數量資訊
  defectRate: number;         // 容許不良率 (/1000)
  incomingQty: number;        // 進料總數
  processQty: number;         // 加工總數
  spareQty: number;           // 備品數

  // 交貨資訊
  isAsap: boolean;            // ASAP
  customerRequestDate: string | null;  // 客戶需求日期
  deliveryDate: string | null;         // 交貨日期
  deliveryTime: string;                // 交貨時間
  deliveryMethod: string;              // 交貨方式
}

// 訂單類型
export type OrderType = 'sample' | 'free' | 'rework' | 'none';

// 幣別
export type Currency = 'NTD' | 'USD' | 'CNY' | 'JPY';

// 首見承認書初始值
export const initialFirstArticleApproval: FirstArticleApproval = {
  // 基本資料
  systemNo: '',
  approvalNo: '',
  isRework: false,
  orderSeq: 0,
  orderNo: '',
  seq: 1,
  factory: '',

  // IC 資訊
  brand: '',
  orderType: 'none',
  customerPartNo: '',
  endCustomer: '',
  internalPartNo: '',

  // 價格資訊
  currency: 'NTD',
  unitPrice: 0,
  paymentTerm: '',
  shippingFee: 0,
  packagingFee: 0,
  setupFee: 0,
  moq: 0,

  // 封裝/CheckSum
  package: '',
  customerCheckSum: '',
  project: '',

  // 數量資訊
  defectRate: 0,
  incomingQty: 0,
  processQty: 0,
  spareQty: 0,

  // 交貨資訊
  isAsap: false,
  customerRequestDate: null,
  deliveryDate: null,
  deliveryTime: '',
  deliveryMethod: '',
};
