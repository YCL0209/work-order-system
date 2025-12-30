import type { StageStatus, WorkflowStage } from '@/types';
import { Badge } from '@/components/common';

interface WorkflowProgressProps {
  stages: WorkflowStage[];
  currentStage: number;
  getStageStatus: (stageId: number) => StageStatus;
  onStageClick?: (stageId: number) => void;
}

export function WorkflowProgress({
  stages,
  currentStage,
  getStageStatus,
  onStageClick,
}: WorkflowProgressProps) {
  const getStatusBadgeVariant = (status: StageStatus) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'active':
        return 'active';
      default:
        return 'pending';
    }
  };

  const getStatusLabel = (status: StageStatus) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'active':
        return '進行中';
      default:
        return '待處理';
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-primary-dark mb-4">流程進度</h3>

      {/* 進度條 */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStage - 1) / 8) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">階段 1</span>
          <span className="text-sm text-gray-500">階段 9</span>
        </div>
      </div>

      {/* 階段列表 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stages.map(stage => {
          const status = getStageStatus(stage.id);
          const isClickable = stage.id <= currentStage;

          return (
            <div
              key={stage.id}
              onClick={() => isClickable && onStageClick?.(stage.id)}
              className={`
                p-3 rounded-card border-2 transition-all duration-200
                ${status === 'active'
                  ? 'border-primary bg-primary-light'
                  : status === 'completed'
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }
                ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed opacity-60'}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                    ${status === 'active'
                      ? 'bg-primary text-white'
                      : status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }
                  `}>
                    {status === 'completed' ? '✓' : stage.id}
                  </span>
                  <h4 className="font-medium text-sm text-gray-800">{stage.name}</h4>
                </div>
                <Badge variant={getStatusBadgeVariant(status)} className="text-xs">
                  {getStatusLabel(status)}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{stage.description}</p>
            </div>
          );
        })}
      </div>

      {/* 當前階段提示 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-card border border-blue-200">
        <p className="text-sm">
          <span className="font-semibold text-primary">目前階段：</span>
          <span className="text-gray-700">
            {stages.find(s => s.id === currentStage)?.name}
          </span>
        </p>
      </div>
    </div>
  );
}
