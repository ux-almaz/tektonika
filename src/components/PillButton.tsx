import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "yellow" | "black" | "outline";
  withArrow?: boolean;
}

const PillButton = ({ variant = "yellow", withArrow = false, className, children, ...props }: PillButtonProps) => {
  const base =
    "btn-interactive inline-flex items-center justify-center gap-2 rounded-pill px-10 py-5 text-sm font-medium uppercase tracking-[0.35px] leading-[1.43] whitespace-nowrap";
  const variants = {
    yellow: "btn-yellow",
    black: "border border-transparent bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-transparent",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {withArrow && <ArrowRight className="h-4 w-4 shrink-0" />}
    </button>
  );
};

export default PillButton;
