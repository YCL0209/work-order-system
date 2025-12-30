import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  extra?: ReactNode;
  className?: string;
}

export function Card({ children, title, extra, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {(title || extra) && (
        <div className="card-header flex items-center justify-between">
          {title && (
            <h3 className="text-xl font-semibold text-primary-dark">{title}</h3>
          )}
          {extra && <div>{extra}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
