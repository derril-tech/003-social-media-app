"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle } from 'lucide-react'
import { loadLikeForPhoto, saveLikeForPhoto } from "@/lib/persistence"
import { useAuthContext } from "@/components/auth-provider"

export type PhotoCardProps = {
  id?: string
  imageSrc?: string
  photographerName?: string
  username?: string
  avatarSrc?: string
  caption?: string
  likes?: number
  comments?: number
  createdAt?: Date
  userId?: string
}

export function PhotoCard({
  id,
  imageSrc = "/black-and-white-street-corner.png",
  photographerName = "Jordan Lee",
  username = "jordanlee",
  avatarSrc = "/portrait-avatar.png",
  caption = "Light and shadow can change the mood of an entire street.",
  likes = 128,
  comments = 22,
  createdAt,
  userId,
}: PhotoCardProps) {
  const { user } = useAuthContext()
  
  // Optimistic UI state (local only)
  const [liked, setLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(likes)
  const [commentCount, setCommentCount] = useState<number>(comments)
  const [commenting, setCommenting] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>("")
  const [imageError, setImageError] = useState<boolean>(false)

  // Load initial like state
  useEffect(() => {
    if (id) {
      loadLikeForPhoto(id, user?.uid)
        .then((savedLike) => {
          if (savedLike !== null) {
            setLiked(savedLike)
          }
        })
        .catch((error) => {
          console.error('Error loading like state:', error)
        })
    }
  }, [id, user?.uid])

  const toggleLike = async () => {
    const nextLiked = !liked
    setLiked(nextLiked)
    setLikeCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)))
    
    // Persist like state
    if (id) {
      try {
        await saveLikeForPhoto(id, nextLiked, user?.uid)
      } catch (error) {
        console.error('Error saving like:', error)
        // Revert optimistic update on error
        setLiked(!nextLiked)
        setLikeCount((c) => (!nextLiked ? c + 1 : Math.max(0, c - 1)))
      }
    }
  }

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    const text = commentText.trim()
    if (!text) return
    // Optimistically bump count; we don't store the comment body
    setCommentCount((c) => c + 1)
    setCommentText("")
    setCommenting(false)
    // Persist later via API/localStorage if desired
  }

  return (
    <Card className="overflow-hidden border-black/10">
      <CardContent className="p-0">
        <Image
          src={imageError ? "/black-and-white-street-corner.png" : (imageSrc || "/black-and-white-street-corner.png")}
          alt={`Photograph by ${photographerName}`}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          priority={false}
          onError={() => setImageError(true)}
        />
      </CardContent>

      <CardHeader className="flex flex-row items-center gap-3 py-4">
        <Avatar className="h-10 w-10 ring-1 ring-black/10">
          <AvatarImage src={avatarSrc || "/placeholder.svg?height=80&width=80&query=avatar"} alt={`${photographerName} avatar`} />
          <AvatarFallback>
            {photographerName
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid">
          <span className="font-semibold text-black leading-none">{photographerName}</span>
          <Link href={`/profile`} className="text-sm text-zinc-500 hover:text-black">
            {"@" + username}
          </Link>
        </div>
      </CardHeader>

      <CardFooter className="flex flex-col items-start gap-3 pt-0">
        <p className="text-sm text-zinc-700">{caption}</p>

        <div className="flex items-center gap-2" aria-label="Engagement">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-black hover:text-emerald-600"
            aria-pressed={liked}
            aria-label={liked ? "Unlike photo" : "Like photo"}
            onClick={toggleLike}
          >
            <Heart
              className={`mr-2 h-5 w-5 ${liked ? "fill-emerald-600 stroke-emerald-600" : ""}`}
            />
            <span className="text-sm" aria-live="polite">{likeCount}</span>
            <span className="sr-only">likes</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-black hover:text-emerald-600"
            aria-expanded={commenting}
            aria-controls={id ? `composer-${id}` : undefined}
            onClick={() => setCommenting((v) => !v)}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            <span className="text-sm" aria-live="polite">{commentCount}</span>
            <span className="sr-only">comments</span>
          </Button>
        </div>

        {commenting && (
          <form
            id={id ? `composer-${id}` : undefined}
            className="flex w-full items-center gap-2"
            onSubmit={submitComment}
          >
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="text-black"
            />
            <Button type="submit" className="bg-black text-white hover:bg-emerald-600">
              Send
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  )
}

export default function PixelPalsPhotoCard(props: PhotoCardProps = {}) {
  return <PhotoCard {...props} />
}
