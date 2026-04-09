import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "yellow" | "black" | "outline";
  withArrow?: boolean;
}

const PillButton = ({ variant = "yellow", withArrow = false, className, children, ...props }: PillButtonProps) => {
  const base = "group inline-flex items-center justify-center rounded-pill px-10 py-5 text-sm font-medium uppercase tracking-[0.35px] leading-[1.43] whitespace-nowrap overflow-hidden relative";
  const variants = {
    yellow: "bg-primary text-primary-foreground",
    black: "bg-foreground text-background",
    outline: "border border-border text-foreground hover:bg-muted",
  };

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="h-4 w-4" />}
    </>
  );

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <span className="btn-text-slide">
        <span className="btn-text-slide-inner">{content}</span>
        <span className="btn-text-slide-inner" aria-hidden>{content}</span>
      </span>
    </button>
  );
};

export default PillButton;
