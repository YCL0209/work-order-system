# UI 風格指南 (UI Style Guide)

**版本**: v9.0.0
**最後更新**: 2025-12-16
**適用範圍**: 穗鈅科技 ERP 系統及相關專案

---

## 1. 品牌色彩系統

### 1.1 主要品牌色

| 名稱 | 色碼 | 用途 |
|------|------|------|
| **主色 Primary** | `#4073c2` | 主要按鈕、連結、強調元素 |
| **主色深 Primary Dark** | `#2c5282` | Hover 狀態、標題文字 |
| **主色邊框** | `#2d4a7c` | 按鈕邊框 |
| **青綠色 Teal** | `#14b5af` | 次要強調、重置按鈕、特色元素 |
| **青綠深色** | `#0e9b95` | Teal Hover 狀態 |

### 1.2 功能色

| 名稱 | 色碼 | 用途 |
|------|------|------|
| **成功 Success** | `#28a745` / `#16a34a` | 成功訊息、已完成狀態 |
| **警告 Warning** | `#ffc107` | 警告訊息、待處理狀態 |
| **危險 Danger** | `#dc3545` / `#dc2626` | 錯誤訊息、刪除按鈕 |
| **資訊 Info** | `#17a2b8` / `#2563eb` | 提示訊息、資訊按鈕 |
| **次要 Secondary** | `#6c757d` | 次要按鈕、輔助文字 |

### 1.3 狀態色彩

#### 付款狀態
| 狀態 | 背景色 | 文字色 |
|------|--------|--------|
| 未付款 unpaid | `#fee` | `#c53030` |
| 部分付款 partial | `#fef3c7` | `#d97706` |
| 已付款 paid | `#d1fae5` | `#065f46` |
| 逾期 overdue | `#fee` | `#dc2626` |
| 已退款 refund | `#e0e7ff` | `#4338ca` |
| 爭議 dispute | `#fce7f3` | `#be185d` |
| 已完成 completed | `#c6f6d5` | `#22543d` |
| 已取消 cancelled | `#fed7d7` | `#c53030` |

#### 備貨/庫存狀態
| 狀態 | 背景色 | 文字色 |
|------|--------|--------|
| 待備貨 pending | `#e0e0e0` | `#616161` |
| 已備妥 ready | `#4caf50` | `#ffffff` |
| 缺貨 out_of_stock | `#f44336` | `#ffffff` |
| 有庫存 in_stock | `#2196f3` | `#ffffff` |

### 1.4 中性色

| 名稱 | 色碼 | 用途 |
|------|------|------|
| **主要文字** | `#1e293b` / `#2d3748` | 標題、重要文字 |
| **次要文字** | `#64748b` / `#718096` | 說明文字、標籤 |
| **提示文字** | `#94a3b8` / `#9ca3af` | placeholder、輔助提示 |
| **邊框淺** | `#e2e8f0` | 分隔線、輸入框邊框 |
| **邊框中** | `#cbd5e0` | 卡片邊框 |
| **背景淺** | `#f8f9fa` / `#f7fafc` | 區塊背景 |
| **背景白** | `#ffffff` | 卡片、表單背景 |

### 1.5 漸層色

```css
/* 登入頁背景 */
background: linear-gradient(135deg, #4073c2 0%, #14b5af 100%);

/* 主要按鈕漸層 */
background: linear-gradient(135deg, #4073c2 0%, #2c5282 100%);

/* 警告按鈕漸層 */
background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);

/* 青綠按鈕漸層 */
background: linear-gradient(135deg, #14b5af 0%, #0e9b95 100%);
```

---

## 2. 字體規範

### 2.1 字體家族

```css
/* 主要字體 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* 中文字體（PDF 用） */
font-family: "Microsoft JhengHei", "PingFang TC", "Noto Sans CJK TC", sans-serif;
```

### 2.2 字體大小

| 變數名稱 | 大小 | 用途 |
|----------|------|------|
| `--font-size-title` | 24px | 頁面大標題 |
| `--font-size-card` | 18px | 統計卡片數值 |
| `--font-size-amount` | 16px | 金額顯示（表格內） |
| `--font-size-btn` | 15px | 標準按鈕 |
| `--font-size-base` | 14px | 表格、表單、標籤（最常用） |
| `--font-size-badge` | 13px | 徽章、小標籤 |
| `--font-size-btn-sm` | 12px | 小型按鈕 |
| `--font-size-hint` | 12px | 提示文字、日期 |
| `--font-size-btn-mini` | 11px | 迷你按鈕 |

