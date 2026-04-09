import { Link } from "react-router-dom";
import type { PublicationData } from "@/pages/Publication";

interface Props {
  recentNews: PublicationData[];
}

const PublicationSidebar = ({ recentNews }: Props) => (
  <div className="space-y-6">
    {/* Recent news */}
    <div>
      <h3 className="font-display text-lg font-normal mb-5 uppercase tracking-wide">
        Последние новости
      </h3>
      <div className="space-y-3">
        {recentNews.map((item) => (
          <Link
            key={item.id}
            to={`/media/${item.id}`}
            className="flex gap-4 group rounded-2xl bg-card p-3 hover:shadow-md transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-xl object-cover shrink-0"
            />
            <div className="flex flex-col justify-center min-w-0">
              <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-muted-foreground transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">{item.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
      <h3 className="font-display text-xl font-normal mb-2">
        Поможем выгодно купить квартиру
      </h3>
      <Link
        to="/contacts"
        className="inline-block mt-4 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:bg-background/90 transition-colors"
      >
        Заказать консультацию
      </Link>
    </div>
  </div>
);

export default PublicationSidebar;
