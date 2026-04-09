import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  height?: string;
}

const FilterDropdown = ({ value, options, onChange, className = "", height = "h-14" }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex ${height} w-full items-center justify-between rounded-pill border border-border bg-card px-5 text-sm font-medium`}
      >
        {value}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-3xl border border-border bg-popover p-2 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                value === opt ? "bg-muted font-medium" : "hover:bg-muted"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
