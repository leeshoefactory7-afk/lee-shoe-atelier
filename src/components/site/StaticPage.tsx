import type { ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";
import { Breadcrumbs } from "./Breadcrumbs";

export function StaticPage({
  title, tagline, children, cover,
}: { title: string; tagline?: string; children: ReactNode; cover?: string }) {
  return (
    <SiteLayout>
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        {cover && <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <div className="relative container-lux py-24 md:py-32">
          {tagline && <p className="text-xs uppercase tracking-[0.28em] text-accent">{tagline}</p>}
          <h1 className="font-serif text-5xl md:text-7xl mt-3">{title}</h1>
        </div>
      </section>
      <div className="container-lux py-16 max-w-3xl mx-auto prose-luxe">
        <Breadcrumbs items={[{ label: title }]} />
        <div className="mt-8 space-y-6 text-foreground/85 leading-relaxed">{children}</div>
      </div>
    </SiteLayout>
  );
}
