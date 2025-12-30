import type { OrderData, WorkflowStage, Customer, Tape, Socket, FirstArticleApproval } from '@/types';
import { Card, Badge, Button } from '@/components/common';
import { ConsumablesCheckCard } from '@/components/consumables/ConsumablesCheckCard';
import { InventoryReconciliationCard } from '@/components/inventory/InventoryReconciliationCard';
import { WorkOrderCard } from '@/components/workOrder/WorkOrderCard';
import { WorkOrderPreview } from '@/components/workOrder/WorkOrderPreview';
import { LabelPreview } from '@/components/shipping/LabelPreview';
import { FinanceCard } from '@/components/finance/FinanceCard';
import { FirstArticleApprovalForm } from '@/components/workflow/FirstArticleApprovalForm';
import { mockICInventory } from '@/mocks';
import { IC_INVENTORY_STATUS_LABELS } from '@/types';

interface StageContentProps {
  stage: WorkflowStage;
  orderData: OrderData;
  customer: Customer | undefined;
  tapes: Tape[];
  sockets: Socket[];
  currentStage: number;
  canAdvance: boolean;
  advanceBlockReason: string | null;
  // 操作回調
  onAdvanceStage: () => void;
  onUpdateOrderInfo: (data: Partial<OrderData>) => void;
  onUpdateConsumables: (data: Partial<OrderData['consumables']>) => void;
  onSetConsumablesChecked: (checked: boolean) => void;
  onSetIncomingQty: (qty: number) => void;
  onSetOkQty: (qty: number) => void;
  onAddNG: () => void;
  onRemoveNG: (index: number) => void;
  onSetReconciled: (reconciled: boolean) => void;
  onSelectInventoryItem: (inventoryId: string, qty: number) => void;
  onSetWorkOrderSource: (type: 'processing' | 'programming', source: 'internal' | 'outsource') => void;
  onGenerateBatchNo: () => void;
  onPrintLabel: () => void;
  onUpdateFinance: (data: Partial<OrderData['finance']>) => void;
}

