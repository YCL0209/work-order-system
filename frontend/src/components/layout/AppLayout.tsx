import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg-light">
      {/* 側邊欄 */}
      <Sidebar />

      {/* 主內容區 */}
      <main className="ml-sidebar min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
