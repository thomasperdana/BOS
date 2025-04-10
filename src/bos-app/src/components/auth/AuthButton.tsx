import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const AuthButton: React.FC = () => {
  const { user, isAuthenticated, isLoading, error, signIn, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleSignIn = async () => {
    await signIn();
  };
  
  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };
  
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };
  
  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        <span className="animate-pulse">Loading...</span>
      </Button>
    );
  }
  
  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="hidden md:inline dark:text-white">{user.name}</span>
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 py-1">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium dark:text-white">{user.name}</p>
              {user.email && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Button variant="primary" onClick={handleSignIn}>
      Sign In
    </Button>
  );
};

export default AuthButton;
