import type { Tape, Socket } from '@/types';

// 料帶模擬資料
export const mockTapes: Tape[] = [
  {
    id: 'CT-001',
    model: '8mm 料帶',
    spec: '8mm x 4mm pocket',
    stock: 150,
    unit: '盤',
    safetyStock: 20,
    perOrderUsage: 5,
  },
  {
    id: 'CT-002',
    model: '12mm 料帶',
    spec: '12mm x 8mm pocket',
    stock: 80,
    unit: '盤',
    safetyStock: 15,
    perOrderUsage: 3,
  },
  {
    id: 'CT-003',
    model: '16mm 料帶',
    spec: '16mm x 12mm pocket',
    stock: 45,
    unit: '盤',
    safetyStock: 10,
    perOrderUsage: 2,
  },
  {
    id: 'CT-004',
    model: '24mm 料帶',
    spec: '24mm x 16mm pocket',
    stock: 8,
    unit: '盤',
    safetyStock: 10,
    perOrderUsage: 4,
  },
];

// 燒錄座模擬資料
export const mockSockets: Socket[] = [
  {
    id: 'SK-001',
    model: 'PLCC-44 燒錄座',
    usedCount: 45200,
    maxCount: 50000,
    lastCheck: '2024-12-10',
    nextCheck: '2024-12-17',
    status: 'warning',
  },
  {
    id: 'SK-002',
    model: 'PLCC-32 燒錄座',
    usedCount: 12000,
    maxCount: 50000,
    lastCheck: '2024-12-15',
    nextCheck: '2024-12-22',
    status: 'normal',
  },
  {
    id: 'SK-003',
    model: 'SOP-8 燒錄座',
    usedCount: 49800,
    maxCount: 50000,
    lastCheck: '2024-12-14',
    nextCheck: '2024-12-21',
    status: 'critical',
  },
  {
    id: 'SK-004',
    model: 'TSSOP-20 燒錄座',
    usedCount: 38000,
    maxCount: 50000,
    lastCheck: '2024-12-12',
    nextCheck: '2024-12-19',
    status: 'normal',
  },
  {
    id: 'SK-005',
    model: 'QFP-48 燒錄座',
    usedCount: 46500,
    maxCount: 50000,
    lastCheck: '2024-12-08',
    nextCheck: '2024-12-15',
    status: 'warning',
  },
];

// 根據 ID 取得料帶
export function getTapeById(id: string): Tape | undefined {
  return mockTapes.find(tape => tape.id === id);
}

// 根據 ID 取得燒錄座
export function getSocketById(id: string): Socket | undefined {
  return mockSockets.find(socket => socket.id === id);
}
