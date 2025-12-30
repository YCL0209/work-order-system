import type { NGReasonCode } from '@/types';

// NG 原因定義
export interface NGReason {
  code: NGReasonCode;
  name: string;
  badgeClass: string;
}

export const NG_REASONS: NGReason[] = [
  { code: 'BURN_FAIL', name: '燒錄失敗', badgeClass: 'badge-burn-fail' },
  { code: 'CHECKSUM_ERR', name: 'Check Sum 錯誤', badgeClass: 'badge-checksum-err' },
  { code: 'PIN_DAMAGE', name: 'IC 腳位損壞', badgeClass: 'badge-pin-damage' },
  { code: 'EMPTY_BURN', name: '空燒', badgeClass: 'badge-empty-burn' },
  { code: 'TIMEOUT', name: '通訊逾時', badgeClass: 'badge-timeout' },
  { code: 'OTHER', name: '其他', badgeClass: 'badge-other' },
];

// 根據代碼取得 NG 原因
export function getNGReasonByCode(code: NGReasonCode): NGReason | undefined {
  return NG_REASONS.find(reason => reason.code === code);
}

// 根據代碼取得 NG 原因名稱
export function getNGReasonName(code: NGReasonCode): string {
  const reason = getNGReasonByCode(code);
  return reason?.name || '未知';
}
