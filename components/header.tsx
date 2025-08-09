"use client"

import { useAuthContext } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

/**
 * Header component with authentication UI
 * Shows login/logout state and user avatar when logged in
 */
export function Header() {
  const { user, loading, signIn, signOut, isAuthenticated } = useAuthContext();

  const handleAuthAction = async () => {
    try {
      if (isAuthenticated) {
        await signOut();
      } else {
        await signIn();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-10 -mx-4 mb-2 border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-black">
          PixelPals
        </h1>
        
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 ring-1 ring-black/10">
                <AvatarImage 
                  src={user?.photoURL || undefined} 
                  alt={user?.displayName || 'User avatar'} 
                />
                <AvatarFallback>
                  {user?.displayName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthAction}
                className="text-black hover:text-emerald-600"
                aria-label="Sign out"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuthAction}
              className="text-black hover:text-emerald-600"
              aria-label="Sign in with Google"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
