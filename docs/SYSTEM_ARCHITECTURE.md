# OrderManagement-2025 系統架構文件

> 本文件記錄系統完整架構，供日後開發簡化版工單系統參考
> 簡化版建議使用 **React + Vite + TypeScript** 現代前端架構

---

## 1. 技術棧總覽

### 1.1 目前系統

| 類別 | 技術 | 說明 |
|------|------|------|
| **後端** | Node.js + Express + TypeScript | RESTful API 伺服器 |
| **資料庫** | MongoDB + Mongoose | 文件型資料庫 + ODM |
| **前端** | 原生 TypeScript + HTML/CSS | 無框架，編譯至 JS |
| **即時通訊** | Socket.io | 條碼掃描器連線 |
| **認證** | JWT (JSON Web Token) | 無狀態身份驗證 |
| **檔案處理** | Multer + Sharp | 圖片上傳與壓縮 |
| **PDF/Excel** | Puppeteer + ExcelJS | 報表匯出 |
| **日誌** | Winston + Daily Rotate | 分級日誌輪替 |

### 1.2 簡化版建議技術棧

| 類別 | 技術 | 說明 |
|------|------|------|
| **後端** | Node.js + Express + TypeScript | 維持不變 |
| **資料庫** | MongoDB + Mongoose | 維持不變 |
| **前端** | React + Vite + TypeScript | 現代化框架 |
| **UI 元件庫** | Ant Design / MUI / shadcn/ui | 加速 UI 開發 |
| **狀態管理** | Zustand / React Query | 輕量、簡單 |
| **路由** | React Router | SPA 路由 |
| **HTTP 客戶端** | Axios / fetch | API 呼叫 |
| **認證** | JWT | 維持不變 |

---

## 2. 專案目錄結構

### 2.1 目前結構

```
OrderManagement-2025/
├── server.ts              # 應用程式入口
├── models/                # Mongoose 資料模型 (11個)
├── src/
│   ├── controllers/       # 請求處理器 (11個)
│   ├── services/          # 業務邏輯層 (25個)
│   ├── routes/            # API 路由定義 (15個)
│   ├── middleware/        # 中間件 (認證/錯誤處理)
│   ├── frontend/          # 前端 TypeScript 組件
│   │   └── components/    # UI 組件 (42個)
│   ├── utils/             # 工具函數
│   └── types/             # TypeScript 型別定義
├── public/                # 靜態檔案
│   ├── index.html         # 主頁面 (SPA)
│   ├── login.html         # 登入頁
│   └── js/compiled/       # 編譯後的前端 JS
├── config/                # 設定檔
├── scripts/               # 工具腳本
└── docs/                  # 文件
```

### 2.2 簡化版建議結構（前後端分離）

