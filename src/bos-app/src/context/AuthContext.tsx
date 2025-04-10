import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth as puterAuth, storage as puterStorage } from '../lib/puter';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
  syncUserData: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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
      // Load user preferences from cloud storage
      const preferences = await puterStorage.loadData(`user:${user.id}:preferences`);
      
      if (preferences) {
        // Apply preferences (e.g., dark mode, font size)
        if (preferences.darkMode !== undefined) {
          document.documentElement.classList.toggle('dark', preferences.darkMode);
          localStorage.setItem('bos-dark-mode', preferences.darkMode.toString());
        }
        
        if (preferences.fontSize) {
          localStorage.setItem('bos-font-size', preferences.fontSize.toString());
        }
      }
      
      // Load bookmarks from cloud storage
      const bookmarks = await puterStorage.loadData(`user:${user.id}:bookmarks`);
      
      if (bookmarks) {
        localStorage.setItem('bos-bookmarks', JSON.stringify(bookmarks));
      }
      
      return true;
    } catch (err) {
      console.error('Failed to sync user data:', err);
      return false;
    }
  };
  
  const value = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signIn,
    signOut,
    syncUserData,
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
