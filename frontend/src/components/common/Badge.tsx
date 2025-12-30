import type { ReactNode } from 'react';

type BadgeVariant =
  | 'pending' | 'active' | 'completed'
  | 'success' | 'warning' | 'danger' | 'info'
  | 'burn-fail' | 'checksum-err' | 'pin-damage' | 'empty-burn' | 'timeout' | 'other'
  | 'payment-pending' | 'payment-invoiced' | 'payment-paid' | 'payment-overdue'
  | 'normal' | 'critical';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ variant = 'pending', children, icon, className = '' }: BadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    pending: 'badge-pending',
    active: 'badge-active',
    completed: 'badge-completed',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    'burn-fail': 'badge-burn-fail',
    'checksum-err': 'badge-checksum-err',
    'pin-damage': 'badge-pin-damage',
    'empty-burn': 'badge-empty-burn',
    timeout: 'badge-timeout',
    other: 'badge-other',
    'payment-pending': 'badge-payment-pending',
    'payment-invoiced': 'badge-payment-invoiced',
    'payment-paid': 'badge-payment-paid',
    'payment-overdue': 'badge-payment-overdue',
    normal: 'status-normal',
    critical: 'status-critical',
  };

  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
