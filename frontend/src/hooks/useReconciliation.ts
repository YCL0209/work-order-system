import { useMemo } from 'react';
import type { Inventory } from '@/types';

export function useReconciliation(inventory: Inventory) {
  const { incomingQty, okQty, ngQty } = inventory;

  // 計算差異數
  const difference = useMemo(() => {
    return incomingQty - (okQty + ngQty);
  }, [incomingQty, okQty, ngQty]);

  // 判斷是否平衡（勾稽完成）
  const isBalanced = useMemo(() => {
    return difference === 0 && incomingQty > 0;
  }, [difference, incomingQty]);

  // 計算良率
  const yieldRate = useMemo(() => {
    const total = okQty + ngQty;
    if (total === 0) return 0;
    return (okQty / total) * 100;
  }, [okQty, ngQty]);

  // 格式化良率顯示
  const yieldRateDisplay = useMemo(() => {
    return yieldRate.toFixed(2) + '%';
  }, [yieldRate]);

  // 計算總加工數
  const totalProcessed = useMemo(() => {
    return okQty + ngQty;
  }, [okQty, ngQty]);

  // 勾稽狀態 CSS class
  const reconciliationClass = useMemo(() => {
    if (incomingQty === 0) return '';
    return isBalanced ? 'reconciled' : 'unreconciled';
  }, [incomingQty, isBalanced]);

  // 勾稽狀態文字
  const reconciliationStatus = useMemo(() => {
    if (incomingQty === 0) return '尚未登記進料';
    return isBalanced ? '勾稽平衡' : '勾稽不平衡';
  }, [incomingQty, isBalanced]);

  // 差異說明
  const differenceNote = useMemo(() => {
    if (difference === 0) return '';
    if (difference > 0) return `尚有 ${difference} 件未登記`;
    return `超出 ${Math.abs(difference)} 件`;
  }, [difference]);

  return {
    difference,
    isBalanced,
    yieldRate,
    yieldRateDisplay,
    totalProcessed,
    reconciliationClass,
    reconciliationStatus,
    differenceNote,
  };
}
