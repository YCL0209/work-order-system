// 側邊欄導航項目
export interface NavItem {
  path: string;
  label: string;
  children?: NavItem[];
}

export const SIDEBAR_NAVIGATION: NavItem[] = [
  { path: '/dashboard', label: '系統總覽' },
  { path: '/orders', label: '訂單管理' },
  { path: '/customers', label: '客戶管理' },
  { path: '/ic-inventory', label: 'IC 庫存管理' },
  {
    path: '/consumables',
    label: '耗材管控',
    children: [
      { path: '/consumables/tapes', label: '料帶管理' },
      { path: '/consumables/sockets', label: '燒錄座管理' },
      { path: '/consumables/others', label: '其他管理' },
    ],
  },
  { path: '/finance', label: '金流管理' },
  { path: '/accounts', label: '帳號管理' },
  { path: '/login-preview', label: '登入頁面' },
];
