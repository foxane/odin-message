import { InputHTMLAttributes } from 'react';

export default function Input({ className, children, ...props }: Props) {
  const base = 'p-2 border rounded-sm border-gray-400 bg-gray-200 font-medium';

  return (
    <label className="font-semibold font-sans flex flex-col gap-1">
      {children}
      <input className={`${base} ${className ?? ''}`} {...props} required />
    </label>
  );
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
