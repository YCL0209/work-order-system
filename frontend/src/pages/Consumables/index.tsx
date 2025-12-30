import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Badge, Tabs, TabPanel } from '@/components/common';
import { mockTapes, mockSockets } from '@/mocks';
import { getSocketUsageRate } from '@/types';

const CONSUMABLES_TABS = [
  { key: 'tapes', label: '料帶管理', icon: '🎞️' },
  { key: 'sockets', label: '燒錄座管理', icon: '🔌' },
  { key: 'others', label: '其他管理', icon: '📦' },
];

export default function Consumables() {
  const location = useLocation();
  const navigate = useNavigate();

  // 根據 URL 決定當前分頁
  const getActiveTab = () => {
    if (location.pathname.includes('/sockets')) return 'sockets';
    if (location.pathname.includes('/others')) return 'others';
    return 'tapes';
  };

  const activeTab = getActiveTab();

  // 切換分頁時更新 URL
  const handleTabChange = (key: string) => {
    navigate(`/consumables/${key}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">耗材管控</h1>
        <p className="text-base text-gray-500 mt-1">管理料帶庫存與燒錄座壽命</p>
      </div>

      {/* 分頁切換 */}
      <Tabs
        tabs={CONSUMABLES_TABS}
        activeKey={activeTab}
        onChange={handleTabChange}
      />

      {/* 料帶管理 */}
      <TabPanel tabKey="tapes" activeKey={activeTab}>
        <Card title="料帶庫存">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>編號</th>
                <th>型號</th>
                <th>規格</th>
                <th>庫存</th>
                <th>安全庫存</th>
                <th>每單用量</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              {mockTapes.map(tape => {
                const isLow = tape.stock < tape.safetyStock;
                return (
                  <tr key={tape.id}>
                    <td className="font-mono">{tape.id}</td>
                    <td className="font-semibold">{tape.model}</td>
                    <td className="text-gray-500">{tape.spec}</td>
                    <td className={`font-semibold ${isLow ? 'text-red-600' : ''}`}>
                      {tape.stock} {tape.unit}
                    </td>
                    <td className="text-gray-500">{tape.safetyStock} {tape.unit}</td>
                    <td className="text-gray-500">{tape.perOrderUsage} {tape.unit}</td>
                    <td>
                      <Badge variant={isLow ? 'danger' : 'success'}>
                        {isLow ? '庫存不足' : '正常'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </TabPanel>

      {/* 燒錄座管理 */}
      <TabPanel tabKey="sockets" activeKey={activeTab}>
        <Card title="燒錄座壽命">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>編號</th>
                <th>型號</th>
                <th>已使用</th>
                <th>上限</th>
                <th>使用率</th>
                <th>上次檢查</th>
                <th>下次檢查</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              {mockSockets.map(socket => {
                const usageRate = getSocketUsageRate(socket);
                return (
                  <tr key={socket.id}>
                    <td className="font-mono">{socket.id}</td>
                    <td className="font-semibold">{socket.model}</td>
                    <td>{socket.usedCount.toLocaleString()}</td>
                    <td className="text-gray-500">{socket.maxCount.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              usageRate >= 99
                                ? 'bg-red-500'
                                : usageRate >= 90
                                  ? 'bg-orange-500'
                                  : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(usageRate, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{usageRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="text-gray-500">{socket.lastCheck}</td>
                    <td className="text-gray-500">{socket.nextCheck}</td>
                    <td>
                      <Badge
                        variant={
                          socket.status === 'critical'
                            ? 'danger'
                            : socket.status === 'warning'
                              ? 'warning'
                              : 'success'
                        }
                      >
                        {socket.status === 'critical'
                          ? '需更換'
                          : socket.status === 'warning'
                            ? '接近上限'
                            : '正常'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </TabPanel>

      {/* 其他管理 */}
      <TabPanel tabKey="others" activeKey={activeTab}>
        <Card title="其他耗材">
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl mb-2">📦</p>
            <p className="text-base">尚無其他耗材資料</p>
            <p className="text-sm mt-2">可在此管理其他類型的耗材庫存</p>
          </div>
        </Card>
      </TabPanel>
    </div>
  );
}
