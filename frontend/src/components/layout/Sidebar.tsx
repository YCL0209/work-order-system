import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SIDEBAR_NAVIGATION, type NavItem } from '@/constants/navigation';

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const active = isActive(item.path);

    // 子項目樣式
    if (level > 0) {
      return (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive: linkActive }) => `
            flex items-center pl-6 pr-4 py-2 text-sm transition-colors
            ${linkActive
              ? 'text-primary font-semibold'
              : 'text-gray-600 hover:text-primary'
            }
          `}
        >
          <span className="mr-2 text-gray-400">·</span>
          {item.label}
        </NavLink>
      );
    }

    // 有子選單的項目
    if (hasChildren) {
      return (
        <div key={item.path}>
          <div className={`rounded-lg overflow-hidden transition-all ${
            isExpanded ? 'bg-primary-light border border-primary/20' : ''
          }`}>
            <button
              onClick={() => toggleExpand(item.path)}
              className={`
                w-full flex items-center justify-between px-4 py-4 text-base transition-all
                ${isExpanded
                  ? 'text-primary-dark font-medium'
                  : active
                    ? 'bg-primary text-white font-semibold rounded-lg shadow-md'
                    : 'bg-primary-light text-primary-dark border border-primary/20 hover:border-primary hover:shadow-sm rounded-lg'
                }
              `}
            >
              <span>{item.label}</span>
              <span className={`transition-transform duration-200 text-sm ${isExpanded ? 'rotate-90' : ''}`}>
                ▶
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-40 pb-2' : 'max-h-0'
              }`}
            >
              {item.children?.map(child => renderNavItem(child, level + 1))}
            </div>
          </div>
        </div>
      );
    }

    // 一般項目（無子選單）
    return (
      <div key={item.path}>
        <NavLink
          to={item.path}
          className={({ isActive: linkActive }) => `
            flex items-center px-4 py-4 text-base rounded-lg transition-all
            ${linkActive
              ? 'bg-primary text-white font-semibold shadow-md'
              : 'bg-primary-light text-primary-dark border border-primary/20 hover:border-primary hover:shadow-sm'
            }
          `}
        >
          {item.label}
        </NavLink>
      </div>
    );
  };

  return (
    <aside className="w-sidebar h-screen fixed left-0 top-0 bg-bg-sidebar border-r border-gray-200 flex flex-col">
      {/* Logo 區域 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src="/assets/images/logo/suiyao-logo.png"
            alt="穗鈅科技"
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-primary-dark font-bold text-xl">穗鈅科技</h1>
            <p className="text-sm text-gray-500">IC 燒錄 MES 系統</p>
          </div>
        </div>
      </div>

      {/* 導航選單 */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-3">
        {SIDEBAR_NAVIGATION.map(item => renderNavItem(item))}
      </nav>

      {/* 底部資訊 */}
      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-400">MES v7.0</p>
      </div>
    </aside>
  );
}
