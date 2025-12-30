import type { OrderData, HistoryRecord } from '@/types';

// 歷史紀錄模擬資料
export const mockHistoryRecords: HistoryRecord[] = [
  {
    id: 'H001',
    date: '2024-01-15',
    totalQty: 5000,
    okQty: 4990,
    ngQty: 10,
    ngDetails: [
      { reason: 'BURN_FAIL', qty: 5, note: '' },
      { reason: 'PIN_DAMAGE', qty: 5, note: '' },
    ],
    operator: '王小明',
  },
  {
    id: 'H002',
    date: '2024-03-20',
    totalQty: 8000,
    okQty: 7985,
    ngQty: 15,
    ngDetails: [
      { reason: 'CHECKSUM_ERR', qty: 8, note: '' },
      { reason: 'TIMEOUT', qty: 7, note: '' },
    ],
    operator: '李小華',
  },
  {
    id: 'H003',
    date: '2024-06-10',
    totalQty: 3000,
    okQty: 2997,
    ngQty: 3,
    ngDetails: [
      { reason: 'EMPTY_BURN', qty: 3, note: '' },
    ],
    operator: '王小明',
  },
];

// 初始訂單資料（用於新建訂單）
export const initialOrderData: OrderData = {
  orderId: '',
  customerId: '',
  hasExistingData: null,
  currentStage: 1,
  icInfo: {
    partNumber: '',
    checkSum: '',
    history: [],
  },
  workOrders: {
    processing: {
      type: '加工單',
      source: null,
      status: 'pending',
    },
    programming: {
      type: '燒錄單',
      source: null,
      status: 'pending',
    },
  },
  inventory: {
    selectedInventoryId: null,
    incomingQty: 0,
    okQty: 0,
    ngQty: 0,
    ngDetails: [],
    isReconciled: false,
  },
  consumables: {
    selectedTape: null,
    selectedSocket: null,
    tapeRequired: 0,
    isChecked: false,
  },
  shipping: {
    quantity: 0,
    batchNo: '',
    labelPrinted: false,
  },
  finance: {
    unitPrice: 0,
    totalAmount: 0,
    paymentStatus: 'pending',
    invoiceNo: null,
    invoiceDate: null,
    invoiceAmount: null,
    taxAmount: null,
    invoiceRemark: null,
    dueDate: null,
    paidDate: null,
  },
  firstArticleApproval: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// 訂單模擬資料（各階段範例）
export const mockOrders: OrderData[] = [
  // 階段 1：確認客戶資料
  {
    ...initialOrderData,
    orderId: 'ORD-2024-001',
    customerId: 'CUST-001',
    currentStage: 1,
    icInfo: {
      partNumber: 'AT24C256-10PU',
      checkSum: '',
      history: [],
    },
    createdAt: '2024-12-15T09:00:00Z',
    updatedAt: '2024-12-15T09:00:00Z',
  },
  // 階段 2：耗材檢查中
  {
    ...initialOrderData,
    orderId: 'ORD-2024-002',
    customerId: 'CUST-002',
    hasExistingData: true,
    currentStage: 2,
    icInfo: {
      partNumber: 'PIC16F877A-I/P',
      checkSum: '0xA5B7C3D2',
      history: mockHistoryRecords,
    },
    consumables: {
      selectedTape: 'CT-001',
      selectedSocket: 'SK-002',
      tapeRequired: 5,
      isChecked: false,
    },
    createdAt: '2024-12-14T10:30:00Z',
    updatedAt: '2024-12-16T14:20:00Z',
  },
  // 階段 5：執行作業中
  {
    ...initialOrderData,
    orderId: 'ORD-2024-003',
    customerId: 'CUST-003',
    hasExistingData: true,
    currentStage: 5,
    icInfo: {
      partNumber: 'STM32F103C8T6',
      checkSum: '0xF2E8D4C1',
      history: mockHistoryRecords.slice(0, 2),
    },
    workOrders: {
      processing: {
        type: '加工單',
        source: 'internal',
        status: 'active',
      },
      programming: {
        type: '燒錄單',
        source: 'internal',
        status: 'active',
      },
    },
    inventory: {
      selectedInventoryId: 'IC-001',
      incomingQty: 10000,
      okQty: 6500,
      ngQty: 120,
      ngDetails: [
        { reason: 'BURN_FAIL', qty: 50, note: '電壓不穩定' },
        { reason: 'CHECKSUM_ERR', qty: 45, note: '' },
        { reason: 'PIN_DAMAGE', qty: 25, note: '來料問題' },
      ],
      isReconciled: false,
    },
    consumables: {
      selectedTape: 'CT-002',
      selectedSocket: 'SK-001',
      tapeRequired: 8,
      isChecked: true,
    },
    finance: {
      ...initialOrderData.finance,
      unitPrice: 2.5,
      totalAmount: 25000,
    },
    createdAt: '2024-12-10T08:00:00Z',
    updatedAt: '2024-12-17T16:45:00Z',
  },
  // 階段 6：出貨作業
  {
    ...initialOrderData,
    orderId: 'ORD-2024-004',
    customerId: 'CUST-001',
    hasExistingData: true,
    currentStage: 6,
    icInfo: {
      partNumber: 'W25Q128JVSIQ',
      checkSum: '0x3B9AC6F5',
      history: mockHistoryRecords,
    },
    workOrders: {
      processing: {
        type: '加工單',
        source: 'external',
        status: 'completed',
      },
      programming: {
        type: '燒錄單',
        source: 'internal',
        status: 'completed',
      },
    },
    inventory: {
      selectedInventoryId: 'IC-002',
      incomingQty: 5000,
      okQty: 4950,
      ngQty: 50,
      ngDetails: [
        { reason: 'BURN_FAIL', qty: 30, note: '' },
        { reason: 'TIMEOUT', qty: 20, note: '' },
      ],
      isReconciled: true,
    },
    consumables: {
      selectedTape: 'CT-001',
      selectedSocket: 'SK-004',
      tapeRequired: 5,
      isChecked: true,
    },
    finance: {
      ...initialOrderData.finance,
      unitPrice: 3.0,
      totalAmount: 14850,
    },
    createdAt: '2024-12-08T11:00:00Z',
    updatedAt: '2024-12-17T09:30:00Z',
  },
  // 階段 7：已完成待請款
  {
    ...initialOrderData,
    orderId: 'ORD-2024-005',
    customerId: 'CUST-004',
    hasExistingData: true,
    currentStage: 7,
    icInfo: {
      partNumber: 'ATMEGA328P-PU',
      checkSum: '0x7D4E2A9B',
      history: mockHistoryRecords.slice(0, 1),
    },
    workOrders: {
      processing: {
        type: '加工單',
        source: 'internal',
        status: 'completed',
      },
      programming: {
        type: '燒錄單',
        source: 'internal',
        status: 'completed',
      },
    },
    inventory: {
      selectedInventoryId: 'IC-003',
      incomingQty: 2000,
      okQty: 1995,
      ngQty: 5,
      ngDetails: [
        { reason: 'PIN_DAMAGE', qty: 5, note: '' },
      ],
      isReconciled: true,
    },
    consumables: {
      selectedTape: 'CT-003',
      selectedSocket: 'SK-002',
      tapeRequired: 3,
      isChecked: true,
    },
    shipping: {
      quantity: 1995,
      batchNo: 'B2024-1215-001',
      labelPrinted: true,
    },
    finance: {
      unitPrice: 4.5,
      totalAmount: 8977.5,
      paymentStatus: 'pending',
      invoiceNo: null,
      invoiceDate: null,
      invoiceAmount: null,
      taxAmount: null,
      invoiceRemark: null,
      dueDate: null,
      paidDate: null,
    },
    createdAt: '2024-12-05T14:00:00Z',
    updatedAt: '2024-12-16T17:00:00Z',
  },
];

// 根據 ID 取得訂單
export function getOrderById(id: string): OrderData | undefined {
  return mockOrders.find(order => order.orderId === id);
}

// 產生新訂單編號
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const count = mockOrders.length + 1;
  return `ORD-${year}-${String(count).padStart(3, '0')}`;
}
