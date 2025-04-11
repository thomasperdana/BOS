"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Link from 'next/link';
import { storage as puterStorage } from '../../lib/puter';
import { DiscussionForum } from '../../lib/types';

const DiscussionForumList: React.FC = () => {
  const { user, isAuthenticated, isModerator } = useAuth();

  const [forums, setForums] = useState<DiscussionForum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load forums when component mounts
  useEffect(() => {
    const loadForums = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, we would fetch forums from a database
        // For now, we'll use Puter.js storage
        const savedForums = await puterStorage.loadData('community:forums');

        if (savedForums) {
          setForums(savedForums);
        } else {
          // Create default forums if none exist
          const defaultForums: DiscussionForum[] = [
            {
              id: '1',
              name: 'Bible Study',
              description: 'Discuss Bible passages and their interpretations',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              topics: [],
              category: 'bible-study',
              isPrivate: false
            },
            {
              id: '2',
              name: 'Prayer Requests',
              description: 'Share and respond to prayer requests',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              topics: [],
              category: 'prayer',
              isPrivate: false
            },
            {
              id: '3',
              name: 'Testimonies',
              description: 'Share how God has worked in your life',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              topics: [],
              category: 'testimonies',
              isPrivate: false
            },
            {
              id: '4',
              name: 'Theology Discussion',
              description: 'Discuss theological concepts and doctrines',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              topics: [],
              category: 'theology',
              isPrivate: false
            },
            {
              id: '5',
              name: 'General Discussion',
              description: 'General conversation about faith and life',
              createdBy: 'system',
              createdAt: new Date().toISOString(),
              topics: [],
              category: 'general',
              isPrivate: false
            }
          ];

          await puterStorage.saveData('community:forums', defaultForums);
          setForums(defaultForums);
        }
      } catch (err) {
        console.error('Failed to load forums:', err);
        setError('Failed to load discussion forums');
      } finally {
        setIsLoading(false);
      }
    };

    loadForums();
  }, []);

  // Filter forums by category
  const filteredForums = selectedCategory === 'all'
    ? forums
    : forums.filter(forum => forum.category === selectedCategory);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get topic count for a forum
  const getTopicCount = (forum: DiscussionForum) => {
    return forum.topics.length;
  };

  // Get latest activity date for a forum
  const getLatestActivity = (forum: DiscussionForum) => {
    if (forum.topics.length === 0) {
      return forum.createdAt;
    }

    // Find the most recent post in any topic
    let latestDate = forum.createdAt;

    forum.topics.forEach(topic => {
      if (topic.updatedAt > latestDate) {
        latestDate = topic.updatedAt;
      }

      topic.posts.forEach(post => {
        if (post.createdAt > latestDate) {
          latestDate = post.createdAt;
        }
      });
    });

    return latestDate;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Discussion Forums</h2>

        {isAuthenticated && isModerator() && (
          <Link href="/community/forums/new">
            <Button variant="primary" size="sm">
              Create Forum
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
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="bible-study">Bible Study</option>
          <option value="theology">Theology</option>
          <option value="prayer">Prayer</option>
          <option value="testimonies">Testimonies</option>
          <option value="general">General</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading forums...</p>
        </div>
      ) : filteredForums.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No forums found in this category.</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Forum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Topics
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Latest Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredForums.map((forum) => (
                <tr key={forum.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <Link href={`/community/forums/${forum.id}`} className="block">
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        {forum.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {forum.description}
                      </div>
                      <div className="md:hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {getTopicCount(forum)} topics · Last active {formatDate(getLatestActivity(forum))}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getTopicCount(forum)}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(getLatestActivity(forum))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-md font-medium mb-2 dark:text-white">Community Guidelines</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Our community is committed to respectful, Christ-centered discussions. Please be kind and considerate in all interactions.
          All content is subject to moderation to ensure it aligns with biblical principles.
        </p>
      </div>
    </div>
  );
};

export default DiscussionForumList;
