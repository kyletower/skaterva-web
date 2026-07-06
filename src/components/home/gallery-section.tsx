import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { galleryImages } from '@/data/content';

export function GallerySection() {
  return (
    <section
      className="section-gradient py-14 md:py-16"
      aria-labelledby="gallery-title"
    >
      <div className="container-shell space-y-7">
        <div className="max-w-3xl space-y-4">
          <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
            Gallery
          </Badge>
          <h2
            id="gallery-title"
            className="text-heading text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            Life at the rink.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <figure
              key={image.alt}
              className="overflow-hidden rounded-[18px] border border-white/8 bg-white/6"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-44 w-full object-cover md:h-48"
              />
              <figcaption className="px-3 py-2 text-sm text-slate-200">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
