import { useState, useCallback } from 'react';
import type {
  OrderData,
  ICInfo,
  WorkOrders,
  Inventory,
  ConsumablesSelection,
  ShippingInfo,
  FinanceInfo,
  NGDetail,
  WorkOrderSource,
  FirstArticleApproval,
} from '@/types';
import { initialOrderData } from '@/mocks';

export function useOrderState(initial: OrderData = initialOrderData) {
  const [orderData, setOrderData] = useState<OrderData>(initial);

  // 更新訂單基本資訊
  const updateOrderInfo = useCallback((info: Partial<Pick<OrderData, 'customerId' | 'hasExistingData' | 'firstArticleApproval'>>) => {
    setOrderData(prev => ({
      ...prev,
      ...info,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新 IC 資訊
  const updateICInfo = useCallback((info: Partial<ICInfo>) => {
    setOrderData(prev => ({
      ...prev,
      icInfo: { ...prev.icInfo, ...info },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新委工單
  const updateWorkOrders = useCallback((workOrders: Partial<WorkOrders>) => {
    setOrderData(prev => ({
      ...prev,
      workOrders: {
        processing: { ...prev.workOrders.processing, ...workOrders.processing },
        programming: { ...prev.workOrders.programming, ...workOrders.programming },
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 設定委工單派工來源
  const setWorkOrderSource = useCallback((
    type: 'processing' | 'programming',
    source: WorkOrderSource
  ) => {
    setOrderData(prev => ({
      ...prev,
      workOrders: {
        ...prev.workOrders,
        [type]: { ...prev.workOrders[type], source },
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新進出料資訊
  const updateInventory = useCallback((inventory: Partial<Inventory>) => {
    setOrderData(prev => ({
      ...prev,
      inventory: { ...prev.inventory, ...inventory },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 設定進料數量
  const setIncomingQty = useCallback((qty: number) => {
    setOrderData(prev => ({
      ...prev,
      inventory: { ...prev.inventory, incomingQty: qty },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 設定 OK 數量
  const setOkQty = useCallback((qty: number) => {
    setOrderData(prev => ({
      ...prev,
      inventory: { ...prev.inventory, okQty: qty },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 設定 NG 數量
  const setNgQty = useCallback((qty: number) => {
    setOrderData(prev => ({
      ...prev,
      inventory: { ...prev.inventory, ngQty: qty },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 新增 NG 明細
  const addNGDetail = useCallback((detail: NGDetail) => {
    setOrderData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        ngDetails: [...prev.inventory.ngDetails, detail],
        ngQty: prev.inventory.ngDetails.reduce((sum, d) => sum + d.qty, 0) + detail.qty,
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 移除 NG 明細
  const removeNGDetail = useCallback((index: number) => {
    setOrderData(prev => {
      const newDetails = [...prev.inventory.ngDetails];
      newDetails.splice(index, 1);
      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          ngDetails: newDetails,
          ngQty: newDetails.reduce((sum, d) => sum + d.qty, 0),
        },
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  // 設定勾稽完成
  const setReconciled = useCallback((isReconciled: boolean) => {
    setOrderData(prev => ({
      ...prev,
      inventory: { ...prev.inventory, isReconciled },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 選擇庫存項目進料
  const selectInventoryItem = useCallback((inventoryId: string, qty: number) => {
    setOrderData(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        selectedInventoryId: inventoryId,
        incomingQty: qty,
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新耗材選擇
  const updateConsumables = useCallback((consumables: Partial<ConsumablesSelection>) => {
    setOrderData(prev => ({
      ...prev,
      consumables: { ...prev.consumables, ...consumables },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 設定耗材檢查完成
  const setConsumablesChecked = useCallback((isChecked: boolean) => {
    setOrderData(prev => ({
      ...prev,
      consumables: { ...prev.consumables, isChecked },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新出貨資訊
  const updateShipping = useCallback((shipping: Partial<ShippingInfo>) => {
    setOrderData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, ...shipping },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 設定標籤已列印
  const setLabelPrinted = useCallback((labelPrinted: boolean) => {
    setOrderData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, labelPrinted },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新金流資訊
  const updateFinance = useCallback((finance: Partial<FinanceInfo>) => {
    setOrderData(prev => ({
      ...prev,
      finance: { ...prev.finance, ...finance },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 更新當前階段
  const setCurrentStage = useCallback((stage: number) => {
    setOrderData(prev => ({
      ...prev,
      currentStage: stage,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 重置訂單
  const resetOrder = useCallback(() => {
    setOrderData({
      ...initialOrderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  return {
    orderData,
    setOrderData,
    updateOrderInfo,
    updateICInfo,
    updateWorkOrders,
    setWorkOrderSource,
    updateInventory,
    setIncomingQty,
    setOkQty,
    setNgQty,
    addNGDetail,
    removeNGDetail,
    setReconciled,
    selectInventoryItem,
    updateConsumables,
    setConsumablesChecked,
    updateShipping,
    setLabelPrinted,
    updateFinance,
    setCurrentStage,
    resetOrder,
  };
}
