import type { ReactNode } from 'react';

interface Tab {
  key: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
  children?: ReactNode;
}

export function Tabs({ tabs, activeKey, onChange }: TabsProps) {
  return (
    <div className="mb-0">
      {/* 分頁標籤列 - Excel 風格 */}
      <div className="flex gap-1 border-b-2 border-gray-300">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              flex items-center gap-2 px-4 py-2.5 text-sm font-medium
              border-x border-t-2 transition-all duration-150
              -mb-[2px]
              ${activeKey === tab.key
                ? 'bg-white border-gray-300 border-b-white text-primary rounded-t-lg'
                : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }
            `}
          >
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface TabPanelProps {
  tabKey: string;
  activeKey: string;
  children: ReactNode;
}

export function TabPanel({ tabKey, activeKey, children }: TabPanelProps) {
  if (tabKey !== activeKey) return null;
  return <div>{children}</div>;
}
