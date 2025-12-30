import type { LabelTemplate, LabelTemplateCode } from '@/types';

// 標籤模板定義
export const LABEL_TEMPLATES: LabelTemplate[] = [
  {
    code: 'TEMPLATE_A',
    name: '標準模板 A',
    fields: ['客戶名稱', '訂單編號', '料號', '數量', '日期', '批號'],
  },
  {
    code: 'TEMPLATE_B',
    name: '詳細模板 B',
    fields: ['客戶名稱', '訂單編號', '料號', '數量', '日期', '批號', 'Check Sum', 'QR Code'],
  },
];

// 根據代碼取得標籤模板
export function getLabelTemplateByCode(code: LabelTemplateCode): LabelTemplate | undefined {
  return LABEL_TEMPLATES.find(template => template.code === code);
}

// 產生批號
export function generateBatchNo(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `B${year}-${month}${day}-${random}`;
}
