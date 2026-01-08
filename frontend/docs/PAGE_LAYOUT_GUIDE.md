# 頁面框架規範指南

> IC 燒錄 MES 系統 - 前端頁面統一規範

## 頁面結構

所有頁面必須遵循以下標準結構：

```
┌─────────────────────────────────────────────────────────┐
│ <div className="space-y-6">                              │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ 標題區域                           [操作按鈕]   │   │
│   │ 副標題說明                                      │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ <Card> 篩選/搜尋區域                            │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ <Card> 統計卡片區域 (grid)                      │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │ <Card> 表格/內容區域                            │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 1. 頂級容器

**必須使用** `space-y-6` 作為頁面頂級容器，確保區塊間距一致。

```tsx
export default function PageName() {
  return (
    <div className="space-y-6">
      {/* 頁面內容 */}
    </div>
  );
}
```

---

## 2. 標題區域

### 標準結構

```tsx
{/* 標題區域 */}
<div className="flex items-center justify-between page-header">
  <div>
    <h1 className="text-2xl font-bold text-gray-800">頁面標題</h1>
    <p className="text-gray-500 mt-1">頁面說明文字</p>
  </div>
  {/* 操作按鈕（如有）*/}
  <button className="btn btn-primary">+ 新增</button>
</div>
```

> **重要**: 標題區域必須加上 `page-header` class 以確保與側邊欄的間距。

### 規則

| 元素 | 樣式 |
|-----|------|
| 標題 | `text-2xl font-bold text-gray-800` |
| 副標題 | `text-gray-500 mt-1` |
| 按鈕位置 | 右側，使用 `flex justify-between` |
| 主要按鈕 | `btn btn-primary` |

### 無按鈕時

```tsx
<div>
  <h1 className="text-2xl font-bold text-gray-800">頁面標題</h1>
  <p className="text-gray-500 mt-1">頁面說明文字</p>
</div>
```

---

## 3. 卡片組件

**必須使用** `<Card>` 組件，禁止使用原生 `<div className="card">`。

### 基本用法

```tsx
import { Card } from '@/components/common';

// 無標題
<Card>
  {/* 內容 */}
</Card>

// 有標題
<Card title="區塊標題">
  {/* 內容 */}
</Card>

// 有標題和操作按鈕
<Card
  title="區塊標題"
  extra={<button className="btn btn-sm btn-primary">操作</button>}
>
  {/* 內容 */}
</Card>
```

---

## 4. 篩選/搜尋區域

```tsx
<Card>
  <div className="flex flex-wrap gap-4 items-center">
    {/* 搜尋輸入框 */}
    <div className="flex-1 min-w-64">
      <input
        type="text"
        placeholder="搜尋..."
        className="form-input"
      />
    </div>

    {/* 下拉篩選 */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">篩選：</label>
      <select className="form-input w-40">
        <option value="all">全部</option>
      </select>
    </div>
  </div>
</Card>
```

---

## 5. 統計卡片

### 標準結構

```tsx
<div className="grid grid-cols-4 gap-4">
  <Card className="text-center">
    <p className="text-gray-500 text-sm">標籤</p>
    <p className="text-2xl font-bold text-primary mt-1">數值</p>
  </Card>
  {/* 更多卡片... */}
</div>
```

### 網格規則

| 卡片數量 | 網格類名 |
|---------|---------|
| 3 個 | `grid-cols-3` |
| 4 個 | `grid-cols-4` |
| 響應式 | `grid-cols-2 md:grid-cols-4` |

---

## 6. 表格

### 標準結構

```tsx
<Card title="表格標題">
  <table className="data-table w-full">
    <thead>
      <tr>
        <th>欄位名稱</th>
        <th>欄位名稱</th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td>{item.field}</td>
          <td>{item.field}</td>
        </tr>
      ))}
    </tbody>
  </table>
</Card>
```

### 表格規則

| 元素 | 樣式 |
|-----|------|
| 表格 | `data-table w-full` |
| 行 hover | `hover:bg-gray-50` |
| 空資料 | `<td colSpan={n} className="text-center py-8 text-gray-400">` |

---

## 7. 按鈕樣式

| 用途 | 類名 |
|-----|------|
| 主要操作 | `btn btn-primary` |
| 次要操作 | `btn btn-outline-primary` |
| 危險操作 | `btn btn-danger` |
| 小型按鈕 | `btn btn-sm btn-primary` |
| 表格內按鈕 | `btn btn-sm btn-outline-primary` |

---

## 8. 表單元素

```tsx
{/* 輸入框 */}
<input type="text" className="form-input" />

{/* 下拉選單 */}
<select className="form-input">
  <option>選項</option>
</select>

