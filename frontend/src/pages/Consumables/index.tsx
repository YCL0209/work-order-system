import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Badge, Tabs, TabPanel, Button, Drawer } from '@/components/common';
import { mockTapes, mockSockets } from '@/mocks';
import { getSocketUsageRate } from '@/types';
import type { Tape, Socket } from '@/types';

const CONSUMABLES_TABS = [
  { key: 'tapes', label: '料帶管理', icon: '🎞️' },
  { key: 'sockets', label: '燒錄座管理', icon: '🔌' },
  { key: 'others', label: '其他管理', icon: '📦' },
];

// 表單類型
type TapeForm = { model: string; spec: string; stock: number; unit: string; safetyStock: number };
type SocketForm = { model: string; maxCount: number; nextCheck: string };
type OtherForm = { name: string; spec: string; stock: number; unit: string };

const emptyTapeForm: TapeForm = { model: '', spec: '', stock: 0, unit: '捲', safetyStock: 0 };
const emptySocketForm: SocketForm = { model: '', maxCount: 100000, nextCheck: '' };
const emptyOtherForm: OtherForm = { name: '', spec: '', stock: 0, unit: '個' };

export default function Consumables() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 資料狀態
  const [tapes, setTapes] = useState<Tape[]>(mockTapes);
  const [sockets, setSockets] = useState<Socket[]>(mockSockets);

  // 表單狀態
  const [tapeForm, setTapeForm] = useState<TapeForm>(emptyTapeForm);
  const [socketForm, setSocketForm] = useState<SocketForm>(emptySocketForm);
  const [otherForm, setOtherForm] = useState<OtherForm>(emptyOtherForm);

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

  // 取得按鈕文字
  const getAddButtonText = () => {
    switch (activeTab) {
      case 'tapes': return '+ 新增料帶';
      case 'sockets': return '+ 新增燒錄座';
      default: return '+ 新增耗材';
    }
  };

  // 取得 Modal 標題
  const getModalTitle = () => {
    switch (activeTab) {
      case 'tapes': return '新增料帶';
      case 'sockets': return '新增燒錄座';
      default: return '新增耗材';
    }
  };

  // 關閉 Modal 並重置表單
  const handleClose = () => {
    setIsModalOpen(false);
    setTapeForm(emptyTapeForm);
    setSocketForm(emptySocketForm);
    setOtherForm(emptyOtherForm);
  };

  // 新增料帶
  const handleAddTape = () => {
    if (!tapeForm.model) {
      alert('請填寫型號');
      return;
    }
    const newTape: Tape = {
      id: `TAPE-${Date.now()}`,
      model: tapeForm.model,
      spec: tapeForm.spec,
      stock: tapeForm.stock,
      unit: tapeForm.unit,
      safetyStock: tapeForm.safetyStock,
    };
    setTapes(prev => [...prev, newTape]);
    handleClose();
  };

  // 新增燒錄座
  const handleAddSocket = () => {
    if (!socketForm.model) {
      alert('請填寫型號');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const newSocket: Socket = {
      id: `SOCK-${Date.now()}`,
      model: socketForm.model,
      usedCount: 0,
      maxCount: socketForm.maxCount,
      lastCheck: today,
      nextCheck: socketForm.nextCheck || today,
      status: 'normal',
    };
    setSockets(prev => [...prev, newSocket]);
    handleClose();
  };

  // 新增其他耗材（placeholder）
  const handleAddOther = () => {
    if (!otherForm.name) {
      alert('請填寫耗材名稱');
      return;
    }
    // TODO: 實作其他耗材資料結構
    alert(`已新增耗材：${otherForm.name}`);
    handleClose();
  };

  // 渲染新增表單
  const renderAddForm = () => {
    if (activeTab === 'tapes') {
      return (
        <div className="space-y-4">
          <div>
            <label className="form-label">型號 *</label>
            <input
              type="text"
              className="form-input"
              placeholder="例：CT-8mm"
              value={tapeForm.model}
              onChange={e => setTapeForm({ ...tapeForm, model: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">規格</label>
            <input
              type="text"
              className="form-input"
              placeholder="例：8mm 白色"
              value={tapeForm.spec}
              onChange={e => setTapeForm({ ...tapeForm, spec: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">庫存數量</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={tapeForm.stock}
                onChange={e => setTapeForm({ ...tapeForm, stock: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="form-label">單位</label>
              <input
                type="text"
                className="form-input"
                placeholder="例：捲"
                value={tapeForm.unit}
                onChange={e => setTapeForm({ ...tapeForm, unit: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="form-label">安全庫存</label>
            <input
              type="number"
              className="form-input"
              placeholder="0"
              value={tapeForm.safetyStock}
              onChange={e => setTapeForm({ ...tapeForm, safetyStock: Number(e.target.value) })}
            />
          </div>
          <div className="flex gap-3 !mt-6 pt-6 border-t border-gray-200">
            <Button variant="primary" className="flex-[2]" onClick={handleAddTape}>
              新增
            </Button>
            <Button variant="secondary" className="flex-1" onClick={handleClose}>
              取消
            </Button>
          </div>
        </div>
      );
    }

    if (activeTab === 'sockets') {
      return (
        <div className="space-y-4">
          <div>
            <label className="form-label">型號 *</label>
            <input
              type="text"
              className="form-input"
              placeholder="例：DIP-8"
              value={socketForm.model}
              onChange={e => setSocketForm({ ...socketForm, model: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">使用上限</label>
              <input
                type="number"
                className="form-input"
                placeholder="例：100000"
                value={socketForm.maxCount}
                onChange={e => setSocketForm({ ...socketForm, maxCount: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="form-label">下次檢查日期</label>
              <input
                type="date"
                className="form-input"
                value={socketForm.nextCheck}
                onChange={e => setSocketForm({ ...socketForm, nextCheck: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3 !mt-6 pt-6 border-t border-gray-200">
            <Button variant="primary" className="flex-[2]" onClick={handleAddSocket}>
              新增
            </Button>
            <Button variant="secondary" className="flex-1" onClick={handleClose}>
              取消
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="form-label">耗材名稱 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="輸入耗材名稱"
            value={otherForm.name}
            onChange={e => setOtherForm({ ...otherForm, name: e.target.value })}
          />
        </div>
        <div>
          <label className="form-label">規格說明</label>
          <input
            type="text"
            className="form-input"
            placeholder="輸入規格"
            value={otherForm.spec}
            onChange={e => setOtherForm({ ...otherForm, spec: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">庫存數量</label>
            <input
              type="number"
              className="form-input"
              placeholder="0"
              value={otherForm.stock}
              onChange={e => setOtherForm({ ...otherForm, stock: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="form-label">單位</label>
            <input
              type="text"
              className="form-input"
              placeholder="例：個"
              value={otherForm.unit}
              onChange={e => setOtherForm({ ...otherForm, unit: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-3 !mt-6 pt-6 border-t border-gray-200">
          <Button variant="primary" className="flex-[2]" onClick={handleAddOther}>
            新增
          </Button>
          <Button variant="secondary" className="flex-1" onClick={handleClose}>
            取消
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">耗材管控</h1>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          {getAddButtonText()}
        </Button>
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
                  <th>狀態</th>
                </tr>
              </thead>
              <tbody>
                {tapes.map(tape => {
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
                {sockets.map(socket => {
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

      {/* 新增耗材 Drawer */}
      <Drawer
        isOpen={isModalOpen}
        onClose={handleClose}
        title={getModalTitle()}
        width="md"
      >
        {renderAddForm()}
      </Drawer>
    </div>
  );
}
