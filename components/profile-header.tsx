"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthContext } from "@/components/auth-provider"

type ProfileHeaderProps = {
  displayName?: string
  username?: string
  bio?: string
  avatarSrc?: string
  totalPhotos?: number
}

/**
 * Profile header component
 * Displays user information with authentication integration
 */
export function ProfileHeader({
  displayName,
  username,
  bio = "Street photographer capturing moments in monochrome.",
  avatarSrc,
  totalPhotos = 0,
}: ProfileHeaderProps) {
  const { user, isAuthenticated } = useAuthContext()

  // Use authenticated user data if available, otherwise fall back to props
  const userDisplayName = displayName || user?.displayName || "Anonymous"
  const userUsername = username || user?.email?.split('@')[0] || "user"
  const userAvatarSrc = avatarSrc || user?.photoURL || "/portrait-avatar.png"
  const initials = userDisplayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <section className="flex items-start gap-4 sm:gap-6">
      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-1 ring-black/10">
        <AvatarImage src={userAvatarSrc} alt={`${userDisplayName} avatar`} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="grid gap-2">
        <div>
          <h1 className="text-xl font-semibold text-black">{userDisplayName}</h1>
          <p className="text-sm text-zinc-600">@{userUsername}</p>
        </div>
        <p className="text-sm text-zinc-700 max-w-2xl">{bio}</p>
        <div className="text-sm text-black">
          <span className="font-semibold">{totalPhotos}</span> photos
        </div>
      </div>
    </section>
  )
}

export default function PixelPalsProfileHeader(props: ProfileHeaderProps = {}) {
  return <ProfileHeader {...props} />
}
