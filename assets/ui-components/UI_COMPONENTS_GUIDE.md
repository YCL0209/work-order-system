# 工單系統 UI 組件規範

> 基於 OrderManagement-2025 設計，適用於 React + Vite 專案

---

## 1. 字體規範

### 1.1 字體家族

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, 'Noto Sans TC', sans-serif;
```

### 1.2 字體大小

| 名稱 | 大小 | 用途 |
|------|------|------|
| `text-xs` | 11px | 迷你按鈕、標籤 |
| `text-sm` | 12px | 提示文字、次要資訊 |
| `text-base` | 14px | 正文、表格、表單 |
| `text-lg` | 16px | 金額、重要數值 |
| `text-xl` | 18px | 統計卡片數值 |
| `text-2xl` | 24px | 頁面標題 |
| `text-3xl` | 30px | 大標題 |

### 1.3 字體粗細

| 名稱 | 粗細 | 用途 |
|------|------|------|
| `font-normal` | 400 | 正文 |
| `font-medium` | 500 | 標籤、次要標題 |
| `font-semibold` | 600 | 數值、按鈕 |
| `font-bold` | 700 | 標題 |

---

## 2. 間距系統

### 2.1 標準間距

| 名稱 | 大小 | CSS 變數 |
|------|------|----------|
| `xs` | 4px | `--spacing-xs` |
| `sm` | 8px | `--spacing-sm` |
| `md` | 12px | `--spacing-md` |
| `lg` | 16px | `--spacing-lg` |
| `xl` | 20px | `--spacing-xl` |
| `2xl` | 24px | `--spacing-2xl` |
| `3xl` | 32px | `--spacing-3xl` |

### 2.2 組件內部間距建議

| 組件 | padding | gap |
|------|---------|-----|
| 按鈕（小）| 6px 12px | - |
| 按鈕（中）| 8px 16px | - |
| 按鈕（大）| 12px 24px | - |
| 卡片 | 16px ~ 24px | - |
| 表格儲存格 | 12px 16px | - |
| 表單輸入框 | 8px 12px | - |
| Modal | 24px | 16px |

---

## 3. 圓角規範

| 名稱 | 大小 | 用途 |
|------|------|------|
| `rounded-sm` | 4px | 小按鈕、標籤 |
| `rounded` | 6px | 按鈕、輸入框 |
| `rounded-lg` | 8px | 卡片、Modal |
| `rounded-xl` | 12px | 大卡片 |
| `rounded-full` | 9999px | 圓形頭像、徽章 |

---

## 4. 按鈕樣式

### 4.1 按鈕類型

```tsx
// Primary - 主要動作
<Button variant="primary">建立工單</Button>

// Secondary - 次要動作
<Button variant="secondary">取消</Button>

// Success - 成功/確認
<Button variant="success">完成</Button>

// Danger - 危險/刪除
<Button variant="danger">刪除</Button>

// Ghost - 幽靈按鈕
<Button variant="ghost">更多</Button>
```

### 4.2 按鈕 CSS

```css
/* 基礎按鈕 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

/* Primary */
.btn-primary {
  background: var(--brand-primary);
  color: #ffffff;
  border: none;
}
.btn-primary:hover {
  background: var(--brand-primary-dark);
}

/* Secondary */
.btn-secondary {
  background: transparent;
  color: var(--brand-primary);
  border: 1px solid var(--brand-primary);
}
.btn-secondary:hover {
  background: var(--brand-primary);
  color: #ffffff;
}

/* Success */
.btn-success {
  background: var(--success);
  color: #ffffff;
  border: none;
}
.btn-success:hover {
  background: var(--success-dark);
}

/* Danger */
.btn-danger {
  background: var(--danger);
  color: #ffffff;
  border: none;
}
.btn-danger:hover {
  background: var(--danger-dark);
}

/* Disabled */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 5. 表單元素

### 5.1 輸入框

```css
.input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: border-color 0.15s ease;
}

.input:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(64, 115, 194, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:disabled {
  background: var(--bg-tertiary);
  cursor: not-allowed;
}

/* 錯誤狀態 */
.input.error {
  border-color: var(--danger);
}
```

### 5.2 選擇器

```css
.select {
  width: 100%;
  padding: 8px 32px 8px 12px;
  font-size: 14px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--bg-primary) url('data:image/svg+xml,...') no-repeat right 12px center;
  appearance: none;
  cursor: pointer;
}
```

### 5.3 標籤

```css
.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.label.required::after {
  content: '*';
  color: var(--danger);
  margin-left: 4px;
}
```

---

## 6. 卡片組件

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.card-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-light);
  font-size: 16px;
  font-weight: 600;
}

.card-body {
  padding: 16px;
}

.card-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--border-light);
  background: var(--bg-secondary);
  border-radius: 0 0 8px 8px;
}
```

---

## 7. 表格樣式

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border-bottom: 2px solid var(--border-light);
}

.table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-primary);
}

.table tr:hover {
  background: var(--bg-tertiary);
}

/* 斑馬紋（可選）*/
.table-striped tr:nth-child(even) {
  background: var(--bg-secondary);
}
```

---

## 8. 狀態標籤（Badge）

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
}

/* 狀態變體 */
.badge-pending {
  background: #f3f4f6;
  color: #6b7280;
}

.badge-processing {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-completed {
  background: #dcfce7;
  color: #166534;
}

.badge-cancelled {
  background: #fee2e2;
  color: #dc2626;
}

/* 優先級 */
.badge-priority-high {
  background: #fef3c7;
  color: #d97706;
}

.badge-priority-urgent {
  background: #fee2e2;
  color: #dc2626;
}
```

---

## 9. Modal 彈窗

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
}

.modal-close:hover {
  background: var(--bg-tertiary);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

---

## 10. 側邊欄導航

```css
.sidebar {
  width: 240px;
  height: 100vh;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 20px;
  border-bottom: 1px solid var(--border-light);
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  color: var(--text-secondary);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--brand-primary);
  color: #ffffff;
}

.nav-item-icon {
  width: 20px;
  height: 20px;
}
```

---

## 11. React 組件範例

### 11.1 Button 組件

```tsx
// components/common/Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="spinner" />}
      {children}
    </button>
  );
}
```

### 11.2 Badge 組件

```tsx
// components/common/Badge.tsx
import React from 'react';
import './Badge.css';

interface BadgeProps {
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  children: React.ReactNode;
}

const statusLabels = {
  pending: '待處理',
  processing: '處理中',
  completed: '已完成',
  cancelled: '已取消'
};

export function Badge({ status, children }: BadgeProps) {
  return (
    <span className={`badge badge-${status}`}>
      {children || statusLabels[status]}
    </span>
  );
}
```

---

*文件產生日期：2025-12-10*
