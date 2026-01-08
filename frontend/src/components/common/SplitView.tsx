import { useEffect } from 'react';

interface SplitViewProps {
  children: React.ReactNode;       // 左側主內容
  panel?: React.ReactNode;         // 右側面板內容
  panelTitle?: string;             // 面板標題
  panelWidth?: 'sm' | 'md' | 'lg'; // 面板寬度
  onClosePanel?: () => void;       // 關閉面板
}

const panelWidthClasses = {
  sm: 'w-80',      // 320px
  md: 'w-96',      // 384px
  lg: 'w-[480px]', // 480px
};

export function SplitView({
  children,
  panel,
  panelTitle,
  panelWidth = 'md',
  onClosePanel,
}: SplitViewProps) {
  // ESC 關閉面板
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClosePanel) {
        onClosePanel();
      }
    };
    if (panel) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [panel, onClosePanel]);

  return (
    <div className="flex gap-6 items-start">
      {/* 左側主內容區 */}
      <div className={`flex-1 min-w-0 transition-all duration-300 ${panel ? 'max-w-[calc(100%-24px-384px)]' : ''}`}>
        {children}
      </div>

      {/* 右側面板 */}
      {panel && (
        <div
          className={`
            ${panelWidthClasses[panelWidth]} flex-shrink-0
            bg-white rounded-lg shadow-lg border border-gray-200
            transform transition-all duration-300 ease-out
            animate-slideIn
          `}
        >
          {/* 面板標題 */}
          {panelTitle && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{panelTitle}</h3>
              {onClosePanel && (
                <button
                  onClick={onClosePanel}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* 面板內容 */}
          <div className="p-5">
            {panel}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
