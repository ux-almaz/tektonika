import type { PublicationData } from "@/pages/Publication";

interface Props {
  publication: PublicationData;
}

const PublicationContent = ({ publication }: Props) => (
  <article>
    <h1 className="font-display text-[28px] md:text-[40px] font-normal leading-tight tracking-[-0.5px] mb-4">
      {publication.title}
    </h1>
    <p className="text-muted-foreground text-sm mb-8">{publication.date}</p>

    <div className="rounded-2xl overflow-hidden mb-10">
      <img
        src={publication.image}
        alt={publication.title}
        className="w-full h-[300px] md:h-[420px] object-cover"
      />
    </div>

    <div
      className="prose prose-lg max-w-none 
        prose-headings:font-display prose-headings:font-normal prose-headings:tracking-[-0.5px] prose-headings:mt-10 prose-headings:mb-4
        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
        prose-li:text-muted-foreground prose-li:leading-relaxed
        prose-ul:my-4 prose-ul:pl-5
        prose-strong:text-foreground prose-strong:font-medium"
      dangerouslySetInnerHTML={{ __html: publication.content }}
    />
  </article>
);

export default PublicationContent;
