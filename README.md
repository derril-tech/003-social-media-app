# PixelPals - Social Photography App

A modern social media application for sharing and discovering beautiful monochrome photography. Built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- **Authentication**: Google Sign-In integration with Firebase Auth
- **Photo Sharing**: Upload and share monochrome photography
- **Social Features**: Like and comment on photos
- **Responsive Design**: Mobile-first design with tablet and desktop support
- **Real-time Updates**: Firebase Firestore for data persistence
- **Accessibility**: ARIA labels and semantic HTML throughout

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workspace
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Google provider
   - Create a Firestore database
   - Get your Firebase config from Project Settings

4. Create environment variables:
```bash
# Create .env.local file with your Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
workspace/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with AuthProvider
│   ├── page.tsx           # Home page with photo feed
│   ├── upload/            # Create post page
│   └── profile/           # User profile page
├── components/            # Reusable UI components
│   ├── ui/               # Radix UI components
│   ├── auth-provider.tsx # Authentication context
│   ├── header.tsx        # App header with auth UI
│   ├── photo-card.tsx    # Individual photo display
│   └── ...
├── lib/                  # Utilities and Firebase config
│   ├── firebase.ts       # Firebase initialization
│   ├── hooks/            # Custom hooks
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Key Components

### Authentication
- `AuthProvider`: Context provider for Firebase authentication
- `useAuth`: Custom hook for auth state management
- `Header`: Navigation with login/logout functionality

### Photo Management
- `PhotoCard`: Individual photo display with like/comment functionality
- `CreatePostForm`: Form for uploading new photos
- `GalleryGrid`: Grid display for user photos

### Firebase Integration
- Real-time authentication state
- Firestore for post storage and retrieval
- Like persistence with optimistic updates

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Consistent formatting with Prettier
- Accessibility best practices
- Mobile-first responsive design

## Deployment

The app is ready for deployment on Vercel, Netlify, or any other platform that supports Next.js.

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred platform

## Contributing

1. Follow the existing code structure and patterns
2. Ensure all components are responsive and accessible
3. Add TypeScript types for all new components
4. Test on mobile, tablet, and desktop
5. Follow the .cursor-rules guidelines

## License

MIT License - see LICENSE file for details
