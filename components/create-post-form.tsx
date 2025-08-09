"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImagePlus, X, Hash, Loader2 } from 'lucide-react'
import { useAuthContext } from "@/components/auth-provider"
import { createPost } from "@/lib/firebase"

type CreatePostFormProps = {
  defaultCaption?: string
}

/**
 * Create post form component with Firebase integration
 * Handles image upload, caption, tags, and post creation
 */
export function CreatePostForm({ defaultCaption = "" }: CreatePostFormProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthContext()
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState(defaultCaption)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file")
        return
      }
      setError(null)
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }, [])

  const onAddTag = useCallback(() => {
    const t = tagInput.trim().replace(/^#/, "")
    if (!t) return
    if (tags.includes(t)) {
      setTagInput("")
      return
    }
    setTags((prev) => [...prev, t])
    setTagInput("")
  }, [tagInput, tags])

  const onTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
        e.preventDefault()
        onAddTag()
      } else if (e.key === "Backspace" && !tagInput && tags.length) {
        // quick remove last
        setTags((prev) => prev.slice(0, -1))
      }
    },
    [onAddTag, tagInput, tags.length]
  )

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError("Please sign in to create a post")
      return
    }

    if (!preview) {
      setError("Please select an image")
      return
    }

    if (!caption.trim()) {
      setError("Please add a caption")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // For now, we'll use a placeholder image URL
      // In a real app, you'd upload the image to Firebase Storage
      const imageSrc = "/black-and-white-street-corner.png"
      
      await createPost({
        imageSrc,
        photographerName: user?.displayName || "Anonymous",
        username: user?.email?.split('@')[0] || "user",
        avatarSrc: user?.photoURL || "/portrait-avatar.png",
        caption: caption.trim(),
        likes: 0,
        comments: 0,
        userId: user?.uid || "",
      })

      // Reset form
      setPreview(null)
      setCaption("")
      setTags([])
      setTagInput("")
      
      // Navigate to home page
      router.push("/")
    } catch (err) {
      setError("Failed to create post. Please try again.")
      console.error("Error creating post:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setPreview(null)
    setCaption("")
    setTags([])
    setTagInput("")
    setError(null)
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid gap-2">
        <label className="text-sm font-medium text-black">Image</label>
        <div
          className="relative flex min-h-[220px] items-center justify-center rounded-md border border-dashed border-black/20 bg-white"
          role="button"
          tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileRef.current?.click()
          }}
        >
          {preview ? (
            <Image
              src={preview || "/placeholder.svg"}
              alt="Selected preview"
              width={1200}
              height={800}
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
              <ImagePlus className="h-8 w-8 text-black" />
              <p className="text-sm text-zinc-700">
                Click to upload or drag and drop. PNG, JPG up to 10MB.
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFileChange}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="caption" className="text-sm font-medium text-black">
          Caption
        </label>
        <Textarea
          id="caption"
          placeholder="Say something about your photo..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="resize-none text-black"
          rows={4}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="tags" className="text-sm font-medium text-black">
          Tags
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="flex items-center gap-1 bg-black text-white hover:bg-black"
            >
              <Hash className="h-3.5 w-3.5" />
              {t}
              <button
                type="button"
                aria-label={`Remove tag ${t}`}
                className="ml-1 rounded-sm p-0.5 hover:bg-white/10"
                onClick={() => removeTag(t)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="tags"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
            className="text-black"
          />
          <Button type="button" onClick={onAddTag} className="bg-black text-white hover:bg-emerald-600">
            Add
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button 
          type="submit" 
          className="bg-black text-white hover:bg-emerald-600"
          disabled={isSubmitting || !isAuthenticated}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </form>
  )
}

export default function PixelPalsCreatePostForm(props: CreatePostFormProps = {}) {
  return <CreatePostForm {...props} />
}
