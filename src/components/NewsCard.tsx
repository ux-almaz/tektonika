import { Link } from "react-router-dom";

interface NewsCardProps {
  id?: number;
  image: string;
  title: string;
  date: string;
}

const NewsCard = ({ id, image, title, date }: NewsCardProps) => {
  const Wrapper = id ? Link : "div";
  const wrapperProps = id ? { to: `/media/${id}` } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="flex flex-col group cursor-pointer bg-card flex-1 rounded-3xl overflow-hidden"
    >
      <div className="h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <h3 className="text-base md:text-lg font-medium leading-snug group-hover:text-muted-foreground transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mt-auto pt-4">{date}</p>
      </div>
    </Wrapper>
  );
};

export default NewsCard;