```
work-order-system/
├── backend/                    # 後端專案
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── utils/
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # 前端專案（Vite + React）
    ├── src/
    │   ├── components/         # React 組件
    │   │   ├── common/         # 共用組件
    │   │   ├── layout/         # 佈局組件
    │   │   └── features/       # 功能組件
    │   ├── pages/              # 頁面組件
    │   ├── hooks/              # 自定義 Hooks
    │   ├── services/           # API 呼叫封裝
    │   ├── stores/             # 狀態管理
    │   ├── types/              # TypeScript 型別
    │   ├── utils/              # 工具函數
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

---

## 3. 資料模型 (Models)

### 3.1 核心業務模型

#### Order（訂單）
```typescript
{
  tenantId: string,           // 租戶識別（統編）
  orderNumber: string,        // 訂單編號 (ORD25XXXXX)
  type: 'purchase' | 'sales', // 採購單/銷售單
  customer: ObjectId,         // 關聯客戶
  items: [{                   // 訂單明細
    product: { code, name },
    quantity: number,
    unitPrice: number
  }],
  totalAmount: number,
  status: 'pending' | 'processing' | 'completed' | 'cancelled',
  paymentStatus: 'unpaid' | 'partial' | 'paid',
  statistics: {               // 即時統計
    totalQuantity, paidAmount, unpaidAmount
  },
  createdAt, updatedAt
}
```

#### Product（產品）
```typescript
{
  tenantId: string,
  productCode: string,        // 產品編號（唯一）
  barcode?: string,           // 條碼
  name: string,
  price: number,
  stock: number,
  category?: string,
  brand?: string,
  specifications?: string,
  images?: [{ data, name, type }],
  active: boolean
}
```

#### Customer（客戶/供應商）
```typescript
{
  customerCode: string,       // CUS0001 或 SUP0001
  name: string,
  type: 'customer' | 'supplier' | 'both',
  contact?: string,
  phone?: string,
  email?: string,
  address?: string,
  taxId?: string,             // 統一編號
  payment: {
    method: 'cash' | 'credit' | 'monthly',
    settlementDay?: number    // 月結日
  },
  bankInfo?: { bankName, accountNumber },
  active: boolean
}
```

#### Transaction（交易紀錄）
```typescript
{
  tenantId: string,
  transactionNumber: string,  // TR-xxxxx
  type: 'order_receivable' | 'order_payable' | 'expense' | ...,
  amount: Decimal128,
  direction: 'in' | 'out',
  date: Date,
  parties: { from, to },      // 交易雙方
  relatedTo?: { type: 'order', refId, refNumber },
  account: { id, name },      // 關聯帳戶
  status: 'pending' | 'approved' | 'cancelled'
}
```

#### Account（帳戶）
```typescript
{
  tenantId: string,
  name: string,
  accountNumber?: string,
  accountType: 'bank' | 'cash' | 'other',
  initialBalance: number,
  currentBalance: number,
  isDefault: boolean,
  enabled: boolean
}
```

### 3.2 系統管理模型

#### Tenant（租戶）
```typescript
{
  taxId: string,              // 統一編號（主鍵）
  companyName: string,
  contactName: string,
  contactEmail: string,
  status: 'active' | 'inactive' | 'suspended',
  plan: 'basic' | 'pro' | 'enterprise',
  features: {
    maxUsers: number,
    maxOrders: number,
    maxProducts: number
  },
  sessionSettings: {
    maxConcurrentSessions: number,
    autoKickOldSessions: boolean
  },
  databaseName: string        // tenant_{taxId}
}
```

#### User（使用者）
```typescript
{
  email: string,
  password: string,           // bcrypt 加密
  name: string,
  role: 'admin' | 'user' | 'viewer',
  tenantId: string,           // 所屬租戶
  isActive: boolean,
  lastLoginAt?: Date
}
```

#### ActiveSession（登入會話）
```typescript
{
  userId: string,
  tenantId: string,
  sessionId: string,          // UUID
  ipAddress: string,
  userAgent: string,
  deviceInfo?: string,
  loginTime: Date,
  lastActivity: Date,
  status: 'active' | 'kicked' | 'expired'
}
```

### 3.3 輔助模型

#### ProductTracking（產品追蹤）
```typescript
{
  productCode: string,
  orderId: ObjectId,
  orderNumber: string,
  action: 'order_created' | 'order_completed' | 'stock_in' | 'stock_out',
  quantity: number,
  actionDate: Date
}
```

#### CustomerTemplate（標籤模板）
```typescript
{
  customerId: ObjectId,
  templateName: string,
  config: {
    fields: Map<string, { enabled, barcode, label }>
  },
  isDefault: boolean
}
```

---

## 4. API 端點總覽

### 4.1 認證模組 `/api/auth`

| 方法 | 端點 | 說明 |
|------|------|------|
| POST | /login | 登入 |
| POST | /logout | 登出 |
| GET | /me | 取得當前使用者 |
| POST | /register-tenant | 註冊新租戶 |
| POST | /verify-token | 驗證 Token |
| POST | /refresh-token | 更新 Token |
| GET | /sessions | 取得所有登入會話 |
| DELETE | /sessions/:id | 踢出指定會話 |

### 4.2 訂單模組 `/api/orders`

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | / | 取得訂單列表（支援分頁/篩選）|
| POST | / | 建立訂單 |
| GET | /:id | 取得單一訂單 |
| PUT | /:id | 更新訂單 |
| DELETE | /:id | 刪除訂單（需 admin）|
| GET | /statistics | 訂單統計 |
| GET | /history | 歷史訂單查詢 |
| GET | /barcode/:barcode | 條碼查詢訂單 |
| PUT | /:id/payment | 更新付款狀態 |
| POST | /:id/complete | 快速完成訂單 |
| GET | /:id/pdf | 生成 PDF |
| POST | /batch/update-status | 批量更新狀態 |
| POST | /batch/delete | 批量刪除 |
| POST | /batch/export | 批量匯出 |

### 4.3 產品模組 `/api/products`

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | / | 取得產品列表 |
| POST | / | 建立/更新產品 |
| GET | /barcode/:barcode | 條碼查詢 |
| GET | /code/:productCode | 編號查詢 |
| DELETE | /:id | 刪除產品 |
| POST | /:id/images | 上傳產品圖片 |
| DELETE | /:id/images/:index | 刪除圖片 |

### 4.4 客戶模組 `/api/customers`

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | / | 取得客戶列表 |
| POST | / | 建立客戶 |
| GET | /:id | 取得單一客戶 |
| PUT | /:id | 更新客戶 |
| DELETE | /:id | 刪除客戶 |
| GET | /type/:type | 依類型篩選 |
| GET | /statistics | 客戶統計 |

### 4.5 交易模組 `/api/transactions`

| 方法 | 端點 | 說明 |
|------|------|------|
| POST | /order-payment | 訂單收款/付款 |
| POST | /quick-payment | 快速標記付款 |
| POST | /expense | 記錄支出 |
| POST | /income | 記錄收入 |
| POST | /transfer | 帳戶間轉帳 |
| GET | / | 交易紀錄列表 |
| GET | /summary | 交易摘要 |
| DELETE | /:id | 刪除交易 |

### 4.6 帳戶模組 `/api/accounts`

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | / | 取得帳戶列表 |
| POST | / | 建立帳戶 |
| PUT | /:id | 更新帳戶 |
| DELETE | /:id | 刪除帳戶 |
| GET | /default | 取得預設帳戶 |

### 4.7 使用者模組 `/api/users`

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | / | 取得使用者列表 |
| POST | / | 建立使用者 |
| PUT | /:id | 更新使用者 |
| DELETE | /:id | 刪除使用者 |
| POST | /:id/reset-password | 重設密碼 |

### 4.8 其他模組

| 模組 | 端點 | 說明 |
|------|------|------|
| 對帳單 | /api/statements/:partyId/pdf | 生成對帳單 PDF |
| 備份 | /api/backup/* | 資料庫備份管理 |
| 圖片 | /api/images/* | 圖片上傳/刪除 |
| 租戶 | /api/tenant/* | 租戶管理 |

---

## 5. 中間件 (Middleware)

| 中間件 | 檔案 | 功能 |
|------|------|------|
| **authenticate** | `auth.ts` | JWT 驗證 |
| **authorize** | `auth.ts` | 角色權限檢查 |
| **requireTenant** | `requireTenant.ts` | 租戶驗證（從 Token 取得） |
| **tenantDatabase** | `database.ts` | 切換租戶資料庫連線 |
| **errorHandler** | `errorHandler.ts` | 統一錯誤處理 |
| **upload** | `upload.ts` | 檔案上傳（Multer）|

### 認證流程

```
請求 → authenticate（驗證 JWT）
    → requireTenant（取得 tenantId）
    → tenantDatabase（切換 DB）
    → Controller → Service → Model
