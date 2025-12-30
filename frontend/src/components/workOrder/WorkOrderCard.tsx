import type { WorkOrders, WorkOrderSource } from '@/types';
import { Card, Badge, Button } from '@/components/common';

interface WorkOrderCardProps {
  workOrders: WorkOrders;
  onSetSource: (type: 'processing' | 'programming', source: WorkOrderSource) => void;
  disabled?: boolean;
}

export function WorkOrderCard({
  workOrders,
  onSetSource,
  disabled = false,
}: WorkOrderCardProps) {
  const getStatusBadge = (status: 'pending' | 'active' | 'completed') => {
    switch (status) {
      case 'completed':
        return { variant: 'completed' as const, label: '已完成' };
      case 'active':
        return { variant: 'active' as const, label: '進行中' };
      default:
        return { variant: 'pending' as const, label: '待處理' };
    }
  };

  const renderWorkOrderItem = (
    type: 'processing' | 'programming',
    title: string,
    icon: string
  ) => {
    const workOrder = workOrders[type];
    const status = getStatusBadge(workOrder.status);

    return (
      <div className="p-4 bg-gray-50 rounded-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h4 className="font-semibold text-gray-800">{title}</h4>
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {/* 派工來源選擇 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">派工來源</label>
          <div className="flex gap-3">
            <label
              className={`
                flex-1 flex items-center justify-center gap-2 p-3 rounded-card border-2 cursor-pointer transition-all
                ${workOrder.source === 'internal'
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="radio"
                name={`${type}-source`}
                value="internal"
                checked={workOrder.source === 'internal'}
                onChange={() => !disabled && onSetSource(type, 'internal')}
                disabled={disabled}
                className="hidden"
              />
              <span>🏭</span>
              <span className="font-medium">內部</span>
            </label>

            <label
              className={`
                flex-1 flex items-center justify-center gap-2 p-3 rounded-card border-2 cursor-pointer transition-all
                ${workOrder.source === 'external'
                  ? 'border-teal bg-teal-light'
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="radio"
                name={`${type}-source`}
                value="external"
                checked={workOrder.source === 'external'}
                onChange={() => !disabled && onSetSource(type, 'external')}
                disabled={disabled}
                className="hidden"
              />
              <span>🚚</span>
              <span className="font-medium">外包</span>
            </label>

            <label
              className={`
                flex-1 flex items-center justify-center gap-2 p-3 rounded-card border-2 cursor-pointer transition-all
                ${workOrder.source === 'na'
                  ? 'border-gray-500 bg-gray-100'
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="radio"
                name={`${type}-source`}
                value="na"
                checked={workOrder.source === 'na'}
                onChange={() => !disabled && onSetSource(type, 'na')}
                disabled={disabled}
                className="hidden"
              />
              <span>⊘</span>
              <span className="font-medium">不適用</span>
            </label>
          </div>
        </div>

        {/* 已選擇的來源顯示 */}
        {workOrder.source && (
          <div className="mt-3 p-2 bg-white rounded border border-gray-200">
            <span className="text-sm text-gray-600">已選擇：</span>
            <span className="font-medium ml-1">
              {workOrder.source === 'internal' && '🏭 內部作業'}
              {workOrder.source === 'external' && '🚚 外包作業'}
              {workOrder.source === 'na' && '⊘ 不適用'}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card title="委工單配置">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderWorkOrderItem('processing', '加工單', '🔧')}
        {renderWorkOrderItem('programming', '燒錄單', '💾')}
      </div>

      {/* 提示 */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-card border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">提示：</span>
          請為加工單與燒錄單分別選擇派工來源，若該作業不需要可選「不適用」。
        </p>
      </div>
    </Card>
  );
}