export function StageContent({
  stage,
  orderData,
  customer,
  tapes,
  sockets,
  currentStage,
  canAdvance,
  advanceBlockReason,
  onAdvanceStage,
  onUpdateOrderInfo,
  onUpdateConsumables,
  onSetConsumablesChecked,
  onSetIncomingQty,
  onSetOkQty,
  onAddNG,
  onRemoveNG,
  onSetReconciled,
  onSelectInventoryItem,
  onSetWorkOrderSource,
  onGenerateBatchNo,
  onPrintLabel,
  onUpdateFinance,
}: StageContentProps) {
  const isCurrentStage = stage.id === currentStage;
  const isCompleted = stage.id < currentStage;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 階段標題 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className={`
                w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                ${isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrentStage
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                }
              `}>
                {isCompleted ? '✓' : stage.id}
              </span>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{stage.name}</h1>
                <p className="text-gray-500 text-sm">{stage.description}</p>
              </div>
            </div>
          </div>

          {isCurrentStage && (
            <Button
              variant="success"
              onClick={onAdvanceStage}
              disabled={!canAdvance}
            >
              {currentStage >= 7 ? '已完成' : '進入下一階段 →'}
            </Button>
          )}

          {isCompleted && (
            <Badge variant="completed" className="text-base px-4 py-2">已完成</Badge>
          )}
        </div>

        {/* 前進限制提示 */}
        {isCurrentStage && advanceBlockReason && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">提示：</span>
              {advanceBlockReason}
            </p>
          </div>
        )}
      </div>

      {/* 階段內容 */}
      <div className="p-6">
        {/* 階段 1：確認客戶資料 */}
        {stage.id === 1 && (
          <>
            <Card title="確認燒錄資料">
              <div className="space-y-4">
                <p className="text-gray-600">請確認此訂單是否有既有的燒錄資料記錄：</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => onUpdateOrderInfo({ hasExistingData: true, firstArticleApproval: null })}
                    disabled={isCompleted}
                    className={`
                      flex-1 p-6 rounded-xl border-2 transition-all
                      ${orderData.hasExistingData === true
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      ${isCompleted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">📁</span>
                      <span className="font-semibold">有既有資料</span>
                      <p className="text-sm text-gray-500 mt-1">查詢歷史燒錄紀錄</p>
                    </div>
                  </button>
                  <button
                    onClick={() => onUpdateOrderInfo({ hasExistingData: false })}
                    disabled={isCompleted}
                    className={`
                      flex-1 p-6 rounded-xl border-2 transition-all
                      ${orderData.hasExistingData === false
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      ${isCompleted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">✨</span>
                      <span className="font-semibold">新增承認書</span>
                      <p className="text-sm text-gray-500 mt-1">首次燒錄此 IC</p>
                    </div>
                  </button>
                </div>
              </div>
            </Card>

            {/* 選擇新增承認書後顯示首見承認書表單 */}
            {orderData.hasExistingData === false && (
              <FirstArticleApprovalForm
                data={orderData.firstArticleApproval}
                onChange={(data: FirstArticleApproval) => onUpdateOrderInfo({ firstArticleApproval: data })}
                disabled={isCompleted}
              />
            )}
          </>
        )}

        {/* 階段 2：耗材檢查 */}
        {stage.id === 2 && (
          <ConsumablesCheckCard
            tapes={tapes}
            sockets={sockets}
            selectedTape={orderData.consumables.selectedTape}
            selectedSocket={orderData.consumables.selectedSocket}
            tapeRequired={orderData.consumables.tapeRequired || 5}
            isChecked={orderData.consumables.isChecked}
            onSelectTape={(id) => onUpdateConsumables({ selectedTape: id })}
            onSelectSocket={(id) => onUpdateConsumables({ selectedSocket: id })}
            onConfirmCheck={() => onSetConsumablesChecked(true)}
          />
        )}

        {/* 階段 3：製作/發送文件 */}
        {stage.id === 3 && (
          <WorkOrderPreview
            data={orderData.firstArticleApproval}
            disabled={isCompleted}
          />
        )}

        {/* 階段 4：進料分派（選擇庫存 + 派工來源） */}
        {stage.id === 4 && (
          <div className="space-y-6">
            {/* 選擇進料 */}
            <Card title="選擇進料">
              <p className="text-gray-600 mb-4">請從 IC 庫存中選擇要進料的項目：</p>

              {/* 庫存列表 */}
              <div className="space-y-3">
                {mockICInventory
                  .filter(item => item.status === 'pending')
                  .map(item => {
                    const isSelected = orderData.inventory.selectedInventoryId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`
                          p-4 rounded-lg border-2 transition-all
                          ${isSelected
                            ? 'border-primary bg-primary-light'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          ${isCompleted ? 'opacity-60' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <span className="font-mono font-semibold text-lg">{item.partNumber}</span>
                              <Badge variant="warning">{IC_INVENTORY_STATUS_LABELS[item.status]}</Badge>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="text-gray-400">數量：</span>
                                <span className="font-semibold">{item.quantity.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">客戶：</span>
                                <span>{item.customerName}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">批號：</span>
                                <span className="font-mono">{item.batchNo}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">儲位：</span>
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            {isSelected ? (
                              <Badge variant="success" className="px-4 py-2">已選擇</Badge>
                            ) : (
                              <Button
                                variant="primary"
                                onClick={() => onSelectInventoryItem(item.id, item.quantity)}
                                disabled={isCompleted}
                              >
                                選擇
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {mockICInventory.filter(item => item.status === 'pending').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  目前沒有待加工的 IC 庫存
                </div>
              )}

              {/* 已選擇的進料資訊 */}
              {orderData.inventory.selectedInventoryId && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700">
                    <span className="font-semibold">已選擇進料：</span>
                    {orderData.inventory.incomingQty.toLocaleString()} 件
                  </p>
                </div>
              )}
            </Card>

            {/* 派工來源選擇 */}
            <WorkOrderCard
              workOrders={orderData.workOrders}
              onSetSource={onSetWorkOrderSource}
              disabled={isCompleted}
              showSourceSelection={true}
            />
          </div>
        )}

        {/* 階段 5：執行作業 */}
        {stage.id === 5 && (
          <InventoryReconciliationCard
            inventory={orderData.inventory}
            onIncomingQtyChange={onSetIncomingQty}
            onOkQtyChange={onSetOkQty}
            onAddNG={onAddNG}
            onRemoveNG={onRemoveNG}
            onConfirmReconciliation={() => onSetReconciled(true)}
          />
        )}

        {/* 階段 6：出貨作業 */}
        {stage.id === 6 && (
          <LabelPreview
            orderData={orderData}
            customer={customer}
            shipping={orderData.shipping}
            onGenerateBatchNo={onGenerateBatchNo}
            onPrintLabel={onPrintLabel}
          />
        )}

        {/* 階段 7：完成 */}
        {stage.id === 7 && (
          <div className="space-y-6">
            <div className="text-center p-8 bg-green-50 rounded-xl border border-green-200">
              <p className="text-5xl mb-4">🎉</p>
              <h2 className="text-2xl font-bold text-green-700 mb-2">訂單已完成！</h2>
              <p className="text-gray-600">所有作業已完成，等待客戶付款。</p>
            </div>

            <FinanceCard
              finance={orderData.finance}
              customer={customer}
              okQty={orderData.inventory.okQty}
              onUpdateFinance={onUpdateFinance}
            />
          </div>
        )}
      </div>
    </div>
  );
}
