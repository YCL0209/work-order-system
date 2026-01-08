import { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const widthClasses = {
  sm: 'w-80',      // 320px
  md: 'w-1/3',     // 螢幕 1/3
  lg: 'w-[480px]', // 480px
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 'md',
  icon,
}: DrawerProps) {
  // 防止背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 背景遮罩 - 加入模糊效果 */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer 面板 - 加入圓角和更深陰影 */}
      <div
        className={`
          relative ${widthClasses[width]} h-full bg-white shadow-2xl
          transform transition-transform duration-300 ease-out
          flex flex-col rounded-l-2xl overflow-hidden
        `}
        style={{
          animation: 'slideInRight 0.3s ease-out',
        }}
      >
        {/* 頂部品牌色條 */}
        <div className="h-1 bg-gradient-to-r from-primary to-teal" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/logo/suiyao-logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            {icon && (
              <span className="text-primary text-xl">{icon}</span>
            )}
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0.8;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