```

---

## 6. 多租戶架構

### 6.1 資料庫隔離

```
MongoDB
├── order_management        # 共用資料庫
│   └── tenants            # 租戶主檔
├── tenant_00091103        # 租戶 A 的獨立資料庫
│   ├── orders
│   ├── products
│   ├── customers
│   └── ...
└── tenant_12345678        # 租戶 B 的獨立資料庫
    └── ...
```

### 6.2 租戶識別

1. 登入時驗證租戶狀態
2. JWT Token 包含 `tenantId`
3. 每個請求透過 `requireTenant` 中間件取得 `tenantId`
4. `tenantDatabase` 中間件動態切換資料庫連線

---

## 7. 服務層 (Services)

### 7.1 核心服務

| 服務 | 檔案 | 職責 |
|------|------|------|
| **OrderService** | `orderService.ts` | 訂單業務邏輯 |
| **ProductService** | `productService.ts` | 產品業務邏輯 |
| **CustomerService** | `customerService.ts` | 客戶業務邏輯 |
| **TransactionService** | `TransactionService.ts` | 交易記錄處理 |
| **AuthService** | `authService.ts` | 認證/註冊邏輯 |
| **SessionService** | `sessionService.ts` | 會話管理 |

### 7.2 輔助服務

| 服務 | 檔案 | 職責 |
|------|------|------|
| **PDFService** | `pdfService.ts` | PDF 生成（Puppeteer）|
| **ExcelService** | `excelService.ts` | Excel 匯出（ExcelJS）|
| **ImageService** | `imageService.ts` | 圖片處理（Sharp）|
| **EmailService** | `emailService.ts` | 郵件發送（Nodemailer）|
| **BackupService** | `backupService.ts` | 資料庫備份 |
| **BarcodeService** | `barcodeService.ts` | 條碼生成 |

---

## 8. 簡化版工單系統建議（React + Vite）

### 8.1 可移除的功能

| 功能 | 原因 |
|------|------|
| 多租戶架構 | 單一公司使用不需要 |
| 產品庫存管理 | 工單不需追蹤庫存 |
| 財務模組（帳戶/交易）| 簡化版不需財務功能 |
| 條碼掃描（Socket.io）| 工單可能不需要 |
| 客戶標籤模板 | 出貨標籤專用 |

### 8.2 建議保留的核心

**後端（維持 Express + TypeScript）：**
```
backend/
├── src/
│   ├── models/
│   │   ├── WorkOrder.ts
│   │   ├── Customer.ts
│   │   └── User.ts
│   ├── controllers/
│   │   ├── workOrderController.ts
│   │   ├── customerController.ts
│   │   └── userController.ts
│   ├── services/
│   ├── routes/
│   └── middleware/
│       ├── auth.ts
│       └── errorHandler.ts
└── server.ts
```

**前端（React + Vite + TypeScript）：**
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Table.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   └── features/
│   │       ├── work-orders/
│   │       │   ├── WorkOrderList.tsx
│   │       │   ├── WorkOrderForm.tsx
│   │       │   └── WorkOrderDetail.tsx
│   │       ├── customers/
│   │       │   ├── CustomerList.tsx
│   │       │   └── CustomerForm.tsx
│   │       └── auth/
│   │           └── LoginForm.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── WorkOrders.tsx
│   │   ├── Customers.tsx
│   │   └── Login.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useWorkOrders.ts
│   │   └── useCustomers.ts
│   ├── services/
│   │   ├── api.ts              # Axios 設定
│   │   ├── authService.ts
│   │   ├── workOrderService.ts
│   │   └── customerService.ts
│   ├── stores/
│   │   └── authStore.ts        # Zustand
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### 8.3 簡化後的資料模型

```typescript
// WorkOrder（工單）
{
  orderNumber: string,
  customer: ObjectId,
  title: string,
  description: string,
  items: [{
    name: string,
    quantity: number,
    unitPrice: number
  }],
  totalAmount: number,
  status: 'pending' | 'processing' | 'completed',
  priority: 'low' | 'medium' | 'high',
  assignee?: ObjectId,        // 負責人
  dueDate?: Date,
  notes?: string,
  createdBy: ObjectId,
  createdAt: Date
}
```

### 8.4 簡化後的 API

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/work-orders
POST   /api/work-orders
GET    /api/work-orders/:id
PUT    /api/work-orders/:id
DELETE /api/work-orders/:id

GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id

GET    /api/users
POST   /api/users
PUT    /api/users/:id
```

