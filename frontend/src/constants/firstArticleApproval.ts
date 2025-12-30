// 首見承認書相關常數

// 廠別選項
export const FACTORY_OPTIONS = [
  { value: 'HQ', label: '總公司' },
  { value: 'FACTORY_A', label: '工廠A' },
  { value: 'FACTORY_B', label: '工廠B' },
];

// IC 廠牌選項
export const BRAND_OPTIONS = [
  { value: 'Nuvoton', label: 'Nuvoton' },
  { value: 'Microchip', label: 'Microchip' },
  { value: 'STM', label: 'STMicroelectronics' },
  { value: 'TI', label: 'Texas Instruments' },
  { value: 'NXP', label: 'NXP' },
  { value: 'Infineon', label: 'Infineon' },
  { value: 'Renesas', label: 'Renesas' },
  { value: 'Other', label: '其他' },
];

// 訂單類型選項
export const ORDER_TYPE_OPTIONS = [
  { value: 'sample', label: 'Sample' },
  { value: 'free', label: 'Free' },
  { value: 'rework', label: 'Rework' },
  { value: 'none', label: '無' },
];

// 幣別選項
export const CURRENCY_OPTIONS = [
  { value: 'NTD', label: 'NTD' },
  { value: 'USD', label: 'USD' },
  { value: 'CNY', label: 'CNY' },
  { value: 'JPY', label: 'JPY' },
];

// MOQ 選項
export const MOQ_OPTIONS = [
  { value: 0, label: '無' },
  { value: 1000, label: '1,000' },
  { value: 5000, label: '5,000' },
  { value: 10000, label: '10,000' },
  { value: 50000, label: '50,000' },
  { value: 100000, label: '100,000' },
];

// 交貨方式選項
export const DELIVERY_METHOD_OPTIONS = [
  { value: 'pickup', label: '自取' },
  { value: 'delivery', label: '送貨' },
  { value: 'express', label: '快遞' },
  { value: 'freight', label: '貨運' },
];

// 封裝類型選項
export const PACKAGE_OPTIONS = [
  { value: 'QFN20', label: 'QFN20' },
  { value: 'QFN32', label: 'QFN32' },
  { value: 'QFN48', label: 'QFN48' },
  { value: 'LQFP32', label: 'LQFP32' },
  { value: 'LQFP48', label: 'LQFP48' },
  { value: 'LQFP64', label: 'LQFP64' },
  { value: 'LQFP100', label: 'LQFP100' },
  { value: 'TSSOP20', label: 'TSSOP20' },
  { value: 'TSSOP28', label: 'TSSOP28' },
  { value: 'SOP8', label: 'SOP8' },
  { value: 'SOP16', label: 'SOP16' },
  { value: 'DIP8', label: 'DIP8' },
  { value: 'DIP16', label: 'DIP16' },
  { value: 'Other', label: '其他' },
];

// 付款方式選項
export const PAYMENT_TERM_OPTIONS = [
  { value: '月結30天', label: '月結30天' },
  { value: '月結60天', label: '月結60天' },
  { value: '月結90天', label: '月結90天' },
  { value: '貨到付款', label: '貨到付款' },
  { value: '預付款', label: '預付款' },
];

// 產生系統序號
export function generateSystemNo(): string {
  const now = new Date();
  const timestamp = now.getTime();
  return `SYS${timestamp}`;
}

// 產生首件承認書編號
export function generateApprovalNo(): string {
  const now = new Date();
  const year = now.getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${random}`;
}
