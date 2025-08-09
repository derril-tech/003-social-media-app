import { ProfileHeader } from "@/components/profile-header"
import { GalleryGrid } from "@/components/gallery-grid"
import { TabBar } from "@/components/tab-bar"
import { Header } from "@/components/header"

/**
 * Profile page component
 * Displays user profile information and their posts
 */
export default function ProfilePage() {
  return (
    <main className="mx-auto mb-20 grid max-w-4xl gap-6 px-4 py-4 sm:py-6">
      <Header />
      
      <div className="mb-2">
        <h1 className="sr-only">Profile</h1>
        <ProfileHeader />
      </div>
      
      <section className="grid gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Gallery</h2>
        <GalleryGrid />
      </section>
      <TabBar />
    </main>
  )
}
