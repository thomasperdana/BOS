import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth as puterAuth, storage as puterStorage } from '../lib/puter';
import { UserProfile } from '../lib/types';

// Basic user info from Puter auth
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Extended user profile with additional information
interface ExtendedUserProfile extends UserProfile {
  // Additional fields specific to our application
  role: 'user' | 'moderator' | 'admin';
  lastActive: string;
}

interface AuthContextType {
  user: User | null;
  profile: ExtendedUserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
  syncUserData: () => Promise<boolean>;
  updateProfile: (updates: Partial<ExtendedUserProfile>) => Promise<boolean>;
  getUserRole: () => 'user' | 'moderator' | 'admin';
  isModerator: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ExtendedUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on initial render
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const isSignedIn = puterAuth.isSignedIn();

        if (isSignedIn) {
          const currentUser = puterAuth.getCurrentUser();

          if (currentUser) {
            setUser({
              id: currentUser.id,
              name: currentUser.name || 'User',
              email: currentUser.email || '',
              avatar: currentUser.avatar,
            });
          }
        }
      } catch (err) {
        setError(`Authentication check failed: ${err instanceof Error ? err.message : String(err)}`);
        console.error('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in with Puter
  const signIn = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const puterUser = await puterAuth.signIn();

      if (puterUser) {
        setUser({
          id: puterUser.id,
          name: puterUser.name || 'User',
          email: puterUser.email || '',
          avatar: puterUser.avatar,
        });

        // Load user data from cloud storage
        await syncUserData();

        return true;
      } else {
        setError('Sign in failed: No user returned');
        return false;
      }
    } catch (err) {
      setError(`Sign in failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Sign in error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await puterAuth.signOut();

      if (success) {
        setUser(null);
        return true;
      } else {
        setError('Sign out failed');
        return false;
      }
    } catch (err) {
      setError(`Sign out failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Sign out error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sync user data with cloud storage
  const syncUserData = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      // Load user profile from cloud storage
      const userProfile = await puterStorage.loadData(`user:${user.id}:profile`);

      if (userProfile) {
        setProfile(userProfile);
      } else {
        // Create default profile if none exists
        const defaultProfile: ExtendedUserProfile = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          joinDate: new Date().toISOString(),
          role: 'user',
          lastActive: new Date().toISOString(),
          preferences: {
            darkMode: false,
            fontSize: 16,
            emailNotifications: true,
            studyGroupNotifications: true
          },
          privacy: {
            showEmail: false,
            showSocialLinks: true,
            publicProfile: true
          }
        };

        await puterStorage.saveData(`user:${user.id}:profile`, defaultProfile);
        setProfile(defaultProfile);
      }

      // Apply preferences
      if (profile?.preferences) {
        // Apply dark mode
        if (profile.preferences.darkMode !== undefined) {
          document.documentElement.classList.toggle('dark', profile.preferences.darkMode);
          localStorage.setItem('bos-dark-mode', profile.preferences.darkMode.toString());
        }

        // Apply font size
        if (profile.preferences.fontSize) {
          localStorage.setItem('bos-font-size', profile.preferences.fontSize.toString());
        }
      }

      // Load bookmarks from cloud storage
      const bookmarks = await puterStorage.loadData(`user:${user.id}:bookmarks`);

      if (bookmarks) {
        localStorage.setItem('bos-bookmarks', JSON.stringify(bookmarks));
      }

      // Update last active timestamp
      if (profile) {
        await updateProfile({ lastActive: new Date().toISOString() });
      }

      return true;
    } catch (err) {
      console.error('Failed to sync user data:', err);
      return false;
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<ExtendedUserProfile>): Promise<boolean> => {
    if (!user || !profile) return false;

    try {
      const updatedProfile = { ...profile, ...updates };
      await puterStorage.saveData(`user:${user.id}:profile`, updatedProfile);
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      console.error('Failed to update profile:', err);
      return false;
    }
  };

  // Get user role
  const getUserRole = (): 'user' | 'moderator' | 'admin' => {
    return profile?.role || 'user';
  };

  // Check if user is a moderator
  const isModerator = (): boolean => {
    const role = getUserRole();
    return role === 'moderator' || role === 'admin';
  };

  // Check if user is an admin
  const isAdmin = (): boolean => {
    return getUserRole() === 'admin';
  };

  const value = {
    user,
    profile,
    isLoading,
    error,
    isAuthenticated: !!user,
    signIn,
    signOut,
    syncUserData,
    updateProfile,
    getUserRole,
    isModerator,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
