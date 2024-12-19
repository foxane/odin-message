import { ButtonHTMLAttributes } from 'react';

export function Button({
  className,
  children,
  model = 'default',
  ...props
}: Props) {
  const base =
    'py-1 px-4 rounded border font-sans text-lg transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed';

  const types = {
    default:
      'border-gray-800 bg-gray-800 text-white hover:bg-gray-300 hover:text-black disabled:hover:bg-gray-800 disabled:hover:text-white',
    outline:
      'border-gray-500 bg-gray-300 text-black hover:bg-gray-100 disabled:hover:bg-gray-300',
  };

  return (
    <button
      className={`${base} ${types[model]} ${className ?? ''} disabled:hover:`}
      {...props}>
      {children}
    </button>
  );
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  model?: 'default' | 'outline';
}
