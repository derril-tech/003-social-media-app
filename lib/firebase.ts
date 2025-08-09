import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Firebase configuration - these should be set in environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-bucket',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'dummy-app-id',
};

// Initialize Firebase only if we have valid config
let app: any;
let auth: any;
let db: any;
let googleProvider: any;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'dummy-key') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} else {
  // Mock objects for build time
  app = null;
  auth = null;
  db = null;
  googleProvider = null;
}

// Export Firebase services
export { auth, db, googleProvider };

// Authentication functions
export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase not initialized');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    // Return a no-op function if Firebase is not initialized
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// Firestore functions for posts
export interface Post {
  id: string;
  imageSrc: string;
  photographerName: string;
  username: string;
  avatarSrc: string;
  caption: string;
  likes: number;
  comments: number;
  createdAt: Date;
  userId: string;
}

export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const postsRef = collection(db, 'posts');
    const newPost = {
      ...post,
      createdAt: new Date(),
    };
    const docRef = doc(postsRef);
    await setDoc(docRef, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async (limitCount: number = 10) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

export const getUserPosts = async (userId: string) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((post: any) => post.userId === userId) as Post[];
  } catch (error) {
    console.error('Error getting user posts:', error);
    throw error;
  }
};
