# 前端組件架構規範

> IC 燒錄 MES 系統 - 組件分類與使用指南

## 組件總覽

```
frontend/src/components/
│
├── common/              通用 UI 組件
│   ├── Button.tsx       按鈕
│   ├── Card.tsx         卡片容器
│   ├── Badge.tsx        狀態徽章
│   ├── Tabs.tsx         分頁標籤
│   ├── Modal.tsx        彈窗對話框
│   ├── Drawer.tsx       側滑面板
│   ├── SplitView.tsx    分割視圖
│   └── index.ts         統一導出
│
├── layout/              佈局組件
│   ├── AppLayout.tsx    主框架
│   └── Sidebar.tsx      左側導覽列
│
├── workOrder/           工單相關
├── workflow/            流程控制
├── inventory/           庫存管理
├── consumables/         耗材管理
├── defects/             缺陷管理
├── shipping/            出貨管理
└── finance/             財務管理
```

---

## 一、通用 UI 組件

### Button 按鈕

```tsx
import { Button } from '@/components/common';

// 變體
<Button variant="primary">主要按鈕</Button>
<Button variant="success">成功按鈕</Button>
<Button variant="warning">警告按鈕</Button>
<Button variant="danger">危險按鈕</Button>
<Button variant="secondary">次要按鈕</Button>
<Button variant="outline-primary">外框按鈕</Button>

// 尺寸
<Button size="sm">小型</Button>
<Button size="mini">迷你</Button>
```

### Card 卡片容器

```tsx
import { Card } from '@/components/common';

// 基本用法
<Card>內容</Card>

// 帶標題
<Card title="區塊標題">內容</Card>

// 帶標題和操作按鈕
<Card
  title="區塊標題"
  extra={<Button variant="primary" size="sm">操作</Button>}
>
  內容
</Card>
```

### Badge 狀態徽章

```tsx
import { Badge } from '@/components/common';

// 基本狀態
<Badge variant="pending">待處理</Badge>
<Badge variant="active">進行中</Badge>
<Badge variant="completed">已完成</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="warning">警告</Badge>
<Badge variant="danger">危險</Badge>
<Badge variant="info">資訊</Badge>
```

### Tabs 分頁標籤

```tsx
import { Tabs, TabPanel } from '@/components/common';

const tabs = [
  { key: 'tab1', label: '標籤一' },
  { key: 'tab2', label: '標籤二' },
];

<Tabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />

<TabPanel tabKey="tab1" activeKey={activeKey}>
  標籤一內容
</TabPanel>
<TabPanel tabKey="tab2" activeKey={activeKey}>
  標籤二內容
</TabPanel>
```

---

## 二、互動面板組件

### 選擇指南

| 組件 | 適用場景 | 特點 |
|-----|---------|-----|
| **SplitView** | 新增/編輯資料 | 保持列表可見，可同時參照 |
| **Drawer** | 複雜表單 | 全螢幕覆蓋，專注填寫 |
| **Modal** | 確認對話框 | 簡單操作，快速確認 |

### SplitView 分割視圖（推薦）

**適用於**：新增、編輯、查看詳情（需要同時參照列表）

```tsx
import { SplitView, Card, Button } from '@/components/common';

function MyPage() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <SplitView
      panel={isAdding ? <AddForm /> : undefined}
      panelTitle="新增項目"
      panelWidth="md"  // 'sm' | 'md' | 'lg'
      onClosePanel={() => setIsAdding(false)}
    >
      <Card title="資料列表">
        <table className="data-table w-full">
          {/* 表格內容 */}
        </table>
      </Card>
    </SplitView>
  );
}
```

**Props**:

| 屬性 | 類型 | 說明 |
|-----|------|------|
| `children` | ReactNode | 左側主內容 |
| `panel` | ReactNode | 右側面板內容 |
| `panelTitle` | string | 面板標題 |
| `panelWidth` | 'sm' \| 'md' \| 'lg' | 面板寬度 |
| `onClosePanel` | () => void | 關閉面板回調 |

