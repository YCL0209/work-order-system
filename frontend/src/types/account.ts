// 頁面權限類型
export type PagePermission =
  | 'dashboard'
  | 'order-flow'
  | 'orders'
  | 'customers'
  | 'consumables'
  | 'finance'
  | 'accounts';

// 帳號角色
export type AccountRole = 'admin' | 'assistant';

// 帳號資料
export interface Account {
  id: string;
  username: string;
  displayName: string;
  role: AccountRole;
  permissions: PagePermission[];
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}

// 頁面權限定義
export interface PageDefinition {
  key: PagePermission;
  name: string;
  description: string;
  adminOnly?: boolean;
}

// 所有頁面定義
export const PAGE_DEFINITIONS: PageDefinition[] = [
  { key: 'dashboard', name: '儀表板', description: '營運數據總覽', adminOnly: true },
  { key: 'order-flow', name: '流程進度', description: '訂單流程操作' },
  { key: 'orders', name: '訂單管理', description: '訂單列表與維護' },
  { key: 'customers', name: '客戶管理', description: '客戶資料維護' },
  { key: 'consumables', name: '耗材管控', description: '料帶、燒錄座管理' },
  { key: 'finance', name: '金流管理', description: '請款、收款作業' },
  { key: 'accounts', name: '帳號管理', description: '帳號權限設定', adminOnly: true },
];
