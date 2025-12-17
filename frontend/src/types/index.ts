/** 往來用戶類型 */
export type ContactType = 'customer' | 'supplier';

/** 往來用戶 */
export interface Contact {
  id: string;
  contactNumber: string;
  name: string;
  type: ContactType;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  taxId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** 工單狀態（IC 燒錄） */
export type WorkOrderStatus = 'pending' | 'burning' | 'completed' | 'shipped';

/** 工單（IC 燒錄） */
export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  customerId: string;
  customerName: string;

  // IC 燒錄相關
  icModel: string;
  firmwareVersion: string;
  orderQuantity: number;
  burnedQuantity: number;
  goodQuantity: number;
  defectQuantity: number;

  status: WorkOrderStatus;
  dueDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
