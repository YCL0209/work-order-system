import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrderState, useWorkflow } from '@/hooks';
import { initialOrderData, mockTapes, mockSockets, getCustomerById, getOrderById, generateOrderId } from '@/mocks';
import { generateBatchNo } from '@/constants';
import { WorkflowSidebar } from '@/components/workflow/WorkflowSidebar';
import { StageContent } from '@/components/workflow/StageContent';
import { AddNGModal } from '@/components/defects/AddNGModal';
import type { NGDetail } from '@/types';

export default function OrderFlow() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  // 根據是否有 id 參數決定使用哪筆訂單
  const initialOrder = useMemo(() => {
    if (orderId) {
      // 查看既有訂單
      const existingOrder = getOrderById(orderId);
      if (existingOrder) return existingOrder;
    }
    // 新建訂單（從階段 1 開始）
    return {
      ...initialOrderData,
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }, [orderId]);

  const {
    orderData,
    updateOrderInfo,
    setWorkOrderSource,
    setIncomingQty,
    setOkQty,
    addNGDetail,
    removeNGDetail,
    setReconciled,
    selectInventoryItem,
    updateConsumables,
    setConsumablesChecked,
    updateShipping,
    updateFinance,
    setCurrentStage,
  } = useOrderState(initialOrder);

  const workflow = useWorkflow({
    orderData,
    setCurrentStage,
    updateWorkOrders: () => {},
    updateFinance,
  });

  // UI 狀態
  const [selectedStage, setSelectedStage] = useState(workflow.currentStage);
  const [isNGModalOpen, setIsNGModalOpen] = useState(false);

  // 取得客戶資料
  const customer = useMemo(() => {
    return getCustomerById(orderData.customerId);
  }, [orderData.customerId]);

  // 取得選中的階段資訊
  const selectedStageInfo = useMemo(() => {
    return workflow.stages.find(s => s.id === selectedStage);
  }, [workflow.stages, selectedStage]);

  // 計算進度百分比
  const progressPercent = useMemo(() => {
    return Math.round(((workflow.currentStage - 1) / (workflow.stages.length - 1)) * 100);
  }, [workflow.currentStage, workflow.stages.length]);

  // 處理新增 NG
  const handleAddNG = (detail: NGDetail) => {
    addNGDetail(detail);
  };

  // 處理產生批號
  const handleGenerateBatchNo = () => {
    updateShipping({ batchNo: generateBatchNo() });
  };

  // 處理列印標籤
  const handlePrintLabel = () => {
    updateShipping({
      quantity: orderData.inventory.okQty,
      labelPrinted: true,
    });
  };

  // 處理階段選擇
  const handleStageSelect = (stageId: number) => {
    // 只能選擇已完成或當前階段
    if (stageId <= workflow.currentStage) {
      setSelectedStage(stageId);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6">
      {/* 左側：流程進度導航 */}
      <WorkflowSidebar
        stages={workflow.stages}
        currentStage={workflow.currentStage}
        selectedStage={selectedStage}
        getStageStatus={workflow.getStageStatus}
        onStageSelect={handleStageSelect}
        progressPercent={progressPercent}
      />

      {/* 右側：階段操作區 */}
      {selectedStageInfo && (
        <StageContent
          stage={selectedStageInfo}
          orderData={orderData}
          customer={customer}
          tapes={mockTapes}
          sockets={mockSockets}
          currentStage={workflow.currentStage}
          canAdvance={workflow.canAdvance}
          advanceBlockReason={workflow.advanceBlockReason}
          onAdvanceStage={workflow.advanceStage}
          onUpdateOrderInfo={updateOrderInfo}
          onUpdateConsumables={updateConsumables}
          onSetConsumablesChecked={setConsumablesChecked}
          onSetIncomingQty={setIncomingQty}
          onSetOkQty={setOkQty}
          onAddNG={() => setIsNGModalOpen(true)}
          onRemoveNG={removeNGDetail}
          onSetReconciled={setReconciled}
          onSelectInventoryItem={selectInventoryItem}
          onSetWorkOrderSource={setWorkOrderSource}
          onGenerateBatchNo={handleGenerateBatchNo}
          onPrintLabel={handlePrintLabel}
          onUpdateFinance={updateFinance}
        />
      )}

      {/* NG 新增彈窗 */}
      <AddNGModal
        isOpen={isNGModalOpen}
        onClose={() => setIsNGModalOpen(false)}
        onAdd={handleAddNG}
      />
    </div>
  );
}
