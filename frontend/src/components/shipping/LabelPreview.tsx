import type { ShippingInfo, Customer, OrderData } from '@/types';
import { Card, Button, Badge } from '@/components/common';
import { getLabelTemplateByCode, generateBatchNo } from '@/constants';

interface LabelPreviewProps {
  orderData: OrderData;
  customer: Customer | undefined;
  shipping: ShippingInfo;
  onGenerateBatchNo: () => void;
  onPrintLabel: () => void;
}

export function LabelPreview({
  orderData,
  customer,
  shipping,
  onGenerateBatchNo,
  onPrintLabel,
}: LabelPreviewProps) {
  const template = customer ? getLabelTemplateByCode(customer.labelTemplate) : null;
  const today = new Date().toLocaleDateString('zh-TW');

  return (
    <Card
      title="出貨標籤"
      extra={
        shipping.labelPrinted && (
          <Badge variant="completed">已列印</Badge>
        )
      }
    >
      {/* 出貨資訊 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-card">
          <label className="text-sm font-medium text-gray-600">出貨數量</label>
          <div className="text-2xl font-bold text-primary mt-1">
            {orderData.inventory.okQty.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">自動帶入 OK 數量</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-card">
          <label className="text-sm font-medium text-gray-600">批號</label>
          <div className="flex items-center gap-2 mt-1">
            {shipping.batchNo ? (
              <span className="text-lg font-mono font-semibold">{shipping.batchNo}</span>
            ) : (
              <span className="text-gray-400">尚未產生</span>
            )}
            {!shipping.batchNo && (
              <Button variant="teal" size="sm" onClick={onGenerateBatchNo}>
                產生批號
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 標籤預覽 */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">
          標籤預覽
          {template && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({template.name})
            </span>
          )}
        </h4>

        <div className="border-2 border-dashed border-gray-300 rounded-card p-6 bg-white">
          {customer && shipping.batchNo ? (
            <div className="space-y-3">
              {/* 標籤內容 */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">客戶名稱：</span>
                  <span className="font-semibold">{customer.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">訂單編號：</span>
                  <span className="font-mono font-semibold">{orderData.orderId}</span>
                </div>
                <div>
                  <span className="text-gray-500">IC 料號：</span>
                  <span className="font-mono font-semibold">{orderData.icInfo.partNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">數量：</span>
                  <span className="font-semibold">{orderData.inventory.okQty.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">日期：</span>
                  <span className="font-semibold">{today}</span>
                </div>
                <div>
                  <span className="text-gray-500">批號：</span>
                  <span className="font-mono font-semibold">{shipping.batchNo}</span>
                </div>

                {/* 模板 B 額外欄位 */}
                {customer.labelTemplate === 'TEMPLATE_B' && (
                  <>
                    <div>
                      <span className="text-gray-500">Check Sum：</span>
                      <span className="font-mono font-semibold">{orderData.icInfo.checkSum}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">QR Code：</span>
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                        QR
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Logo */}
              <div className="flex justify-center pt-3 border-t border-gray-200">
                <img
                  src="/assets/images/logo/suiyao-logo.png"
                  alt="穗鈅科技"
                  className="h-8 object-contain opacity-50"
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>請先產生批號以預覽標籤</p>
            </div>
          )}
        </div>
      </div>

      {/* 列印按鈕 */}
      <div className="flex justify-end gap-3">
        <Button
          variant="primary"
          onClick={onPrintLabel}
          disabled={!shipping.batchNo || shipping.labelPrinted}
        >
          {shipping.labelPrinted ? '已列印標籤' : '列印標籤'}
        </Button>
      </div>
    </Card>
  );
}
