import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listGallery } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const q = queryOptions({ queryKey: ["gallery"], queryFn: () => listGallery() });

export const Route = createFileRoute("/gallery")({
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  head: () => ({
    meta: [
      { title: "Gallery · Inside the Lee Shoe Factory" },
      { name: "description", content: "Step inside our manufacturing halls, showrooms and craft workshops. See the craftsmanship behind every pair." },
      { property: "og:title", content: "Gallery · Lee Shoe Factory" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const { data: images } = useSuspenseQuery(q);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
  } as const;

  return (
    <SiteLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-primary text-primary-foreground overflow-hidden py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary via-primary/70" />
        <div className="relative container-lux px-4 md:px-6">
          <p className="text-xs uppercase tracking-[0.32em] text-accent font-medium">Visual Stories</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 md:mt-6 leading-tight">Inside the Factory</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/90 leading-relaxed">
            A visual journey through our manufacturing halls, craft workshops, and the hands that shape every pair. From leather sourcing to final inspection—this is where heritage meets precision.
          </p>
        </div>
      </motion.div>

      <div className="container-lux py-12 md:py-20 px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Gallery" }]} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12"
        >
          {images.map((im: any, i: number) => (
            <motion.div
              key={im.id}
              variants={itemVariants}
              className={`overflow-hidden bg-muted rounded-lg group cursor-pointer ${
                i % 5 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"
              }`}
            >
              <img
                src={im.image_url}
                alt={im.title ?? ""}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {im.title && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4"
                >
                  <p className="text-white text-sm md:text-base font-medium">{im.title}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg text-center"
        >
          <h2 className="font-serif text-2xl md:text-3xl mb-4">Experience the craft firsthand</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            We welcome visits from media, partners, and enthusiasts. Schedule a factory tour to see our production process, meet our team, and understand the dedication behind every pair.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Request a tour
          </button>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