### 8.5 React 前端範例程式碼

**API 服務封裝 (`services/api.ts`)：**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// 自動帶入 Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**工單服務 (`services/workOrderService.ts`)：**
```typescript
import api from './api';

export const workOrderService = {
  getAll: () => api.get('/work-orders'),
  getById: (id: string) => api.get(`/work-orders/${id}`),
  create: (data: CreateWorkOrderDto) => api.post('/work-orders', data),
  update: (id: string, data: UpdateWorkOrderDto) => api.put(`/work-orders/${id}`, data),
  delete: (id: string) => api.delete(`/work-orders/${id}`)
};
```

**自定義 Hook (`hooks/useWorkOrders.ts`)：**
```typescript
import { useState, useEffect } from 'react';
import { workOrderService } from '../services/workOrderService';

export function useWorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkOrders = async () => {
    try {
      setLoading(true);
      const { data } = await workOrderService.getAll();
      setWorkOrders(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  return { workOrders, loading, error, refetch: fetchWorkOrders };
}
```

**工單列表組件 (`components/features/work-orders/WorkOrderList.tsx`)：**
```tsx
import { useWorkOrders } from '../../../hooks/useWorkOrders';

export function WorkOrderList() {
  const { workOrders, loading, error } = useWorkOrders();

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error.message}</div>;

  return (
    <div className="work-order-list">
      <h1>工單列表</h1>
      <table>
        <thead>
          <tr>
            <th>工單編號</th>
            <th>標題</th>
            <th>客戶</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map(order => (
            <tr key={order._id}>
              <td>{order.orderNumber}</td>
              <td>{order.title}</td>
              <td>{order.customer?.name}</td>
              <td>{order.status}</td>
              <td>
                <button>編輯</button>
                <button>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 8.6 Vite 專案初始化指令

```bash
# 建立前端專案
npm create vite@latest frontend -- --template react-ts
cd frontend

