import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import * as facebook from '../../lib/facebook';
import { storage as puterStorage } from '../../lib/puter';
import { FacebookGroup } from '../../lib/types';

interface ShareVerseProps {
  reference: string;
  text: string;
  onClose?: () => void;
}

const ShareVerse: React.FC<ShareVerseProps> = ({ reference, text, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [groups, setGroups] = useState<FacebookGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  
  // Load saved Facebook groups
  useEffect(() => {
    const loadGroups = async () => {
      if (!user) return;
      
      try {
        const savedGroups = await puterStorage.loadData(`user:${user.id}:facebook:groups`);
        
        if (savedGroups) {
          setGroups(savedGroups);
          if (savedGroups.length > 0) {
            setSelectedGroup(savedGroups[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load Facebook groups:', err);
        setError('Failed to load your connected Facebook groups');
      }
    };
    
    if (isAuthenticated) {
      loadGroups();
    }
  }, [isAuthenticated, user]);
  
  // Handle sharing to Facebook
  const handleShare = async () => {
    if (!selectedGroup) {
      setError('Please select a Facebook group');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Initialize Facebook SDK if needed
      await facebook.initFacebook();
      
      // Check login status
      const loginStatus = await facebook.checkLoginStatus();
      
      if (loginStatus.status !== 'connected') {
        // Login to Facebook if not already logged in
        await facebook.login();
      }
      
      // Share the verse
      await facebook.shareBibleVerse(selectedGroup, reference, text, notes);
      
      setSuccess('Verse shared successfully to Facebook!');
      setNotes('');
      
      // Save to shared verses history if user is authenticated
      if (isAuthenticated && user) {
        const sharedVerse = {
          id: Date.now().toString(),
          book: reference.split(' ')[0],
          chapter: parseInt(reference.split(' ')[1].split(':')[0]),
          verse: parseInt(reference.split(':')[1]),
          text,
          sharedBy: user.id,
          sharedAt: new Date().toISOString(),
          notes: notes || undefined,
          likes: [],
          comments: [],
        };
        
        // Load existing shared verses
        const existingSharedVerses = await puterStorage.loadData(`user:${user.id}:shared:verses`) || [];
        
        // Add new shared verse
        await puterStorage.saveData(`user:${user.id}:shared:verses`, [sharedVerse, ...existingSharedVerses]);
      }
      
      // Close the share dialog if onClose is provided
      if (onClose) {
        setTimeout(onClose, 2000);
      }
    } catch (err) {
      console.error('Failed to share verse:', err);
      setError(`Failed to share verse: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Please sign in to share Bible verses.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Share Verse</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
          {success}
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2 dark:text-white">Verse to Share:</h3>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md dark:text-gray-200">
          <p className="font-semibold">{reference}</p>
          <p>"{text}"</p>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Add Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add your thoughts or insights about this verse..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Share to Facebook Group
        </label>
        
        {groups.length === 0 ? (
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">
            <p>No Facebook groups connected. Please connect with Facebook groups first.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.location.href = '/community'}
            >
              Connect Facebook Groups
            </Button>
          </div>
        ) : (
          <select
            id="group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a Facebook group</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
      </div>
      
      <div className="flex justify-end space-x-3">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleShare}
          disabled={isLoading || groups.length === 0 || !selectedGroup}
        >
          {isLoading ? 'Sharing...' : 'Share to Facebook'}
        </Button>
      </div>
    </div>
  );
};

export default ShareVerse;
