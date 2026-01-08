interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-6 last:mb-0">
      {title && (
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
          {title}
        </h3>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  );
}