{/* 標籤 */}
<label className="form-label">標籤文字</label>
```

---

## 9. 間距規範

| 用途 | 類名 | 大小 |
|-----|------|------|
| 主內容區間距 | `main-content` | 上24px 右32px 下24px 左8px |
| 頁面標題間距 | `page-header` | 左16px |
| 頁面區塊間 | `space-y-6` | 24px |
| 卡片間 | `gap-4` 或 `gap-6` | 16px / 24px |
| 表單項間 | `space-y-4` | 16px |
| 內部元素間 | `gap-2` 或 `gap-4` | 8px / 16px |

> **注意**: `main-content` 和 `page-header` 是自訂 CSS class，定義於 `styles/index.css`。

---

## 10. 完整範例

```tsx
import { useState } from 'react';
import { Card } from '@/components/common';

export default function ExamplePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* 標題區域 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">範例頁面</h1>
          <p className="text-gray-500 mt-1">這是頁面說明文字</p>
        </div>
        <button className="btn btn-primary">+ 新增項目</button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-gray-500 text-sm">總計</p>
          <p className="text-2xl font-bold text-primary mt-1">100</p>
        </Card>
        {/* 更多統計卡片... */}
      </div>

      {/* 篩選區域 */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="搜尋..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </Card>

      {/* 表格區域 */}
      <Card title="資料列表">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td>001</td>
              <td>項目名稱</td>
              <td><span className="badge badge-active">進行中</span></td>
              <td>
                <button className="btn btn-sm btn-outline-primary">
                  查看
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
```

---

## 11. Drawer 抽屜面板

當需要新增/編輯資料時，使用 `<Drawer>` 組件從右側滑出覆蓋式面板。

> **注意**：原 `SplitView` 組件會壓縮主內容區域，已改用 `Drawer` 覆蓋式設計。

### 使用方式

```tsx
import { Drawer } from '@/components/common';

<Drawer
  isOpen={isAdding}
  onClose={() => setIsAdding(false)}
  title="新增項目"
  width="md"
>
  <AddForm />
</Drawer>
```

### Props

| 屬性 | 類型 | 說明 |
|-----|------|------|
| `isOpen` | boolean | 是否顯示抽屜 |
| `onClose` | () => void | 關閉抽屜的回調 |
| `title` | string | 抽屜標題 |
| `children` | ReactNode | 抽屜內容 |
| `footer` | ReactNode | 抽屜底部內容（可選） |
| `width` | 'sm' \| 'md' \| 'lg' | 抽屜寬度（320px / 384px / 480px） |

### 適用場景

- 新增資料（表單在右側抽屜）
- 編輯資料（選中列表項目後顯示編輯表單）
- 查看詳情（點擊列表項目顯示詳細資訊）

---

## 12. 已統一的頁面

以下頁面已遵循本規範：

| 頁面 | 路徑 | 說明 |
|-----|------|------|
| 儀表板 | `/dashboard` | Dashboard |
| 訂單管理 | `/orders` | Orders |
| 客戶管理 | `/customers` | Customers |
| 金流管理 | `/finance` | Finance |
| 帳號管理 | `/account` | AccountManagement（使用 Drawer）|
| IC 庫存管理 | `/ic-inventory` | ICInventory |
| 耗材管控 | `/consumables` | Consumables（使用 Drawer）|

---

## 13. 已知問題與解決方案

### Tailwind margin class 失效問題

**問題描述**：
在某些情況下，Tailwind 的 margin class（如 `mb-12`、`mt-8`）可能不會生效，即使程式碼正確也看不到效果。

**原因**：
1. CSS 優先級衝突：`index.css` 中的其他規則可能覆蓋 Tailwind 的 utility class
2. Tailwind JIT 模式可能未正確編譯該 class
3. `space-y-*` 使用的 `> * + *` 選擇器可能與其他 margin 產生衝突

**解決方案**：
使用 **inline style** 強制設定，因為 inline style 優先級最高。

```tsx
// ❌ 可能失效
<div className="grid grid-cols-4 gap-6 mb-12">

// ✅ 使用 inline style 確保生效
<div className="grid grid-cols-4 gap-6" style={{ marginBottom: '48px' }}>
```

**實際案例**：
儀表板（Dashboard）的統計卡片與下方區塊間距，使用 `mb-12` 無效，改用 `style={{ marginBottom: '48px' }}` 後成功。

---

## 版本紀錄

| 版本 | 日期 | 說明 |
|-----|------|------|
| 1.6 | 2025-01-06 | SplitView 改為 Drawer 覆蓋式抽屜，避免主頁面被壓縮 |
| 1.5 | 2025-01-05 | 新增「已知問題」章節，記錄 Tailwind margin 失效問題 |
| 1.4 | 2024-12-30 | 新增 `SplitView` 分割面板組件規範 |
| 1.3 | 2024-12-30 | 新增 `page-header` 頁面標題間距規範 |
| 1.2 | 2024-12-30 | 新增 `main-content` 主內容區間距規範 |
| 1.1 | 2024-12-30 | 新增 ICInventory 頁面，補充已統一頁面清單 |
| 1.0 | 2024-12-30 | 初版建立 |
