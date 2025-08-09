import { PhotoCard } from "@/components/photo-card"
import { TabBar } from "@/components/tab-bar"
import { Header } from "@/components/header"

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
    avatarSrc: "/portrait-avatar.png",
    caption: "Candid moments in the crowd.",
    likes: 302,
    comments: 41,
  },
  {
    id: "p3",
    imageSrc: "/monochrome-night-city.png",
    photographerName: "Sam Patel",
    username: "samp",
    avatarSrc: "/portrait-avatar.png",
    caption: "Time flows differently at night.",
    likes: 76,
    comments: 9,
  },
]

/**
 * Home page component
 * Displays the main feed of photography posts
 */
export default function Page() {
  return (
    <main className="mx-auto mb-20 grid max-w-3xl gap-6 px-4 py-4 sm:py-6">
      <Header />

      <div className="grid gap-6">
        {FEED.map((p) => (
          <PhotoCard key={p.id} {...p} />
        ))}
      </div>

      <TabBar />
    </main>
  )
}
