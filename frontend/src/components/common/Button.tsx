import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'info' | 'teal'
  | 'outline-primary' | 'outline-secondary' | 'outline-danger';
type ButtonSize = 'default' | 'sm' | 'mini';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'default',
  children,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    success: 'btn-success',
    warning: 'btn-warning',
    danger: 'btn-danger',
    secondary: 'btn-secondary',
    info: 'btn-info',
    teal: 'btn-teal',
    'outline-primary': 'btn-outline-primary',
    'outline-secondary': 'btn-outline-secondary',
    'outline-danger': 'btn-outline-danger',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    default: '',
    sm: 'btn-sm',
    mini: 'btn-mini',
  };

  return (
    <button
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
