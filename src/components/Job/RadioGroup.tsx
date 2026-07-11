interface Props<T extends string> {
  name: string;
  options: {
    value: T;
    label: string;
    dot?: string;
  }[];
  value: T;
  onChange: (value: T) => void;
}

 // ---- Reusable radio group for filters (auto-applies on select) ----
export const RadioGroup = <T extends string>({
  name,
  options,
  value,
  onChange,
}: Props<T>) => (
  <div className="flex flex-col gap-1.5">
    {options.map((opt) => (
      <label
        key={opt.value}
        className="flex items-center gap-2 cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-white/[0.05] transition-colors"
      >
        <input
          type="radio"
          name={name}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
          className="w-3.5 h-3.5 accent-orange-500 cursor-pointer"
        />
        {opt.dot && <span className={`w-1.5 h-1.5 rounded-full ${opt.dot}`} />}
        <span className="text-sm text-white/75">{opt.label}</span>
      </label>
    ))}
  </div>
);
