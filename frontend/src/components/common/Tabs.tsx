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
      {/* 分頁標籤列 - 與 Sidebar 風格一致 */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`
              flex items-center gap-2 px-4 py-2.5 text-sm font-medium
              rounded-lg transition-all duration-150
              ${activeKey === tab.key
                ? 'bg-primary text-white font-semibold shadow-md'
                : 'bg-primary-light text-primary-dark border border-primary/20 hover:border-primary hover:shadow-sm'
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
