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
<div className="flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-bold text-gray-800">頁面標題</h1>
    <p className="text-gray-500 mt-1">頁面說明文字</p>
  </div>
  {/* 操作按鈕（如有）*/}
  <button className="btn btn-primary">+ 新增</button>
</div>
```

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
| 頁面區塊間 | `space-y-6` | 24px |
| 卡片間 | `gap-4` 或 `gap-6` | 16px / 24px |
| 表單項間 | `space-y-4` | 16px |
| 內部元素間 | `gap-2` 或 `gap-4` | 8px / 16px |

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

## 11. 已統一的頁面

以下頁面已遵循本規範：

| 頁面 | 路徑 | 說明 |
|-----|------|------|
| 儀表板 | `/dashboard` | Dashboard |
| 訂單管理 | `/orders` | Orders |
| 客戶管理 | `/customers` | Customers |
| 金流管理 | `/finance` | Finance |
| 帳號管理 | `/account` | AccountManagement |
| IC 庫存管理 | `/ic-inventory` | ICInventory |

---

## 版本紀錄

| 版本 | 日期 | 說明 |
|-----|------|------|
| 1.1 | 2024-12-30 | 新增 ICInventory 頁面，補充已統一頁面清單 |
| 1.0 | 2024-12-30 | 初版建立 |
