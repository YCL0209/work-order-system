import { useMemo, useCallback } from 'react';
import type { OrderData, StageStatus } from '@/types';
import { WORKFLOW_STAGES, canAdvanceStage, STAGE_AUTO_ACTIONS } from '@/constants';

interface UseWorkflowProps {
  orderData: OrderData;
  setCurrentStage: (stage: number) => void;
  updateWorkOrders: (workOrders: Partial<OrderData['workOrders']>) => void;
  updateFinance: (finance: Partial<OrderData['finance']>) => void;
}

export function useWorkflow({
  orderData,
  setCurrentStage,
  updateWorkOrders,
  updateFinance,
}: UseWorkflowProps) {
  const { currentStage } = orderData;

  // 取得階段狀態
  const getStageStatus = useCallback((stageId: number): StageStatus => {
    if (stageId < currentStage) return 'completed';
    if (stageId === currentStage) return 'active';
    return 'pending';
  }, [currentStage]);

  // 檢查是否可以前進
  const canAdvance = useMemo(() => {
    if (currentStage >= 7) return false;
    return canAdvanceStage(currentStage, orderData);
  }, [currentStage, orderData]);

  // 取得當前階段資訊
  const currentStageInfo = useMemo(() => {
    return WORKFLOW_STAGES.find(s => s.id === currentStage);
  }, [currentStage]);

  // 執行自動觸發動作
  const executeAutoActions = useCallback((stage: number) => {
    const actions = STAGE_AUTO_ACTIONS[stage];
    if (!actions) return;

    // 階段 5：委工單狀態改為進行中
    if (stage === 5) {
      updateWorkOrders({
        processing: { ...orderData.workOrders.processing, status: 'active' },
        programming: { ...orderData.workOrders.programming, status: 'active' },
      });
    }

    // 階段 6：委工單狀態改為已完成
    if (stage === 6) {
      updateWorkOrders({
        processing: { ...orderData.workOrders.processing, status: 'completed' },
        programming: { ...orderData.workOrders.programming, status: 'completed' },
      });
    }

    // 階段 7：付款狀態改為待請款
    if (stage === 7) {
      updateFinance({ paymentStatus: 'pending' });
    }
  }, [orderData.workOrders, updateWorkOrders, updateFinance]);

  // 前進到下一階段
  const advanceStage = useCallback(() => {
    if (!canAdvance) return false;

    const nextStage = currentStage + 1;
    executeAutoActions(nextStage);
    setCurrentStage(nextStage);
    return true;
  }, [canAdvance, currentStage, executeAutoActions, setCurrentStage]);

  // 跳轉到指定階段（僅用於檢視，不實際更新）
  const goToStage = useCallback((stage: number) => {
    if (stage >= 1 && stage <= 7 && stage <= currentStage) {
      // 僅允許查看已完成或當前階段
      return stage;
    }
    return currentStage;
  }, [currentStage]);

  // 取得進度百分比
  const progressPercent = useMemo(() => {
    return ((currentStage - 1) / 6) * 100;
  }, [currentStage]);

  // 取得不滿足條件的提示訊息
  const advanceBlockReason = useMemo((): string | null => {
    if (currentStage >= 7) return '已完成所有階段';
    if (canAdvance) return null;

    switch (currentStage) {
      case 1:
        return '請先確認是否有既有燒錄資料';
      case 2:
        return '請先完成耗材檢查確認';
      case 4:
        return '請先選擇進料庫存並設定派工來源';
      case 5:
        return '請先登記 OK 數量並確認勾稽完成';
      case 6:
        return '請先列印出貨標籤';
      default:
        return null;
    }
  }, [currentStage, canAdvance]);

  return {
    currentStage,
    currentStageInfo,
    getStageStatus,
    canAdvance,
    advanceStage,
    goToStage,
    progressPercent,
    advanceBlockReason,
    stages: WORKFLOW_STAGES,
  };
}
