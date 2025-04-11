"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import * as facebook from '../../lib/facebook';
import { FacebookGroup } from '../../lib/types';
import { storage as puterStorage } from '../../lib/puter';

const FacebookConnect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<FacebookGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Initialize Facebook SDK
  useEffect(() => {
    const init = async () => {
      try {
        await facebook.initFacebook();
        setIsInitialized(true);

        // Check login status
        const loginStatus = await facebook.checkLoginStatus();
        setIsLoggedIn(loginStatus.status === 'connected');

        if (loginStatus.status === 'connected' && isAuthenticated) {
          loadGroups();
        }
      } catch (err) {
        console.error('Failed to initialize Facebook:', err);
        setError('Failed to initialize Facebook integration');
      }
    };

    init();
  }, [isAuthenticated]);

  // Load saved groups when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadSavedGroups();
    }
  }, [isAuthenticated, user]);

  // Load user's Facebook groups
  const loadGroups = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userGroups = await facebook.getUserGroups();
      setGroups(userGroups);
    } catch (err) {
      console.error('Failed to load Facebook groups:', err);
      setError('Failed to load your Facebook groups');
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved groups from storage
  const loadSavedGroups = async () => {
    if (!user) return;

    try {
      const savedGroups = await puterStorage.loadData(`user:${user.id}:facebook:groups`);

      if (savedGroups) {
        setSelectedGroups(savedGroups.map((group: FacebookGroup) => group.id));

        // Merge saved groups with any new groups
        if (groups.length > 0) {
          const mergedGroups = [...groups];

          savedGroups.forEach((savedGroup: FacebookGroup) => {
            const existingIndex = mergedGroups.findIndex(g => g.id === savedGroup.id);

            if (existingIndex === -1) {
              mergedGroups.push(savedGroup);
            }
          });

          setGroups(mergedGroups);
        } else {
          setGroups(savedGroups);
        }
      }
    } catch (err) {
      console.error('Failed to load saved Facebook groups:', err);
    }
  };

  // Handle Facebook login
  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await facebook.login();
      setIsLoggedIn(response.status === 'connected');

      if (response.status === 'connected') {
        await loadGroups();
      }
    } catch (err) {
      console.error('Facebook login failed:', err);
      setError('Failed to login to Facebook');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Facebook logout
  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await facebook.logout();
      setIsLoggedIn(false);
      setGroups([]);
      setSelectedGroups([]);
    } catch (err) {
      console.error('Facebook logout failed:', err);
      setError('Failed to logout from Facebook');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle group selection
  const handleGroupSelection = (groupId: string) => {
    setSelectedGroups(prev => {
      if (prev.includes(groupId)) {
        return prev.filter(id => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  // Save selected groups
  const saveSelectedGroups = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const selectedGroupsData = groups.filter(group => selectedGroups.includes(group.id));
      await puterStorage.saveData(`user:${user.id}:facebook:groups`, selectedGroupsData);
      setError('Groups saved successfully!');
    } catch (err) {
      console.error('Failed to save selected groups:', err);
      setError('Failed to save selected groups');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Please sign in to connect with Facebook.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Facebook Integration</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}

      {!isInitialized ? (
        <p className="text-gray-600 dark:text-gray-400">Initializing Facebook integration...</p>
      ) : !isLoggedIn ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Connect with Facebook to share Bible verses and studies with your groups.
          </p>
          <Button
            variant="primary"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect with Facebook'}
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-green-600 dark:text-green-400">
              <span className="inline-block w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-2"></span>
              Connected to Facebook
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Disconnect
            </Button>
          </div>

          <h3 className="text-lg font-medium mb-2 dark:text-white">Your Facebook Groups</h3>

          {isLoading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading your groups...</p>
          ) : groups.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No Facebook groups found. Make sure you've joined some groups on Facebook.
            </p>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Select the groups you want to connect with:
              </p>

              <div className="space-y-2 mb-4">
                {groups.map(group => (
                  <div key={group.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => handleGroupSelection(group.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`group-${group.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {group.name}
                    </label>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                onClick={saveSelectedGroups}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Selected Groups'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacebookConnect;
