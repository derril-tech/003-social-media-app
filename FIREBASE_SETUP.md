# Firebase Setup Guide

This guide will help you resolve the Firestore authentication errors you're experiencing.

## 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** in the left sidebar

## 2. Enable Firestore Database

1. Click **Create Database**
2. Choose **Start in test mode** (we'll add security rules later)
3. Select a location close to your users
4. Click **Done**

## 3. Set Up Security Rules

1. In the Firestore Database section, click on the **Rules** tab
2. Replace the default rules with the contents of `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to posts
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    // Allow users to manage their own likes
    match /likes/{likeId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow users to manage their own comments (future feature)
    match /comments/{commentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## 4. Enable Authentication

1. Go to **Authentication** in the left sidebar
2. Click **Get started**
3. Go to the **Sign-in method** tab
4. Enable **Google** provider:
   - Click on Google
   - Toggle **Enable**
   - Add your authorized domain (localhost for development)
   - Click **Save**

## 5. Verify Environment Variables

Make sure your `.env.local` file contains all the required Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 6. Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open the app and try to sign in with Google
3. Check the browser console for any remaining errors

## Troubleshooting

### If you still see 400 errors:

1. **Check Authentication State**: Make sure users are properly authenticated before accessing Firestore
2. **Verify Project ID**: Ensure the project ID in your environment variables matches your Firebase project
3. **Check Network Tab**: Look for specific error messages in the browser's Network tab
4. **Test Rules**: Use the Firebase Console's Rules Playground to test your security rules

### Common Issues:

- **Invalid API Key**: Double-check your API key in the environment variables
- **Wrong Project ID**: Ensure the project ID matches exactly
- **Missing Authentication**: Users must be signed in to write to Firestore
- **Security Rules**: Make sure rules allow the operations you're trying to perform

## Alternative: Use Test Mode (Development Only)

If you're still having issues, you can temporarily use test mode for development:

1. In Firestore Database → Rules
2. Use this rule (⚠️ **ONLY FOR DEVELOPMENT**):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

⚠️ **Warning**: Never use test mode in production as it allows anyone to read and write to your database.
