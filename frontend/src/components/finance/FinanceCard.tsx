import { useState } from 'react';
import type { FinanceInfo, Customer, PaymentStatus } from '@/types';
import { Card, Badge, Button, Modal } from '@/components/common';
import { getPaymentTermByCode, calculateDueDate } from '@/constants';

interface FinanceCardProps {
  finance: FinanceInfo;
  customer: Customer | undefined;
  okQty: number;
  onUpdateFinance: (finance: Partial<FinanceInfo>) => void;
}

export function FinanceCard({
  finance,
  customer,
  okQty,
  onUpdateFinance,
}: FinanceCardProps) {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // 發票表單狀態
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNo: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceAmount: finance.totalAmount,
    taxAmount: Math.round(finance.totalAmount * 0.05),
    invoiceRemark: '',
  });

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return { variant: 'payment-paid' as const, label: '已付款', icon: '✅' };
      case 'invoiced':
        return { variant: 'payment-invoiced' as const, label: '已請款', icon: '📄' };
      case 'overdue':
        return { variant: 'payment-overdue' as const, label: '逾期', icon: '⚠️' };
      default:
        return { variant: 'payment-pending' as const, label: '待請款', icon: '⏳' };
    }
  };

  const paymentTerm = customer ? getPaymentTermByCode(customer.paymentTerm) : null;
  const statusBadge = getPaymentStatusBadge(finance.paymentStatus);

  // 處理開立發票
  const handleSubmitInvoice = () => {
    const dueDate = customer
      ? calculateDueDate(invoiceForm.invoiceDate, customer.paymentTerm)
      : invoiceForm.invoiceDate;

    onUpdateFinance({
      invoiceNo: invoiceForm.invoiceNo,
      invoiceDate: invoiceForm.invoiceDate,
      invoiceAmount: invoiceForm.invoiceAmount,
      taxAmount: invoiceForm.taxAmount,
      invoiceRemark: invoiceForm.invoiceRemark,
      dueDate,
      paymentStatus: 'invoiced',
    });

    setIsInvoiceModalOpen(false);
  };

  // 處理確認收款
  const handleConfirmPayment = () => {
    onUpdateFinance({
      paymentStatus: 'paid',
      paidDate: new Date().toISOString().split('T')[0],
    });
    setIsPaymentModalOpen(false);
  };

  return (
    <Card
      title="金流管理"
      extra={
        <Badge variant={statusBadge.variant}>
          {statusBadge.icon} {statusBadge.label}
        </Badge>
      }
    >
      {/* 金額資訊 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-card text-center">
          <label className="text-sm text-gray-500">單價</label>
          <div className="text-xl font-bold text-gray-800 mt-1">
            ${finance.unitPrice.toFixed(2)}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-card text-center">
          <label className="text-sm text-gray-500">數量</label>
          <div className="text-xl font-bold text-gray-800 mt-1">
            {okQty.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-blue-50 rounded-card text-center">
          <label className="text-sm text-gray-500">總金額</label>
          <div className="text-xl font-bold text-primary mt-1">
            ${finance.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 付款條件 */}
      {customer && paymentTerm && (
        <div className="p-4 bg-gray-50 rounded-card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm text-gray-500">付款條件</label>
              <div className="font-semibold text-gray-800">{paymentTerm.name}</div>
            </div>
            <div>
              <label className="text-sm text-gray-500">信用額度</label>
              <div className="font-semibold text-gray-800">
                ${customer.currentCredit.toLocaleString()} / ${customer.creditLimit.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 發票資訊 */}
      {finance.invoiceNo && (
        <div className="p-4 bg-green-50 rounded-card mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">發票資訊</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">發票號碼：</span>
              <span className="font-mono font-semibold">{finance.invoiceNo}</span>
            </div>
            <div>
              <span className="text-gray-500">開票日期：</span>
              <span className="font-semibold">{finance.invoiceDate}</span>
            </div>
            <div>
              <span className="text-gray-500">發票金額：</span>
              <span className="font-semibold">${finance.invoiceAmount?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-500">稅額：</span>
              <span className="font-semibold">${finance.taxAmount?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-500">到期日：</span>
              <span className="font-semibold">{finance.dueDate}</span>
            </div>
            {finance.paidDate && (
              <div>
                <span className="text-gray-500">付款日期：</span>
                <span className="font-semibold text-green-600">{finance.paidDate}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 操作按鈕 */}
      <div className="flex justify-end gap-3">
        {finance.paymentStatus === 'pending' && (
          <Button variant="primary" onClick={() => setIsInvoiceModalOpen(true)}>
            填寫發票資訊
          </Button>
        )}
        {finance.paymentStatus === 'invoiced' && (
          <Button variant="success" onClick={() => setIsPaymentModalOpen(true)}>
            確認收款
          </Button>
        )}
      </div>

      {/* 發票填寫彈窗 */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="填寫發票資訊"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsInvoiceModalOpen(false)}>
              取消
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitInvoice}
              disabled={!invoiceForm.invoiceNo}
            >
              確認
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="form-label">發票號碼 *</label>
            <input
              type="text"
              value={invoiceForm.invoiceNo}
              onChange={(e) => setInvoiceForm(prev => ({ ...prev, invoiceNo: e.target.value }))}
              className="form-input"
              placeholder="請輸入發票號碼"
            />
          </div>
          <div>
            <label className="form-label">開票日期 *</label>
            <input
              type="date"
              value={invoiceForm.invoiceDate}
              onChange={(e) => setInvoiceForm(prev => ({ ...prev, invoiceDate: e.target.value }))}
              className="form-input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">發票金額 *</label>
              <input
                type="number"
                value={invoiceForm.invoiceAmount}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, invoiceAmount: Number(e.target.value) }))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">稅額 *</label>
              <input
                type="number"
                value={invoiceForm.taxAmount}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, taxAmount: Number(e.target.value) }))}
                className="form-input"
              />
            </div>
          </div>
          <div>
            <label className="form-label">備註</label>
            <textarea
              value={invoiceForm.invoiceRemark}
              onChange={(e) => setInvoiceForm(prev => ({ ...prev, invoiceRemark: e.target.value }))}
              className="form-input"
              rows={2}
            />
          </div>
          <div className="p-3 bg-yellow-50 rounded-card text-sm text-yellow-800">
            <strong>提示：</strong>發票號碼需手動至國稅局系統開立後回填。
          </div>
        </div>
      </Modal>

      {/* 收款確認彈窗 */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="確認收款"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>
              取消
            </Button>
            <Button variant="success" onClick={handleConfirmPayment}>
              確認收款
            </Button>
          </>
        }
      >
        <div className="text-center">
          <div className="text-3xl mb-3">💰</div>
          <p className="text-gray-600 mb-4">
            確認已收到客戶付款 <strong>${finance.totalAmount.toLocaleString()}</strong>？
          </p>
          <p className="text-sm text-gray-500">
            確認後將記錄今日為付款日期
          </p>
        </div>
      </Modal>
    </Card>
  );
}
