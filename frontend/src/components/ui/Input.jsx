import { string } from 'prop-types';

export default function Input({ className, label, ...props }) {
  const base = 'p-2 border rounded-sm border-gray-400 bg-gray-200 font-medium';

  return (
    <label className="font-semibold font-sans flex flex-col gap-1">
      {label}
      <input className={`${base} ${className}`} {...props} />
    </label>
  );
}

Input.propTypes = {
  className: string,
  label: string,
};
