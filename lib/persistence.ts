import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export type LikePersistence = {
  loadLikeForPhoto: (photoId: string) => Promise<boolean | null>
  saveLikeForPhoto: (photoId: string, liked: boolean) => Promise<void>
}

/**
 * Firebase-based persistence adapter for likes
 * Stores like state in Firestore for each photo
 */
export const { loadLikeForPhoto, saveLikeForPhoto }: LikePersistence = {
  async loadLikeForPhoto(photoId: string) {
    try {
      const likeDoc = await getDoc(doc(db, 'likes', photoId))
      return likeDoc.exists() ? likeDoc.data()?.liked : null
    } catch (error) {
      console.error('Error loading like:', error)
      return null
    }
  },
  
  async saveLikeForPhoto(photoId: string, liked: boolean) {
    try {
      await setDoc(doc(db, 'likes', photoId), { liked, timestamp: new Date() })
    } catch (error) {
      console.error('Error saving like:', error)
    }
  },
}
