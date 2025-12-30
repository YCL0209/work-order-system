import { useEffect } from 'react';
import type { FirstArticleApproval } from '@/types';
import {
  FACTORY_OPTIONS,
  BRAND_OPTIONS,
  ORDER_TYPE_OPTIONS,
  CURRENCY_OPTIONS,
  MOQ_OPTIONS,
  DELIVERY_METHOD_OPTIONS,
  PACKAGE_OPTIONS,
  PAYMENT_TERM_OPTIONS,
  generateSystemNo,
  generateApprovalNo,
} from '@/constants';
import { initialFirstArticleApproval } from '@/types/firstArticleApproval';

interface FirstArticleApprovalFormProps {
  data: FirstArticleApproval | null;
  onChange: (data: FirstArticleApproval) => void;
  disabled?: boolean;
}

// 表單行組件
function FormRow({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      <div className="w-40 shrink-0 bg-gray-50 px-4 py-2 flex items-center font-medium text-gray-700 text-sm border-r border-gray-200">
        {label}
      </div>
      <div className="flex-1 px-4 py-2 flex items-center">
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

export function FirstArticleApprovalForm({
  data,
  onChange,
  disabled = false,
}: FirstArticleApprovalFormProps) {
  // 初始化資料
  useEffect(() => {
    if (!data) {
      const initialData: FirstArticleApproval = {
        ...initialFirstArticleApproval,
        systemNo: generateSystemNo(),
        approvalNo: generateApprovalNo(),
      };
      onChange(initialData);
    }
  }, [data, onChange]);

  const formData = data || initialFirstArticleApproval;

  const handleChange = (field: keyof FirstArticleApproval, value: unknown) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* 基本資料 */}
      <SectionHeader title="基本資料" />
      <div>
        <FormRow label="系統序號">
          <input
            type="text"
            value={formData.systemNo}
            className="form-input bg-gray-100 flex-1"
            disabled
          />
        </FormRow>
        <FormRow label="首件承認書編號">
          <input
            type="text"
            value={formData.approvalNo}
            className="form-input bg-gray-100 flex-1"
            disabled
          />
        </FormRow>
        <FormRow label="重工品">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isRework"
                checked={formData.isRework === true}
                onChange={() => handleChange('isRework', true)}
                disabled={disabled}
                className="w-4 h-4 text-primary"
              />
              <span>是</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isRework"
                checked={formData.isRework === false}
                onChange={() => handleChange('isRework', false)}
                disabled={disabled}
                className="w-4 h-4 text-primary"
              />
              <span>否</span>
            </label>
          </div>
        </FormRow>
        <FormRow label="訂單序號">
          <input
            type="number"
            value={formData.orderSeq || ''}
            onChange={(e) => handleChange('orderSeq', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="訂單編號">
          <input
            type="text"
            value={formData.orderNo}
            onChange={(e) => handleChange('orderNo', e.target.value)}
            className="form-input flex-1"
                        disabled={disabled}
          />
        </FormRow>
        <FormRow label="序號">
          <input
            type="number"
            value={formData.seq || ''}
            onChange={(e) => handleChange('seq', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="廠別">
          <select
            value={formData.factory}
            onChange={(e) => handleChange('factory', e.target.value)}
            className="form-input w-64"
            disabled={disabled}
          >
            <option value="">請選擇</option>
            {FACTORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormRow>
      </div>

      {/* IC 資訊 */}
      <SectionHeader title="IC 資訊" />
      <div>
        <FormRow label="廠牌">
          <select
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="form-input w-48"
            disabled={disabled}
          >
            <option value="">請選擇</option>
            {BRAND_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormRow>
        <FormRow label="類型">
          <div className="flex items-center gap-6">
            {ORDER_TYPE_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="orderType"
                  checked={formData.orderType === opt.value}
                  onChange={() => handleChange('orderType', opt.value)}
                  disabled={disabled}
                  className="w-4 h-4 text-primary"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </FormRow>
        <FormRow label="客戶IC料號">
          <input
            type="text"
            value={formData.customerPartNo}
            onChange={(e) => handleChange('customerPartNo', e.target.value)}
            className="form-input flex-1"
                        disabled={disabled}
          />
        </FormRow>
        <FormRow label="終端客戶">
          <input
            type="text"
            value={formData.endCustomer}
            onChange={(e) => handleChange('endCustomer', e.target.value)}
            className="form-input flex-1"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="內部IC料號">
          <input
            type="text"
            value={formData.internalPartNo}
            onChange={(e) => handleChange('internalPartNo', e.target.value)}
            className="form-input flex-1"
                        disabled={disabled}
          />
        </FormRow>
      </div>

      {/* 價格資訊 */}
      <SectionHeader title="價格資訊" />
      <div>
        <FormRow label="單價(U/P)">
          <select
            value={formData.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            className="form-input w-20"
            disabled={disabled}
          >
            {CURRENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            value={formData.unitPrice || ''}
            onChange={(e) => handleChange('unitPrice', Number(e.target.value) || 0)}
            className="form-input w-32 ml-2"
            placeholder="0.00"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="付款方式">
          <select
            value={formData.paymentTerm}
            onChange={(e) => handleChange('paymentTerm', e.target.value)}
            className="form-input flex-1"
            disabled={disabled}
          >
            <option value="">請選擇</option>
            {PAYMENT_TERM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormRow>
        <FormRow label="運費">
          <input
            type="number"
            value={formData.shippingFee || ''}
            onChange={(e) => handleChange('shippingFee', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="包材費">
          <input
            type="number"
            value={formData.packagingFee || ''}
            onChange={(e) => handleChange('packagingFee', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="設定費">
          <input
            type="number"
            value={formData.setupFee || ''}
            onChange={(e) => handleChange('setupFee', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="MOQ">
          <select
            value={formData.moq}
            onChange={(e) => handleChange('moq', Number(e.target.value))}
            className="form-input w-32"
            disabled={disabled}
          >
            {MOQ_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormRow>
      </div>

      {/* 封裝/CheckSum */}
      <SectionHeader title="封裝/CheckSum" />
      <div>
        <FormRow label="封裝">
          <select
            value={formData.package}
            onChange={(e) => handleChange('package', e.target.value)}
            className="form-input w-48"
            disabled={disabled}
          >
            <option value="">請選擇</option>
            {PACKAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormRow>
        <FormRow label="原廠客戶CheckSum">
          <input
            type="text"
            value={formData.customerCheckSum}
            onChange={(e) => handleChange('customerCheckSum', e.target.value)}
            className="form-input flex-1"
                        disabled={disabled}
          />
        </FormRow>
        <FormRow label="Project">
          <input
            type="text"
            value={formData.project}
            onChange={(e) => handleChange('project', e.target.value)}
            className="form-input w-48"
                        disabled={disabled}
          />
        </FormRow>
      </div>

      {/* 數量資訊 */}
      <SectionHeader title="數量資訊" />
      <div>
        <FormRow label="容許不良率">
          <input
            type="number"
            value={formData.defectRate || ''}
            onChange={(e) => handleChange('defectRate', Number(e.target.value) || 0)}
            className="form-input w-24"
            disabled={disabled}
          />
          <span className="text-gray-500 ml-2">/1000</span>
        </FormRow>
        <FormRow label="進料總數">
          <input
            type="number"
            value={formData.incomingQty || ''}
            onChange={(e) => handleChange('incomingQty', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
          <span className="text-gray-500 ml-2">PCE</span>
        </FormRow>
        <FormRow label="加工總數">
          <input
            type="number"
            value={formData.processQty || ''}
            onChange={(e) => handleChange('processQty', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
          <span className="text-gray-500 ml-2">PCE</span>
        </FormRow>
        <FormRow label="備品數">
          <input
            type="number"
            value={formData.spareQty || ''}
            onChange={(e) => handleChange('spareQty', Number(e.target.value) || 0)}
            className="form-input w-32"
            disabled={disabled}
          />
          <span className="text-gray-500 ml-2">PCE</span>
        </FormRow>
      </div>

      {/* 交貨資訊 */}
      <SectionHeader title="交貨資訊" />
      <div>
        <FormRow label="客戶需求日期">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isAsap}
              onChange={(e) => handleChange('isAsap', e.target.checked)}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span>ASAP</span>
          </label>
          <input
            type="date"
            value={formData.customerRequestDate || ''}
            onChange={(e) => handleChange('customerRequestDate', e.target.value || null)}
            className="form-input w-40 ml-6"
            disabled={disabled || formData.isAsap}
          />
        </FormRow>
        <FormRow label="交貨日期">
          <input
            type="date"
            value={formData.deliveryDate || ''}
            onChange={(e) => handleChange('deliveryDate', e.target.value || null)}
            className="form-input w-40"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="交貨時間">
          <input
            type="time"
            value={formData.deliveryTime}
            onChange={(e) => handleChange('deliveryTime', e.target.value)}
            className="form-input w-32"
            disabled={disabled}
          />
        </FormRow>
        <FormRow label="交貨方式">
          <select
            value={formData.deliveryMethod}
            onChange={(e) => handleChange('deliveryMethod', e.target.value)}
            className="form-input w-48"
            disabled={disabled}
          >
            <option value="">請選擇</option>
            {DELIVERY_METHOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormRow>
      </div>
    </div>
  );
}
