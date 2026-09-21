import type { IVDripProductDetail } from "@/lib/types/iv-drip";

interface Props {
  drip: IVDripProductDetail;
  locale: string;
}

export function IVDripDescription({ drip, locale }: Props) {
  const isAr = locale === "ar";
  const html = isAr ? drip.fullDescription_ar : drip.fullDescription;

  if (!html) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-primary
            prose-p:text-foreground/75 prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-primary
            prose-li:text-foreground/75"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
