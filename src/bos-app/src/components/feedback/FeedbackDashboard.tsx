"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { storage as puterStorage } from '../../lib/puter';

interface FeedbackItem {
  id: string;
  userId: string | null;
  userEmail: string | null;
  type: string;
  subject: string;
  message: string;
  rating?: number;
  featureName?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'responded' | 'closed';
  browser: string;
  device: string;
  url: string;
  response?: {
    message: string;
    respondedBy: string;
    respondedAt: string;
  };
}

const FeedbackDashboard: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'responded' | 'closed'>('new');
  const [typeFilter, setTypeFilter] = useState<'all' | 'general' | 'feature' | 'bug' | 'content'>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [responseText, setResponseText] = useState('');

  // Load feedback when component mounts
  useEffect(() => {
    const loadFeedback = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const savedFeedback = await puterStorage.loadData('feedback:all');

        if (savedFeedback) {
          setFeedback(savedFeedback);
        } else {
          setFeedback([]);
        }
      } catch (err) {
        console.error('Failed to load feedback:', err);
        setError('Failed to load feedback');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && isAdmin()) {
      loadFeedback();
    }
  }, [isAuthenticated, isAdmin]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle feedback status update
  const handleStatusUpdate = async (feedbackId: string, newStatus: 'new' | 'reviewed' | 'responded' | 'closed') => {
    if (!isAuthenticated || !isAdmin()) {
      setError('You do not have permission to update feedback status');
      return;
    }

    try {
      const feedbackToUpdate = feedback.find(f => f.id === feedbackId);

      if (!feedbackToUpdate) {
        setError('Feedback not found');
        return;
      }

      // Update feedback status
      const updatedFeedback = {
        ...feedbackToUpdate,
        status: newStatus,
      };

      // Update feedback list
      const updatedFeedbackList = feedback.map(f => f.id === feedbackId ? updatedFeedback : f);

      // Save to storage
      await puterStorage.saveData('feedback:all', updatedFeedbackList);

      // Update state
      setFeedback(updatedFeedbackList);

      // Show success message
      setError(`Feedback marked as ${newStatus}`);
    } catch (err) {
      console.error('Failed to update feedback status:', err);
      setError('Failed to update feedback status');
    }
  };

  // Handle feedback response
  const handleSendResponse = async () => {
    if (!selectedFeedback) return;

    if (!responseText.trim()) {
      setError('Please enter a response message');
      return;
    }

    try {
      // Create response object
      const response = {
        message: responseText,
        respondedBy: user?.id || 'admin',
        respondedAt: new Date().toISOString(),
      };

      // Update feedback with response
      const updatedFeedback = {
        ...selectedFeedback,
        status: 'responded' as const,
        response,
      };

      // Update feedback list
      const updatedFeedbackList = feedback.map(f => f.id === selectedFeedback.id ? updatedFeedback : f);

      // Save to storage
      await puterStorage.saveData('feedback:all', updatedFeedbackList);

      // Update state
      setFeedback(updatedFeedbackList);
      setSelectedFeedback(null);
      setResponseText('');

      // Show success message
      setError('Response sent successfully');
    } catch (err) {
      console.error('Failed to send response:', err);
      setError('Failed to send response');
    }
  };

  // Filter feedback
  const filteredFeedback = feedback.filter(item => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    return true;
  });

  // Sort feedback by date (newest first)
  const sortedFeedback = [...filteredFeedback].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!isAuthenticated || !isAdmin()) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          You do not have permission to access the feedback dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Feedback Dashboard</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 overflow-x-auto pb-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status Filter
            </label>
            <div className="flex space-x-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'new' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('new')}
              >
                New
              </Button>
              <Button
                variant={filter === 'reviewed' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('reviewed')}
              >
                Reviewed
              </Button>
              <Button
                variant={filter === 'responded' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('responded')}
              >
                Responded
              </Button>
              <Button
                variant={filter === 'closed' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('closed')}
              >
                Closed
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type Filter
            </label>
            <div className="flex space-x-2">
              <Button
                variant={typeFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
              >
                All Types
              </Button>
              <Button
                variant={typeFilter === 'general' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('general')}
              >
                General
              </Button>
              <Button
                variant={typeFilter === 'feature' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('feature')}
              >
                Feature
              </Button>
              <Button
                variant={typeFilter === 'bug' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('bug')}
              >
                Bug
              </Button>
              <Button
                variant={typeFilter === 'content' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('content')}
              >
                Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading feedback...</p>
        </div>
      ) : sortedFeedback.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No {filter === 'all' ? '' : filter} feedback found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Feedback
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedFeedback.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.subject}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.message.length > 100 ? `${item.message.substring(0, 100)}...` : item.message}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(item.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'bug'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : item.type === 'feature'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : item.type === 'content'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>

                    {item.rating && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Rating: {item.rating}/5
                      </div>
                    )}

                    {item.featureName && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Feature: {item.featureName}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {item.userEmail || 'Anonymous'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.device}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'new'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : item.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : item.status === 'responded'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>

                    {item.response && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Responded: {formatDate(item.response.respondedAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFeedback(item)}
                      >
                        View Details
                      </Button>

                      {item.status === 'new' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(item.id, 'reviewed')}
                        >
                          Mark Reviewed
                        </Button>
                      )}

                      {(item.status === 'new' || item.status === 'reviewed') && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedFeedback(item)}
                        >
                          Respond
                        </Button>
                      )}

                      {item.status !== 'closed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(item.id, 'closed')}
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold dark:text-white">Feedback Details</h3>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</p>
                <p className="text-base font-medium dark:text-white">{selectedFeedback.subject}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                <p className="text-base dark:text-white capitalize">{selectedFeedback.type}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                <p className="text-base dark:text-white capitalize">{selectedFeedback.status}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted</p>
                <p className="text-base dark:text-white">{formatDate(selectedFeedback.createdAt)}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User</p>
                <p className="text-base dark:text-white">{selectedFeedback.userEmail || 'Anonymous'}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Device</p>
                <p className="text-base dark:text-white">{selectedFeedback.device}</p>
              </div>

              {selectedFeedback.rating && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</p>
                  <p className="text-base dark:text-white">{selectedFeedback.rating}/5</p>
                </div>
              )}

              {selectedFeedback.featureName && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Feature</p>
                  <p className="text-base dark:text-white">{selectedFeedback.featureName}</p>
                </div>
              )}

              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">URL</p>
                <p className="text-base dark:text-white break-all">{selectedFeedback.url}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Message</p>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md dark:text-white">
                <p className="whitespace-pre-wrap">{selectedFeedback.message}</p>
              </div>
            </div>

            {selectedFeedback.response && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Response</p>
                <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-md dark:text-white">
                  <p className="whitespace-pre-wrap">{selectedFeedback.response.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Responded on {formatDate(selectedFeedback.response.respondedAt)}
                  </p>
                </div>
              </div>
            )}

            {(selectedFeedback.status === 'new' || selectedFeedback.status === 'reviewed') && (
              <div className="mb-4">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Response
                </label>
                <textarea
                  id="response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your response to this feedback..."
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setSelectedFeedback(null)}
              >
                Close
              </Button>

              {(selectedFeedback.status === 'new' || selectedFeedback.status === 'reviewed') && (
                <Button
                  variant="primary"
                  onClick={handleSendResponse}
                  disabled={!responseText.trim()}
                >
                  Send Response
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-md font-medium mb-2 dark:text-white">Feedback Guidelines</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          When responding to feedback, please be respectful, helpful, and concise. Address the user's concerns directly and provide clear next steps if applicable. All responses should align with our community guidelines.
        </p>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
