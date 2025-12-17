# 工單系統前端專案架構

## 專案概述
穗鈅科技工單管理系統前端專案，基於 React + TypeScript + Vite 建置。

## 技術棧
| 項目 | 技術 | 版本 |
|------|------|------|
| 框架 | React | 18.x |
| 語言 | TypeScript | 5.x |
| 建構工具 | Vite | 7.x |
| UI 元件庫 | Ant Design | 5.x |
| 路由 | React Router | 6.x |

## 目錄結構

```
frontend/
├── public/                       # 靜態資源
├── src/
│   ├── assets/                   # 專案素材
│   │   └── images/
│   │       └── logo.png          # 品牌 Logo
│   │
│   ├── components/               # React 組件
│   │   ├── common/               # 共用組件
│   │   │   └── StatusBadge.tsx   # 工單狀態標籤
│   │   └── layout/               # 佈局組件
│   │       ├── AppLayout.tsx     # 主佈局框架
│   │       └── Sidebar.tsx       # 側邊欄導航
│   │
│   ├── pages/                    # 頁面組件
│   │   └── WorkOrders/
│   │       └── index.tsx         # 工單列表頁面
│   │
│   ├── mocks/                    # 假資料
│   │   └── workOrders.ts         # 工單假資料與輔助函式
│   │
│   ├── types/                    # TypeScript 型別定義
│   │   └── index.ts              # 工單、狀態等型別
│   │
│   ├── styles/                   # 樣式檔案
│   │   └── variables.css         # CSS 變數（品牌色、狀態色等）
│   │
│   ├── App.tsx                   # 根組件（Ant Design 主題配置）
│   ├── main.tsx                  # 應用程式入口
│   └── router.tsx                # 路由設定
│
├── index.html                    # HTML 入口
├── vite.config.ts                # Vite 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 套件管理
└── PROJECT_STRUCTURE.md          # 本文件
```

## 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview

# 型別檢查
npx tsc --noEmit
```

## 品牌配色

| 名稱 | HEX | 用途 |
|------|-----|------|
| 品牌藍 | #4073c2 | 主要按鈕、連結 |
| 品牌青 | #14b5af | 次要強調 |

## 工單狀態色

| 狀態 | 中文 | HEX |
|------|------|-----|
| pending | 待處理 | #9ca3af |
| processing | 處理中 | #3b82f6 |
| completed | 已完成 | #16a34a |

## 優先級色

| 優先級 | 中文 | HEX |
|--------|------|-----|
| low | 低 | #6b7280 |
| medium | 中 | #3b82f6 |
| high | 高 | #f59e0b |
| urgent | 緊急 | #ef4444 |

## 檔案說明

### 組件

| 檔案 | 說明 |
|------|------|
| `components/layout/AppLayout.tsx` | 主佈局，包含側邊欄和內容區 |
| `components/layout/Sidebar.tsx` | 側邊欄導航選單 |
| `components/common/StatusBadge.tsx` | 工單狀態標籤組件 |

### 頁面

| 檔案 | 路徑 | 說明 |
|------|------|------|
| `pages/WorkOrders/index.tsx` | `/` | 工單列表，支援搜尋和狀態篩選 |

### 型別定義

```typescript
// types/index.ts

type WorkOrderStatus = 'pending' | 'processing' | 'completed';
type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface WorkOrder {
  id: string;
  orderNumber: string;
  title: string;
  description?: string;
  customerName: string;
  status: WorkOrderStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}
```

## 後續開發建議

- [ ] 工單新增/編輯功能
- [ ] 工單詳情頁面
- [ ] 客戶管理模組
- [ ] 使用者認證（登入/登出）
- [ ] 串接後端 API