### 2.3 字體粗細

| 變數名稱 | 數值 | 用途 |
|----------|------|------|
| `--font-weight-normal` | 400 | 正常文字 |
| `--font-weight-medium` | 500 | 標籤、次要標題 |
| `--font-weight-semibold` | 600 | 統計數值、按鈕、重要資訊 |
| `--font-weight-bold` | 700 | 標題、強調 |

### 2.4 行高

```css
line-height: 1.4;  /* PDF 用 */
line-height: 1.5;  /* 一般文字 */
```

---

## 3. 按鈕樣式

### 3.1 基礎按鈕

```css
.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 90px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### 3.2 按鈕類型

| 類別 | 背景色 | 文字色 | 邊框 |
|------|--------|--------|------|
| `.btn-primary` | `#4073c2` | `#ffffff` | `#2d4a7c` |
| `.btn-success` | `#28a745` | `#ffffff` | - |
| `.btn-warning` | 漸層 `#ffc107` → `#e0a800` | `#212529` | `#e0a800` |
| `.btn-danger` | `#dc3545` | `#ffffff` | - |
| `.btn-secondary` | `#6c757d` | `#ffffff` | - |
| `.btn-info` | `#17a2b8` | `#ffffff` | - |
| `.btn-reset` | 漸層 `#14b5af` → `#0e9b95` | `#ffffff` | `#0e9b95` |

### 3.3 按鈕尺寸

| 類別 | Padding | 字體大小 | 最小寬度 |
|------|---------|----------|----------|
| `.btn` (標準) | 10px 18px | 15px | 90px |
| `.btn-sm` | 8px 12px | 12px | auto |
| `.btn-mini` | 4px 8px | 11px | auto (高度 28px) |

### 3.4 按鈕狀態

```css
/* Hover 狀態 */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Active 狀態 */
.btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Disabled 狀態 */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
```

### 3.5 外框按鈕

| 類別 | 邊框色 | 文字色 | Hover 背景 |
|------|--------|--------|------------|
| `.btn-outline-primary` | `#3182ce` | `#4073c2` | `#4073c2` |
| `.btn-outline-secondary` | `#718096` | `#6c757d` | `#6c757d` |
| `.btn-outline-danger` | `#e53e3e` | `#dc3545` | `#dc3545` |

---

## 4. 表單樣式

### 4.1 輸入框基礎樣式

```css
input, select, textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
  color: #333333;
  transition: border-color 0.2s ease;
}

/* Focus 狀態 */
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #4073c2;
  box-shadow: 0 0 0 3px rgba(64, 115, 194, 0.1);
}

/* 錯誤狀態 */
input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### 4.2 表單標籤

```css
.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}
```

### 4.3 表單區塊

```css
.form-section {
  margin: 24px 0;
  padding: 20px;
  background-color: #f9fafb;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
}

.form-section h3 {
  margin-bottom: 16px;
  color: #2c5282;
  font-size: 16px;
  font-weight: 600;
}
```

---

## 5. 間距系統

### 5.1 CSS 變數

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
}
```

### 5.2 圓角

```css
:root {
  --radius-sm: 4px;   /* 按鈕、輸入框 */
  --radius-md: 6px;   /* 卡片 */
  --radius-lg: 8px;   /* 大型卡片、Modal */
  --radius-xl: 12px;  /* 登入表單容器 */
}
```

---

## 6. 元件樣式

### 6.1 狀態徽章

```css
.payment-status, .ready-status, .stock-status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
```

### 6.2 卡片/面板

```css
.panel {
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.panel-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 12px;
  margin-bottom: 16px;
}
```

### 6.3 表格

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-table th {
  background-color: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
  padding: 12px;
  color: #4a5568;
  font-weight: 600;
}

.data-table td {
  border-bottom: 1px solid #e2e8f0;
  padding: 12px;
  color: #2d3748;
}

.data-table tr:hover {
  background-color: #f7fafc;
}
```

---

## 7. 側邊欄樣式

### 7.1 側邊欄容器

```css
.nav-sidebar {
  width: 250px;
  background: #f5fcff;
  color: #2c5282;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e6e6e6;
}
```

### 7.2 導航項目

```css
.nav-item {
  padding: 12px 20px;
  color: #4a5568;
  font-size: 14px;
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: #e8f4f8;
  color: #2c5282;
}

