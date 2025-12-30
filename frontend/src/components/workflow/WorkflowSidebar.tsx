import type { StageStatus, WorkflowStage } from '@/types';

interface WorkflowSidebarProps {
  stages: WorkflowStage[];
  currentStage: number;
  selectedStage: number;
  getStageStatus: (stageId: number) => StageStatus;
  onStageSelect: (stageId: number) => void;
  progressPercent: number;
}

export function WorkflowSidebar({
  stages,
  currentStage,
  selectedStage,
  getStageStatus,
  onStageSelect,
  progressPercent,
}: WorkflowSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 標題 */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-primary-dark flex items-center gap-2">
          <span>📋</span> 流程進度
        </h3>
      </div>

      {/* 階段列表 */}
      <div className="flex-1 overflow-y-auto p-2">
        {stages.map((stage) => {
          const status = getStageStatus(stage.id);
          const isSelected = stage.id === selectedStage;
          const isCurrent = stage.id === currentStage;
          const isClickable = stage.id <= currentStage;

          return (
            <button
              key={stage.id}
              onClick={() => isClickable && onStageSelect(stage.id)}
              disabled={!isClickable}
              className={`
                w-full text-left p-3 rounded-lg mb-1 transition-all duration-200
                flex items-center gap-3
                ${isSelected
                  ? 'bg-primary text-white'
                  : isClickable
                    ? 'hover:bg-gray-100'
                    : 'opacity-50 cursor-not-allowed'
                }
              `}
            >
              {/* 狀態圖示 */}
              <span
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${status === 'completed'
                    ? isSelected ? 'bg-white text-primary' : 'bg-green-500 text-white'
                    : status === 'active'
                      ? isSelected ? 'bg-white text-primary' : 'bg-primary text-white'
                      : isSelected ? 'bg-white text-primary' : 'bg-gray-300 text-gray-600'
                  }
                `}
              >
                {status === 'completed' ? '✓' : stage.id}
              </span>

              {/* 階段名稱 */}
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm truncate ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {stage.name}
                </div>
                {isCurrent && !isSelected && (
                  <div className="text-xs text-primary font-medium">← 目前</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 進度條 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>整體進度</span>
          <span className="font-semibold">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
