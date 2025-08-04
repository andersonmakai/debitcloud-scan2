// src/components/ui/button.tsx


export function Button({
  children,
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}
