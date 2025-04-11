"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Link from 'next/link';
import { storage as puterStorage } from '../../lib/puter';
import { PrayerRequest } from '../../lib/types';

const PrayerRequestList: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'prayers' | 'praises'>('all');

  // Load prayer requests when component mounts
  useEffect(() => {
    const loadPrayerRequests = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, we would fetch prayer requests from a database
        // For now, we'll use Puter.js storage
        const savedRequests = await puterStorage.loadData('community:prayer-requests');

        if (savedRequests) {
          setPrayerRequests(savedRequests);
        } else {
          // Create default prayer requests if none exist
          const defaultRequests: PrayerRequest[] = [
            {
              id: '1',
              title: 'Prayer for Healing',
              content: 'Please pray for my mother who is recovering from surgery.',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isAnonymous: false,
              isPraisePrayer: false,
              prayerCount: 5,
              usersPrayed: [],
              isAnswered: false
            },
            {
              id: '2',
              title: 'Praise for New Job',
              content: 'Giving thanks to God for providing a new job after months of searching!',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isAnonymous: false,
              isPraisePrayer: true,
              prayerCount: 3,
              usersPrayed: [],
              isAnswered: true,
              answerTestimony: 'God provided a job that is even better than I hoped for!'
            },
            {
              id: '3',
              title: 'Prayer for Guidance',
              content: 'I need wisdom for an important decision about my future.',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isAnonymous: true,
              isPraisePrayer: false,
              prayerCount: 7,
              usersPrayed: [],
              isAnswered: false
            }
          ];

          await puterStorage.saveData('community:prayer-requests', defaultRequests);
          setPrayerRequests(defaultRequests);
        }
      } catch (err) {
        console.error('Failed to load prayer requests:', err);
        setError('Failed to load prayer requests');
      } finally {
        setIsLoading(false);
      }
    };

    loadPrayerRequests();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle praying for a request
  const handlePray = async (requestId: string) => {
    if (!isAuthenticated || !user) {
      setError('Please sign in to pray for requests');
      return;
    }

    try {
      const requestToPrayFor = prayerRequests.find(r => r.id === requestId);

      if (!requestToPrayFor) {
        setError('Prayer request not found');
        return;
      }

      // Check if user has already prayed
      if (requestToPrayFor.usersPrayed.includes(user.id)) {
        setError('You have already prayed for this request');
        return;
      }

      // Update prayer count and users prayed
      const updatedRequest = {
        ...requestToPrayFor,
        prayerCount: requestToPrayFor.prayerCount + 1,
        usersPrayed: [...requestToPrayFor.usersPrayed, user.id]
      };

      // Update prayer requests list
      const updatedRequests = prayerRequests.map(r => r.id === requestId ? updatedRequest : r);

      // Save to storage
      await puterStorage.saveData('community:prayer-requests', updatedRequests);

      // Update state
      setPrayerRequests(updatedRequests);

      // Show success message
      setError('Thank you for praying!');
    } catch (err) {
      console.error('Failed to pray for request:', err);
      setError('Failed to record your prayer');
    }
  };

  // Filter prayer requests
  const filteredRequests = prayerRequests.filter(request => {
    if (filter === 'all') return true;
    if (filter === 'prayers') return !request.isPraisePrayer;
    if (filter === 'praises') return request.isPraisePrayer;
    return true;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Prayer Requests</h2>

        {isAuthenticated && (
          <Link href="/community/prayer/new">
            <Button variant="primary" size="sm">
              New Prayer Request
            </Button>
          </Link>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'prayers' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('prayers')}
          >
            Prayer Requests
          </Button>
          <Button
            variant={filter === 'praises' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('praises')}
          >
            Praises
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading prayer requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No prayer requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const hasPrayed = user && request.usersPrayed.includes(user.id);

            return (
              <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      {request.isPraisePrayer ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 mr-2">
                          Praise
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mr-2">
                          Prayer
                        </span>
                      )}
                      <Link href={`/community/prayer/${request.id}`}>
                        <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          {request.title}
                        </h3>
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {request.content.length > 150
                        ? `${request.content.substring(0, 150)}...`
                        : request.content}
                    </p>
                  </div>

                  {isAuthenticated && !hasPrayed && !request.isPraisePrayer && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePray(request.id)}
                    >
                      Pray
                    </Button>
                  )}

                  {hasPrayed && !request.isPraisePrayer && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Prayed
                    </span>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      {request.isAnonymous ? 'Anonymous' : 'User'} • {formatDate(request.createdAt)}
                    </span>
                    {!request.isPraisePrayer && (
                      <span className="text-gray-600 dark:text-gray-400">
                        {request.prayerCount} {request.prayerCount === 1 ? 'prayer' : 'prayers'}
                      </span>
                    )}
                  </div>

                  {request.isAnswered && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Answered
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-md font-medium mb-2 dark:text-white">About Prayer Requests</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Share your prayer requests and praises with the community. When you pray for someone's request,
          they will be notified that someone has prayed for them. Let's support one another in prayer!
        </p>
      </div>
    </div>
  );
};

export default PrayerRequestList;
