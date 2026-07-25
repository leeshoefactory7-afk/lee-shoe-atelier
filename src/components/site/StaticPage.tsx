import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "./SiteLayout";
import { Breadcrumbs } from "./Breadcrumbs";

export function StaticPage({
  title, tagline, children, cover,
}: { title: string; tagline?: string; children: ReactNode; cover?: string }) {
  return (
    <SiteLayout>
      <section className="relative bg-primary text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[60vh] flex items-end">
        {cover && (
          <motion.img
            src={cover}
            alt=""
            initial={{ scale: 1.05, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative container-lux py-20 md:py-32 px-4 md:px-6"
        >
          {tagline && (
            <p className="text-xs uppercase tracking-[0.32em] text-accent font-medium">
              {tagline}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 md:mt-6 leading-tight">
            {title}
          </h1>
        </motion.div>
      </section>
      <div className="container-lux py-12 md:py-20 px-4 md:px-6 max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: title }]} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-8 space-y-8 text-foreground/80 leading-relaxed"
        >
          {children}
        </motion.div>
      </div>
    </SiteLayout>
  );
}
