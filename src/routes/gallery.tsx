import { createFileRoute } from "@tanstack/react-router";
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
      { name: "description", content: "Step inside our manufacturing halls, showrooms and craft workshops." },
      { property: "og:title", content: "Gallery · Lee Shoe Factory" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const { data: images } = useSuspenseQuery(q);
  return (
    <SiteLayout>
      <div className="container-lux py-16">
        <Breadcrumbs items={[{ label: "Gallery" }]} />
        <h1 className="font-serif text-5xl md:text-6xl mt-6">Inside the Factory</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">A glimpse of the craft, the halls and the hands behind every pair.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12">
          {images.map((im: any, i: number) => (
            <div key={im.id} className={`overflow-hidden bg-muted ${i % 5 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"}`}>
              <img src={im.image_url} alt={im.title ?? ""} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
