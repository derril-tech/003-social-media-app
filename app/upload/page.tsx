import { CreatePostForm } from "@/components/create-post-form"
import { TabBar } from "@/components/tab-bar"
import { Header } from "@/components/header"

/**
 * Upload page component
 * Allows users to create and upload new posts
 */
export default function UploadPage() {
  return (
    <main className="mx-auto mb-20 grid max-w-2xl gap-6 px-4 py-4 sm:py-6">
      <Header />
      
      <div className="mb-2">
        <h1 className="text-xl font-semibold tracking-tight text-black">Create Post</h1>
        <p className="text-sm text-zinc-700">Upload a photo, add a caption, and tag categories.</p>
      </div>
      
      <CreatePostForm />
      <TabBar />
    </main>
  )
}
