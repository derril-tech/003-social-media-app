import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export type LikePersistence = {
  loadLikeForPhoto: (photoId: string, userId?: string) => Promise<boolean | null>
  saveLikeForPhoto: (photoId: string, liked: boolean, userId?: string) => Promise<void>
}

/**
 * Firebase-based persistence adapter for likes
 * Stores like state in Firestore for each photo with user context
 */
export const { loadLikeForPhoto, saveLikeForPhoto }: LikePersistence = {
  async loadLikeForPhoto(photoId: string, userId?: string) {
    if (!db) {
      console.warn('Firebase not initialized, using local storage fallback')
      return null
    }
    
    try {
      // Use user-specific document ID if userId is provided
      const docId = userId ? `${photoId}_${userId}` : photoId
      const likeDoc = await getDoc(doc(db, 'likes', docId))
      return likeDoc.exists() ? likeDoc.data()?.liked : null
    } catch (error) {
      console.error('Error loading like:', error)
      // Fallback to localStorage for offline/error scenarios
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(`like_${photoId}`)
        return stored ? JSON.parse(stored) : null
      }
      return null
    }
  },
  
  async saveLikeForPhoto(photoId: string, liked: boolean, userId?: string) {
    if (!db) {
      console.warn('Firebase not initialized, using local storage fallback')
      // Fallback to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`like_${photoId}`, JSON.stringify(liked))
      }
      return
    }
    
    try {
      // Use user-specific document ID if userId is provided
      const docId = userId ? `${photoId}_${userId}` : photoId
      await setDoc(doc(db, 'likes', docId), { 
        liked, 
        timestamp: new Date(),
        userId: userId || 'anonymous',
        photoId 
      })
      
      // Also save to localStorage as backup
      if (typeof window !== 'undefined') {
        localStorage.setItem(`like_${photoId}`, JSON.stringify(liked))
      }
    } catch (error) {
      console.error('Error saving like:', error)
      // Fallback to localStorage on error
      if (typeof window !== 'undefined') {
        localStorage.setItem(`like_${photoId}`, JSON.stringify(liked))
      }
    }
  },
}
