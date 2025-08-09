"use client"

import { useState } from "react"
import Image from "next/image"

type GalleryGridProps = {
  images?: { src: string; alt?: string }[]
}

/**
 * Gallery grid component
 * Displays a grid of user photos with error handling
 */
export function GalleryGrid({
  images = [
    { src: "/black-and-white-street-corner.png", alt: "Street corner" },
    { src: "/urban-crowd-bw.png", alt: "Urban crowd" },
    { src: "/monochrome-street-scene.png", alt: "Monochrome street scene" },
    { src: "/monochrome-night-city.png", alt: "Night city" },
    { src: "/portrait-avatar.png", alt: "Portrait" },
  ],
}: GalleryGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index))
  }
  return (
    <section aria-label="Photo gallery" className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3">
      {images.map((img, idx) => (
        <div key={idx} className="relative aspect-square overflow-hidden">
          <Image
            src={imageErrors.has(idx) ? "/black-and-white-street-corner.png" : (img.src || "/black-and-white-street-corner.png")}
            alt={img.alt ?? "Gallery image"}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 300px"
            className="h-full w-full object-cover"
            onError={() => handleImageError(idx)}
          />
        </div>
      ))}
    </section>
  )
}

export default function PixelPalsGalleryGrid(props: GalleryGridProps = {}) {
  return <GalleryGrid {...props} />
}
