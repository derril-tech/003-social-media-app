import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ProfileHeaderProps = {
  displayName?: string
  username?: string
  bio?: string
  avatarSrc?: string
  totalPhotos?: number
}

export function ProfileHeader({
  displayName = "Jordan Lee",
  username = "jordanlee",
  bio = "Street photographer capturing moments in monochrome.",
  avatarSrc = "/high-contrast-avatar.png",
  totalPhotos = 42,
}: ProfileHeaderProps) {
  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <section className="flex items-start gap-4 sm:gap-6">
      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-1 ring-black/10">
        <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={`${displayName} avatar`} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="grid gap-2">
        <div>
          <h1 className="text-xl font-semibold text-black">{displayName}</h1>
          <p className="text-sm text-zinc-600">@{username}</p>
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
