# 穗鈅科技 品牌色彩規範

> 本文件整理自 OrderManagement-2025 現有設計 + 新系統建議規範

---

## 1. 主要品牌色（Primary Brand Colors）

### 1.1 現有系統使用的主色

| 名稱 | HEX | RGB | 用途 |
|------|-----|-----|------|
| **品牌藍** | `#4073c2` | rgb(64, 115, 194) | 主要按鈕、連結、強調 |
| **品牌青** | `#14b5af` | rgb(20, 181, 175) | 漸層搭配、次要強調 |
| **深藍** | `#2c5282` | rgb(44, 82, 130) | 標題、重要文字 |

### 1.2 漸層組合

```css
/* 登入頁背景漸層 */
background: linear-gradient(135deg, #4073c2 0%, #14b5af 100%);

/* 按鈕漸層 */
background: linear-gradient(135deg, #4073c2 0%, #2c5282 100%);
```

---

## 2. 功能性顏色（Functional Colors）

### 2.1 狀態顏色

| 狀態 | HEX | RGB | 使用場景 |
|------|-----|-----|----------|
| **成功/綠色** | `#16a34a` | rgb(22, 163, 74) | 成功訊息、已完成 |
| **成功淺色** | `#38a169` | rgb(56, 161, 105) | 成功按鈕 |
| **成功背景** | `#f0fff4` | rgb(240, 255, 244) | 成功提示背景 |
| **警告/紅色** | `#dc2626` | rgb(220, 38, 38) | 錯誤訊息、未付款 |
| **警告淺色** | `#ff4444` | rgb(255, 68, 68) | 緊急提示 |
| **警告背景** | `#fef2f2` | rgb(254, 242, 242) | 錯誤提示背景 |
| **資訊/藍色** | `#2563eb` | rgb(37, 99, 235) | 資訊提示 |
| **資訊淺色** | `#4299e1` | rgb(66, 153, 225) | 連結、可點擊元素 |
| **資訊背景** | `#ebf8ff` | rgb(235, 248, 255) | 資訊提示背景 |
| **警示/橘色** | `#ff9800` | rgb(255, 152, 0) | 待處理、注意事項 |

### 2.2 訂單狀態對應色

| 狀態 | 顏色 | HEX |
|------|------|-----|
| 待處理 (pending) | 灰色 | `#a0aec0` |
| 處理中 (processing) | 藍色 | `#3182ce` |
| 已完成 (completed) | 綠色 | `#38a169` |
| 已取消 (cancelled) | 紅色 | `#e53e3e` |

### 2.3 付款狀態對應色

| 狀態 | 顏色 | HEX |
|------|------|-----|
| 未付款 (unpaid) | 紅色 | `#dc2626` |
| 部分付款 (partial) | 橘色 | `#ff9800` |
| 已付款 (paid) | 綠色 | `#16a34a` |

---

## 3. 中性色（Neutral Colors）

### 3.1 文字顏色

| 名稱 | HEX | RGB | 用途 |
|------|-----|-----|------|
| **主要文字** | `#1e293b` | rgb(30, 41, 59) | 標題、重要內容 |
| **次要文字** | `#64748b` | rgb(100, 116, 139) | 說明文字 |
| **提示文字** | `#94a3b8` | rgb(148, 163, 184) | placeholder、備註 |
| **禁用文字** | `#9ca3af` | rgb(156, 163, 175) | 禁用狀態 |

### 3.2 背景顏色

| 名稱 | HEX | RGB | 用途 |
|------|-----|-----|------|
| **白色背景** | `#ffffff` | rgb(255, 255, 255) | 卡片、表單 |
| **淺灰背景** | `#f8f9fa` | rgb(248, 249, 250) | 頁面背景 |
| **區塊背景** | `#f1f5f9` | rgb(241, 245, 249) | 區塊底色 |
| **表格斑馬紋** | `#f7fafc` | rgb(247, 250, 252) | 表格奇數列 |

### 3.3 邊框顏色

| 名稱 | HEX | RGB | 用途 |
|------|-----|-----|------|
| **淺邊框** | `#e2e8f0` | rgb(226, 232, 240) | 一般邊框 |
| **中等邊框** | `#cbd5e0` | rgb(203, 213, 224) | 強調邊框 |
| **輸入框邊框** | `#d1d5db` | rgb(209, 213, 219) | 表單輸入框 |
| **聚焦邊框** | `#4073c2` | rgb(64, 115, 194) | 輸入框聚焦 |

---

## 4. CSS 變數定義

```css
:root {
  /* 品牌色 */
  --brand-primary: #4073c2;
  --brand-secondary: #14b5af;
  --brand-dark: #2c5282;

  /* 狀態色 */
  --color-success: #16a34a;
  --color-success-light: #38a169;
  --color-success-bg: #f0fff4;

  --color-danger: #dc2626;
  --color-danger-light: #ff4444;
  --color-danger-bg: #fef2f2;

  --color-info: #2563eb;
  --color-info-light: #4299e1;
  --color-info-bg: #ebf8ff;

  --color-warning: #ff9800;
  --color-warning-bg: #fff3e0;

  /* 文字色 */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-hint: #94a3b8;
  --text-disabled: #9ca3af;

  /* 背景色 */
  --bg-white: #ffffff;
  --bg-light: #f8f9fa;
  --bg-section: #f1f5f9;
  --bg-stripe: #f7fafc;

  /* 邊框色 */
  --border-light: #e2e8f0;
  --border-medium: #cbd5e0;
  --border-input: #d1d5db;
  --border-focus: #4073c2;
}
```

---

## 5. 色彩搭配建議（新系統）

### 5.1 推薦的按鈕顏色組合

```css
/* 主要按鈕 */
.btn-primary {
  background: #4073c2;
  color: #ffffff;
}
.btn-primary:hover {
  background: #2c5282;
}

/* 成功按鈕 */
.btn-success {
  background: #16a34a;
  color: #ffffff;
}

/* 危險按鈕 */
.btn-danger {
  background: #dc2626;
  color: #ffffff;
}

/* 次要按鈕（邊框樣式）*/
.btn-outline {
  background: transparent;
  border: 1px solid #4073c2;
  color: #4073c2;
}
```

### 5.2 卡片/表格配色

```css
/* 卡片 */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

/* 表格標頭 */
.table-header {
  background: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
  color: #4a5568;
}

/* 表格列 hover */
.table-row:hover {
  background: #f1f5f9;
}
```

---

## 6. 色彩無障礙指南

### 6.1 對比度要求

| 用途 | 最低對比度 | 建議 |
|------|-----------|------|
| 正常文字 | 4.5:1 | `#1e293b` on `#ffffff` = 12.6:1 ✓ |
| 大文字/標題 | 3:1 | `#4073c2` on `#ffffff` = 4.8:1 ✓ |
| 圖示/邊框 | 3:1 | `#64748b` on `#ffffff` = 5.9:1 ✓ |

### 6.2 避免的組合

- 不要用 `#94a3b8`（提示文字色）作為重要文字
- 紅綠色不要同時出現作為唯一區分方式（色盲考量）

---

*文件產生日期：2025-12-10*
*來源：OrderManagement-2025 系統樣式分析*