.nav-item.active {
  background: #4a90e2;
  color: #ffffff;
  border-left-color: #2b6cb0;
  font-weight: 600;
}
```

---

## 8. Logo 使用規範

### 8.1 尺寸規格

| 使用場景 | 尺寸 | 說明 |
|----------|------|------|
| 登入頁 Logo | 80px × 60px | 登入表單頂部 |
| 側邊欄 Logo | 24px | 搭配系統名稱 |
| PDF Logo | 60px × 60px | 文件頁首 |
| 原始檔案 | 200px × 200px | 300 DPI，透明背景 |

### 8.2 檔案格式

- **PNG**: 透明背景，適合網頁使用
- **SVG**: 向量格式，可無損縮放
- **建議解析度**: 300 DPI（適合列印）

### 8.3 檔案位置

```
public/assets/images/
├── logo/
│   ├── suiyao-logo.png          # 主 Logo (200×200px)
│   ├── suiyao-logo.svg          # 向量格式
│   └── suiyao-logo-small.png    # 小尺寸 (60×60px)
└── stamps/
    └── company-stamp.png        # 公司印章 (150×150px)
```

---

## 9. 響應式設計

### 9.1 斷點

```css
/* 平板 */
@media (max-width: 768px) {
  .nav-sidebar {
    transform: translateX(-100%);
  }

  body.sidebar-open .nav-sidebar {
    transform: translateX(0);
  }
}

/* 手機 */
@media (max-width: 480px) {
  .login-form-container {
    padding: 28px 20px;
    border-radius: 8px;
  }
}
```

### 9.2 主內容區偏移

```css
body.with-nav-sidebar .main-content {
  margin-left: 250px;  /* 側邊欄寬度 */
}
```

---

## 10. 動畫效果

### 10.1 過渡效果

```css
/* 標準過渡 */
transition: all 0.2s ease;

/* 按鈕 Hover */
transition: all 0.2s ease;
transform: translateY(-1px);

/* 側邊欄展開 */
transition: max-height 0.3s ease;
```

### 10.2 關鍵幀動畫

```css
/* 淡入滑動 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 浮動效果（登入頁裝飾） */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

---

## 11. 暗色模式支援

```css
@media (prefers-color-scheme: dark) {
  body {
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  }

  .login-form-container {
    background: #2d3748;
    color: #e2e8f0;
  }

  .form-input {
    background-color: #4a5568;
    border-color: #4a5568;
    color: #e2e8f0;
  }
}
```

---

## 12. CSS 變數總覽

```css
:root {
  /* 字體大小 */
  --font-size-base: 14px;
  --font-size-btn: 15px;
  --font-size-card: 18px;
  --font-size-hint: 12px;
  --font-size-btn-sm: 12px;
  --font-size-badge: 13px;
  --font-size-btn-mini: 11px;
  --font-size-title: 24px;
  --font-size-amount: 16px;

  /* 字體粗細 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* 顏色 */
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-text-hint: #94a3b8;
  --color-amount: #1f2937;
  --color-success: #16a34a;
  --color-warning: #dc2626;
  --color-info: #2563eb;
  --color-bg-light: #f8f9fa;
  --color-bg-section: #f1f5f9;
  --color-border-light: #e2e8f0;
  --color-border-medium: #cbd5e0;

  /* 間距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;

  /* 圓角 */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}
```

---

## 13. 快速參考

### 常用色碼

| 用途 | 色碼 |
|------|------|
| 主色 | `#4073c2` |
| 青綠色 | `#14b5af` |
| 成功綠 | `#28a745` |
| 危險紅 | `#dc3545` |
| 標題深藍 | `#2c5282` |
| 正文黑 | `#2d3748` |
| 次要灰 | `#718096` |
| 邊框灰 | `#e2e8f0` |
| 背景灰 | `#f7fafc` |

### 常用尺寸

| 用途 | 數值 |
|------|------|
| 側邊欄寬度 | 250px |
| 標準按鈕 padding | 10px 18px |
| 輸入框 padding | 8px 12px |
| 卡片圓角 | 6px |
| 按鈕圓角 | 4px |
| 標準字體 | 14px |
| 按鈕字體 | 15px |

---

*本文件基於穗鈅科技 ERP 系統 v9.0 實際使用的樣式整理而成*
