import { PhotoCard } from "@/components/photo-card"
import { TabBar } from "@/components/tab-bar"

const FEED = [
  {
    id: "p1",
    imageSrc: "/monochrome-street-scene.png",
    photographerName: "Jordan Lee",
    username: "jordanlee",
    avatarSrc: "/portrait-avatar.png",
    caption: "Angles and light.",
    likes: 128,
    comments: 22,
  },
  {
    id: "p2",
    imageSrc: "/urban-crowd-bw.png",
    photographerName: "Ava Chen",
    username: "avac",
    avatarSrc: "/diverse-avatars.png",
    caption: "Candid moments in the crowd.",
    likes: 302,
    comments: 41,
  },
  {
    id: "p3",
    imageSrc: "/monochrome-night-city.png",
    photographerName: "Sam Patel",
    username: "samp",
    avatarSrc: "/diverse-avatars.png",
    caption: "Time flows differently at night.",
    likes: 76,
    comments: 9,
  },
]

export default function Page() {
  return (
    <main className="mx-auto mb-20 grid max-w-3xl gap-6 px-4 py-4 sm:py-6">
      <header className="sticky top-0 z-10 -mx-4 mb-2 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur">
        <h1 className="text-xl font-semibold tracking-tight text-black">PixelPals</h1>
      </header>

      <div className="grid gap-6">
        {FEED.map((p) => (
          <PhotoCard key={p.id} {...p} />
        ))}
      </div>

      <TabBar />
    </main>
  )
}
