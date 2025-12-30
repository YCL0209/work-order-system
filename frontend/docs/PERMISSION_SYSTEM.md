# 帳號權限管理系統設計

## 概述

本系統採用自定義權限設計，管理者可為每個帳號勾選可存取的頁面。

---

## 角色定義

| 角色 | 說明 | 預設權限 |
|------|------|---------|
| 管理者 | 最高權限（老闆） | 全部頁面 |
| 助理 | 日常操作人員 | 依帳號設定 |

---

## 頁面權限列表

| 頁面 | 路由 | 說明 |
|------|------|------|
| 儀表板 | `/dashboard` | 營運概覽（僅管理者） |
| 流程進度 | `/order-flow` | 訂單流程操作 |
| 訂單管理 | `/orders` | 訂單列表 |
| 客戶管理 | `/customers` | 客戶資料維護 |
| 耗材管控 | `/consumables` | 料帶、燒錄座管理 |
| 金流管理 | `/finance` | 請款、收款 |
| 帳號管理 | `/accounts` | 帳號權限設定（僅管理者） |

---

## 資料結構

### Account 帳號

```typescript
interface Account {
  id: string;
  username: string;
  displayName: string;
  role: 'admin' | 'assistant';
  permissions: PagePermission[];
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}
```

### PagePermission 頁面權限

```typescript
type PagePermission =
  | 'dashboard'
  | 'order-flow'
  | 'orders'
  | 'customers'
  | 'consumables'
  | 'finance'
  | 'accounts';
```

---

## 權限檢查邏輯

```typescript
// 檢查用戶是否有權限進入頁面
function hasPagePermission(user: Account, page: PagePermission): boolean {
  // 管理者擁有全部權限
  if (user.role === 'admin') return true;

  // 助理依據 permissions 陣列判斷
  return user.permissions.includes(page);
}
```

---

## 前端實作方式

### 簡單版（目前）
- 僅控制頁面是否可進入
- 側邊欄根據權限顯示/隱藏項目
- 無權限頁面顯示「無權限」提示

### 完整版（未來）
- 細分到各項操作（新增/編輯/刪除/確認）
- 流程階段權限細分
- 按鈕級別權限控制

---

## 後端 API 規劃（未來）

```
POST   /api/auth/login          登入
POST   /api/auth/logout         登出
GET    /api/accounts            取得帳號列表
POST   /api/accounts            新增帳號
PUT    /api/accounts/:id        更新帳號（含權限）
DELETE /api/accounts/:id        刪除帳號
GET    /api/accounts/me         取得當前登入者資訊
```

---

## 更新紀錄

| 日期 | 版本 | 說明 |
|------|------|------|
| 2024-12-24 | v1.0 | 初版設計 |
