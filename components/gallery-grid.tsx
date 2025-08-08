import Image from "next/image"

type GalleryGridProps = {
  images?: { src: string; alt?: string }[]
}

export function GalleryGrid({
  images = [
    { src: "/black-and-white-street-corner.png", alt: "Street corner" },
    { src: "/cityscape-night-bw.png", alt: "Cityscape night" },
    { src: "/bw-shadow-portrait.png", alt: "Portrait in shadows" },
    { src: "/abstract-architecture-lines-bw.png", alt: "Architecture lines" },
    { src: "/reflections-puddle-bw.png", alt: "Reflections in puddle" },
    { src: "/placeholder-r8h6b.png", alt: "Alley light" },
    { src: "/street-silhouette-bw.png", alt: "Street silhouette" },
    { src: "/abstract-shadow-bw.png", alt: "Abstract shadows" },
    { src: "/bridge-geometry-bw.png", alt: "Bridge geometry" },
  ],
}: GalleryGridProps) {
  return (
    <section aria-label="Photo gallery" className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3">
      {images.map((img, idx) => (
        <div key={idx} className="relative aspect-square overflow-hidden">
          <Image
            src={img.src || "/placeholder.svg"}
            alt={img.alt ?? "Gallery image"}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 300px"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </section>
  )
}

export default function PixelPalsGalleryGrid(props: GalleryGridProps = {}) {
  return <GalleryGrid {...props} />
}
