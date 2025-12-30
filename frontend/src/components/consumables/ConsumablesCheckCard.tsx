import { useMemo } from 'react';
import type { Tape, Socket, TapeStockStatus, SocketStatus } from '@/types';
import { getTapeStockStatus, getSocketUsageRate } from '@/types';
import { Card, Badge, Button } from '@/components/common';

interface ConsumablesCheckCardProps {
  tapes: Tape[];
  sockets: Socket[];
  selectedTape: string | null;
  selectedSocket: string | null;
  tapeRequired: number;
  isChecked: boolean;
  onSelectTape: (tapeId: string) => void;
  onSelectSocket: (socketId: string) => void;
  onConfirmCheck: () => void;
}

export function ConsumablesCheckCard({
  tapes,
  sockets,
  selectedTape,
  selectedSocket,
  tapeRequired,
  isChecked,
  onSelectTape,
  onSelectSocket,
  onConfirmCheck,
}: ConsumablesCheckCardProps) {
  const getTapeStatusBadge = (tape: Tape): { variant: 'success' | 'warning' | 'danger'; label: string } => {
    const status = getTapeStockStatus(tape, tapeRequired);
    switch (status) {
      case 'out_of_stock':
        return { variant: 'danger', label: '缺料' };
      case 'low':
        return { variant: 'warning', label: '庫存不足' };
      default:
        return { variant: 'success', label: '足夠' };
    }
  };

  const getSocketStatusBadge = (socket: Socket): { variant: 'success' | 'warning' | 'danger'; label: string } => {
    switch (socket.status) {
      case 'critical':
        return { variant: 'danger', label: '需更換' };
      case 'warning':
        return { variant: 'warning', label: '接近上限' };
      default:
        return { variant: 'success', label: '正常' };
    }
  };

  const canConfirm = useMemo(() => {
    return selectedTape && selectedSocket && !isChecked;
  }, [selectedTape, selectedSocket, isChecked]);

  return (
    <Card
      title="耗材檢查"
      extra={
        isChecked && (
          <Badge variant="completed">已確認</Badge>
        )
      }
    >
      {/* 料帶選擇 */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">料帶庫存</h4>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>選擇</th>
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
                const status = getTapeStatusBadge(tape);
                return (
                  <tr
                    key={tape.id}
                    className={selectedTape === tape.id ? 'bg-blue-50' : ''}
                  >
                    <td>
                      <input
                        type="radio"
                        name="tape"
                        checked={selectedTape === tape.id}
                        onChange={() => onSelectTape(tape.id)}
                        disabled={isChecked}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="font-mono">{tape.id}</td>
                    <td>{tape.model}</td>
                    <td className="text-gray-500">{tape.spec}</td>
                    <td className="font-semibold">{tape.stock} {tape.unit}</td>
                    <td className="text-gray-500">{tape.safetyStock} {tape.unit}</td>
                    <td>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 燒錄座選擇 */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">燒錄座壽命</h4>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>選擇</th>
                <th>編號</th>
                <th>型號</th>
                <th>已使用</th>
                <th>使用上限</th>
                <th>使用率</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              {sockets.map(socket => {
                const status = getSocketStatusBadge(socket);
                const usageRate = getSocketUsageRate(socket);
                return (
                  <tr
                    key={socket.id}
                    className={selectedSocket === socket.id ? 'bg-blue-50' : ''}
                  >
                    <td>
                      <input
                        type="radio"
                        name="socket"
                        checked={selectedSocket === socket.id}
                        onChange={() => onSelectSocket(socket.id)}
                        disabled={isChecked || socket.status === 'critical'}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="font-mono">{socket.id}</td>
                    <td>{socket.model}</td>
                    <td className="font-semibold">{socket.usedCount.toLocaleString()}</td>
                    <td className="text-gray-500">{socket.maxCount.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
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
                        <span className="text-sm">{usageRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 確認按鈕 */}
      <div className="flex justify-end">
        <Button
          variant="success"
          onClick={onConfirmCheck}
          disabled={!canConfirm}
        >
          {isChecked ? '已確認耗材' : '確認耗材檢查'}
        </Button>
      </div>
    </Card>
  );
}
