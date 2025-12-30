import { useState } from 'react';
import type { NGDetail, NGReasonCode } from '@/types';
import { Modal, Button, Badge } from '@/components/common';
import { NG_REASONS } from '@/constants';

interface AddNGModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (detail: NGDetail) => void;
}

export function AddNGModal({ isOpen, onClose, onAdd }: AddNGModalProps) {
  const [reason, setReason] = useState<NGReasonCode | ''>('');
  const [qty, setQty] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  const handleSubmit = () => {
    if (!reason || qty <= 0) return;

    onAdd({
      reason: reason as NGReasonCode,
      qty,
      note,
    });

    // 重置表單
    setReason('');
    setQty(0);
    setNote('');
    onClose();
  };

  const handleClose = () => {
    setReason('');
    setQty(0);
    setNote('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="新增 NG 紀錄"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={!reason || qty <= 0}
          >
            新增
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* NG 原因選擇 */}
        <div>
          <label className="form-label">不良原因 *</label>
          <div className="grid grid-cols-2 gap-2">
            {NG_REASONS.map(ngReason => (
              <label
                key={ngReason.code}
                className={`
                  cursor-pointer transition-all duration-200 rounded-lg
                  shadow-md hover:shadow-lg hover:scale-105 active:scale-95
                  border-2
                  ${reason === ngReason.code
                    ? 'ring-2 ring-primary ring-offset-2 border-primary'
                    : 'border-transparent hover:border-gray-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="ngReason"
                  value={ngReason.code}
                  checked={reason === ngReason.code}
                  onChange={(e) => setReason(e.target.value as NGReasonCode)}
                  className="hidden"
                />
                <Badge
                  variant={ngReason.code.toLowerCase().replace('_', '-') as any}
                  className="inline-flex w-full justify-center py-3 px-4 text-sm font-medium"
                >
                  {ngReason.name}
                </Badge>
              </label>
            ))}
          </div>
        </div>

        {/* 數量輸入 */}
        <div>
          <label className="form-label">數量 *</label>
          <input
            type="number"
            value={qty || ''}
            onChange={(e) => setQty(Number(e.target.value) || 0)}
            className="form-input"
            placeholder="請輸入 NG 數量"
            min="1"
          />
        </div>

        {/* 備註 */}
        <div>
          <label className="form-label">備註</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-input"
            placeholder="選填，可輸入詳細說明"
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
}
