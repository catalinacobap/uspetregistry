"use client";

type StateSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  id?: string;
  className?: string;
};

function ChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none shrink-0 text-[var(--color-primary)]"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function StateSelect({
  value,
  onChange,
  options,
  placeholder = "Select state",
  id,
  className = "",
}: StateSelectProps) {
  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border-2 border-[var(--color-primary)] bg-white py-4 pl-4 pr-12 font-serif text-base text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0"
        aria-label={placeholder}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronIcon />
      </span>
    </div>
  );
}
