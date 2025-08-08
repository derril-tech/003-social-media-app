"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImagePlus, X, Hash } from 'lucide-react'

type CreatePostFormProps = {
  defaultCaption?: string
}

export function CreatePostForm({ defaultCaption = "" }: CreatePostFormProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState(defaultCaption)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const fileRef = useRef<HTMLInputElement | null>(null)

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        // Visual only – no submit.
      }}
    >
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
        <Button type="reset" variant="outline" onClick={() => { setPreview(null); setCaption(""); setTags([]); setTagInput(""); }}>
          Reset
        </Button>
        <Button type="submit" className="bg-black text-white hover:bg-emerald-600">
          Post
        </Button>
      </div>
    </form>
  )
}

export default function PixelPalsCreatePostForm(props: CreatePostFormProps = {}) {
  return <CreatePostForm {...props} />
}
