import { ProfileHeader } from "@/components/profile-header"
import { GalleryGrid } from "@/components/gallery-grid"
import { TabBar } from "@/components/tab-bar"

export default function ProfilePage() {
  return (
    <main className="mx-auto mb-20 grid max-w-4xl gap-6 px-4 py-4 sm:py-6">
      <header className="mb-2">
        <h1 className="sr-only">Profile</h1>
        <ProfileHeader />
      </header>
      <section className="grid gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Gallery</h2>
        <GalleryGrid />
      </section>
      <TabBar />
    </main>
  )
}
