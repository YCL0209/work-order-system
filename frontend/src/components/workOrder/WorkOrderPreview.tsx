import type { FirstArticleApproval } from '@/types';
import { Button } from '@/components/common';
import {
  FACTORY_OPTIONS,
  BRAND_OPTIONS,
  PACKAGE_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
} from '@/constants';

interface WorkOrderPreviewProps {
  data: FirstArticleApproval | null;
  disabled?: boolean;
}

// 表單行組件
function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex border-b border-gray-200">
      <div className="w-40 shrink-0 bg-gray-50 px-4 py-3 flex items-center font-medium text-gray-700 text-sm border-r border-gray-200">
        {label}
      </div>
      <div className="flex-1 px-4 py-3 flex items-center text-gray-800">
        {children}
      </div>
    </div>
  );
}

// 區塊標題組件
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-primary text-white px-4 py-2 font-semibold text-sm">
      {title}
    </div>
  );
}

// 取得選項標籤
function getOptionLabel(options: { value: string; label: string }[], value: string): string {
  const option = options.find(opt => opt.value === value);
  return option?.label || value || '-';
}

export function WorkOrderPreview({
  data,
  disabled = false,
}: WorkOrderPreviewProps) {
  if (!data) {
    return (
      <div className="mt-6 p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">尚未建立首見承認書，請先在第一階段填寫承認書資料。</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-6 space-y-6">
      {/* 委工單標題 */}
      <div className="text-center py-4 bg-white border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800">委 工 單</h2>
        <p className="text-gray-500 mt-1">Work Order</p>
      </div>

      {/* 委工單內容 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        {/* 基本資訊 */}
        <SectionHeader title="基本資訊" />
        <div>
          <FormRow label="委工單號">
            <span className="font-mono">{data.approvalNo || '-'}</span>
          </FormRow>
          <FormRow label="訂單編號">
            <span className="font-mono">{data.orderNo || '-'}</span>
          </FormRow>
          <FormRow label="廠別">
            {getOptionLabel(FACTORY_OPTIONS, data.factory)}
          </FormRow>
          <FormRow label="建立日期">
            {new Date().toLocaleDateString('zh-TW')}
          </FormRow>
        </div>

        {/* IC 資訊 */}
        <SectionHeader title="IC 資訊" />
        <div>
          <FormRow label="廠牌">
            {getOptionLabel(BRAND_OPTIONS, data.brand)}
          </FormRow>
          <FormRow label="客戶IC料號">
            <span className="font-mono">{data.customerPartNo || '-'}</span>
          </FormRow>
          <FormRow label="內部IC料號">
            <span className="font-mono">{data.internalPartNo || '-'}</span>
          </FormRow>
          <FormRow label="封裝">
            {getOptionLabel(PACKAGE_OPTIONS, data.package)}
          </FormRow>
          <FormRow label="CheckSum">
            <span className="font-mono">{data.customerCheckSum || '-'}</span>
          </FormRow>
          <FormRow label="Project">
            {data.project || '-'}
          </FormRow>
        </div>

        {/* 數量資訊 */}
        <SectionHeader title="數量資訊" />
        <div>
          <FormRow label="進料總數">
            <span>{data.incomingQty?.toLocaleString() || 0} PCE</span>
          </FormRow>
          <FormRow label="加工總數">
            <span>{data.processQty?.toLocaleString() || 0} PCE</span>
          </FormRow>
          <FormRow label="備品數">
            <span>{data.spareQty?.toLocaleString() || 0} PCE</span>
          </FormRow>
          <FormRow label="容許不良率">
            <span>{data.defectRate || 0} /1000</span>
          </FormRow>
        </div>

        {/* 交貨資訊 */}
        <SectionHeader title="交貨資訊" />
        <div>
          <FormRow label="客戶需求日期">
            {data.isAsap ? 'ASAP' : data.customerRequestDate || '-'}
          </FormRow>
          <FormRow label="預定交貨日期">
            {data.deliveryDate || '-'}
          </FormRow>
          <FormRow label="交貨時間">
            {data.deliveryTime || '-'}
          </FormRow>
          <FormRow label="交貨方式">
            {getOptionLabel(DELIVERY_METHOD_OPTIONS, data.deliveryMethod)}
          </FormRow>
        </div>
      </div>

      {/* 操作按鈕 */}
      {!disabled && (
        <div className="flex justify-center">
          <Button variant="primary" onClick={handlePrint}>
            列印委工單
          </Button>
        </div>
      )}
    </div>
  );
}
