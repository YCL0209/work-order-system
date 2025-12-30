// 客戶資料
export interface Customer {
  id: string;                           // 客戶編號 (CUST-XXX)
  name: string;                         // 客戶名稱
  labelTemplate: LabelTemplateCode;     // 標籤模板代碼
  paymentTerm: PaymentTermCode;         // 付款條件代碼
  creditLimit: number;                  // 信用額度
  currentCredit: number;                // 目前使用額度
  contacts: ContactInfo[];              // 聯絡人資訊
  createdAt: string;                    // 建立日期
}

// 聯絡人資訊
export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  title?: string;  // 職稱
}

// 付款條件代碼
export type PaymentTermCode = 'NET30' | 'NET60' | 'NET90';

// 付款條件定義
export interface PaymentTerm {
  code: PaymentTermCode;
  name: string;
  days: number;
}

// 標籤模板代碼
export type LabelTemplateCode = 'TEMPLATE_A' | 'TEMPLATE_B';

// 標籤模板定義
export interface LabelTemplate {
  code: LabelTemplateCode;
  name: string;
  fields: string[];
}