### Drawer 側滑面板

**適用於**：複雜表單、需要全螢幕專注的操作

```tsx
import { Drawer, Button } from '@/components/common';

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="新增項目"
  width="md"  // 'sm' | 'md' | 'lg'
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        取消
      </Button>
      <Button variant="primary">送出</Button>
    </>
  }
>
  <form className="space-y-4">
    {/* 表單內容 */}
  </form>
</Drawer>
```

### Modal 彈窗

**適用於**：確認對話框、簡單輸入

```tsx
import { Modal, Button } from '@/components/common';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="確認刪除"
  size="md"  // 'sm' | 'md' | 'lg' | 'xl'
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        取消
      </Button>
      <Button variant="danger">確認刪除</Button>
    </>
  }
>
  <p>確定要刪除此項目嗎？此操作無法復原。</p>
</Modal>
```

---

## 三、佈局組件

### AppLayout 主框架

整個應用的佈局框架，包含側邊欄和主內容區。

```tsx
// router.tsx
import { AppLayout } from '@/components/layout/AppLayout';

const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
      // ...
    ]
  }
];
```

### Sidebar 左側導覽列

導覽項目定義於 `constants/navigation.ts`：

```tsx
export const SIDEBAR_NAVIGATION = [
  {
    key: 'dashboard',
    label: '儀表板',
    path: '/dashboard',
  },
  {
    key: 'orders',
    label: '訂單管理',
    children: [
      { key: 'order-list', label: '訂單列表', path: '/orders' },
      { key: 'order-flow', label: '訂單流程', path: '/order-flow' },
    ],
  },
  // ...
];
```

---

## 四、業務組件

### workOrder 工單相關

| 組件 | 用途 |
|-----|------|
| `WorkOrderCard` | 委工單配置（內部/外包選擇）|
| `WorkOrderPreview` | 委工單預覽與列印 |

### workflow 流程控制

| 組件 | 用途 |
|-----|------|
| `WorkflowProgress` | 流程進度顯示（9個階段）|
| `WorkflowSidebar` | 流程側邊欄 |
| `StageContent` | 階段內容渲染 |
| `FirstArticleApprovalForm` | 首見承認書表單 |

### inventory 庫存管理

| 組件 | 用途 |
|-----|------|
| `InventoryReconciliationCard` | 進出料勾稽管控 |

### consumables 耗材管理

| 組件 | 用途 |
|-----|------|
| `ConsumablesCheckCard` | 料帶/燒錄座檢查 |

### defects 缺陷管理

| 組件 | 用途 |
|-----|------|
| `AddNGModal` | NG 不良品紀錄表單 |

### shipping 出貨管理

| 組件 | 用途 |
|-----|------|
| `LabelPreview` | 出貨標籤預覽與列印 |

### finance 財務管理

| 組件 | 用途 |
|-----|------|
| `FinanceCard` | 發票/收款管理 |

---

## 五、使用規範

### 新增/編輯操作

1. **優先使用 SplitView**：可同時參照列表資料
2. **複雜表單使用 Drawer**：需要全螢幕專注填寫
3. **確認操作使用 Modal**：刪除、停用等危險操作

### 引入方式

```tsx
// 通用組件統一從 common 引入
import { Button, Card, Badge, SplitView } from '@/components/common';

// 佈局組件從 layout 引入
import { AppLayout, Sidebar } from '@/components/layout';

// 業務組件從對應資料夾引入
import { WorkOrderCard } from '@/components/workOrder/WorkOrderCard';
```

### 樣式規範

- 表單輸入框：`className="form-input"`
- 表單標籤：`className="form-label"`
- 資料表格：`className="data-table w-full"`
- 頁面標題區：`className="page-header"`

---

## 版本紀錄

| 版本 | 日期 | 說明 |
|-----|------|------|
| 1.0 | 2024-12-30 | 初版建立 |
