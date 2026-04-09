import { Link } from "react-router-dom";
import PillButton from "./PillButton";

interface FeatureCardProps {
  title: string;
  description: string;
  actionLabel: string;
  actionVariant?: "outline" | "black";
  href?: string;
}

const FeatureCard = ({ title, description, actionLabel, actionVariant = "outline", href }: FeatureCardProps) => (
  <div className="bg-muted flex flex-col flex-1 min-w-[240px] h-full rounded-3xl overflow-hidden">
    <div className="flex flex-col justify-between flex-1 h-full px-6 pt-5 pb-5">
      <div>
        <h3 className="text-[26px] font-normal leading-none">{title}</h3>
        <p className="text-brand-gray mt-2 text-base leading-[22px] whitespace-pre-line">{description}</p>
      </div>
      <div className="mt-auto pt-3">
        {actionVariant === "outline" ? (
          href ? (
            <Link to={href} className="inline-flex rounded-pill border border-border min-h-[42px] px-[24px] py-[10px] text-sm font-medium uppercase hover:bg-background transition-colors items-center">
              {actionLabel}
            </Link>
          ) : (
            <button className="rounded-pill border border-border min-h-[42px] px-[24px] py-[10px] text-sm font-medium uppercase hover:bg-background transition-colors">
              {actionLabel}
            </button>
          )
        ) : (
          href ? (
            <Link to={href}>
              <PillButton variant="black" withArrow>{actionLabel}</PillButton>
            </Link>
          ) : (
            <PillButton variant="black" withArrow>{actionLabel}</PillButton>
          )
        )}
      </div>
    </div>
  </div>
);

export default FeatureCard;
