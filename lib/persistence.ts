export type LikePersistence = {
  loadLikeForPhoto: (photoId: string) => Promise<boolean | null>
  saveLikeForPhoto: (photoId: string, liked: boolean) => Promise<void>
}

/**
 * Placeholder persistence adapter.
 * Currently returns no data and performs no writes.
 * Swap the implementations to use localStorage or a real API later.
 */
export const { loadLikeForPhoto, saveLikeForPhoto }: LikePersistence = {
  async loadLikeForPhoto(_photoId: string) {
    // TODO: implement later (e.g., localStorage.getItem(`like:${photoId}`) === "1")
    return null
  },
  async saveLikeForPhoto(_photoId: string, _liked: boolean) {
    // TODO: implement later (e.g., localStorage.setItem(`like:${photoId}`, liked ? "1" : "0"))
  },
}