# 安裝依賴
npm install react-router-dom axios zustand
npm install -D @types/node

# 可選：UI 元件庫（擇一）
npm install antd                    # Ant Design
npm install @mui/material @emotion/react @emotion/styled  # MUI
npm install @radix-ui/themes        # Radix UI
```

### 8.7 Vite 設定 (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // 後端位址
        changeOrigin: true
      }
    }
  }
});
```

---

## 9. 開發注意事項

### 9.1 環境變數

**後端 (.env)：**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

**前端 (.env)：**
```env
VITE_API_URL=http://localhost:3000/api
```

### 9.2 啟動指令

**目前系統：**
```bash
npm run build          # 編譯 TypeScript
npm run start          # 啟動伺服器
npm run dev            # 開發模式
```

**簡化版（前後端分離）：**
```bash
# 後端
cd backend
npm run dev            # 啟動 Express（port 3000）

# 前端
cd frontend
npm run dev            # 啟動 Vite（port 5173）
```

### 9.3 專案規模參考

| 指標 | 目前系統 | 簡化版建議 |
|------|----------|-----------|
| TypeScript 檔案 | 177 個 | ~40 個 |
| 程式碼行數 | ~63,000 行 | ~10,000 行 |
| API 端點 | 113 個 | ~15 個 |
| 資料模型 | 11 個 | 3 個 |
| 前端框架 | 無 | React |
| 建構工具 | tsc | Vite |

---

## 10. 現代前端 vs 目前前端比較

| 項目 | 目前（無框架）| 簡化版（React + Vite）|
|------|--------------|---------------------|
| **開發速度** | 慢（手寫 DOM 操作）| 快（組件化開發）|
| **熱更新** | 手動重整 | 自動（HMR）|
| **狀態管理** | 手動維護 | Zustand/Context |
| **程式碼複用** | 困難 | 容易（組件）|
| **UI 一致性** | 手工維護 | UI 元件庫 |
| **打包大小** | 無打包 | 優化過的 bundle |
| **學習曲線** | 低 | 中（需學 React）|
| **社群資源** | 少 | 豐富 |
| **維護成本** | 高 | 低 |

---

*文件產生日期：2025-12-10*
