import React, { useState } from 'react';
import Button from '../ui/Button';
import { storage as puterStorage } from '../../lib/puter';
import { trackFeatureUsage } from '../../lib/analytics';
import { useAuth } from '../../context/AuthContext';

interface FeedbackFormProps {
  feedbackType?: 'general' | 'feature' | 'bug' | 'content';
  featureName?: string;
  onClose?: () => void;
}

interface FeedbackData {
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
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  feedbackType = 'general',
  featureName,
  onClose,
}) => {
  const { user } = useAuth();
  
  const [type, setType] = useState<'general' | 'feature' | 'bug' | 'content'>(feedbackType);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message) {
      setError('Please provide feedback message');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create feedback object
      const feedbackData: FeedbackData = {
        id: Date.now().toString(),
        userId: user?.id || null,
        userEmail: email || user?.email || null,
        type,
        subject: subject || `${type.charAt(0).toUpperCase() + type.slice(1)} Feedback`,
        message,
        rating: rating || undefined,
        featureName: featureName || undefined,
        createdAt: new Date().toISOString(),
        status: 'new',
        browser: navigator.userAgent,
        device: getDeviceInfo(),
        url: window.location.href,
      };
      
      // Load existing feedback
      const existingFeedback = await puterStorage.loadData('feedback:all') || [];
      
      // Add new feedback
      await puterStorage.saveData('feedback:all', [feedbackData, ...existingFeedback]);
      
      // Track feedback submission in analytics
      trackFeatureUsage('feedback_submission', {
        feedback_type: type,
        has_rating: !!rating,
        feature_name: featureName || 'none',
      });
      
      // Reset form
      setSubject('');
      setMessage('');
      setRating(null);
      setSuccess(true);
      
      // Close form if onClose is provided
      if (onClose) {
        setTimeout(onClose, 3000);
      }
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      setError(`Failed to submit feedback: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let deviceType = 'Unknown';
    
    if (/Mobi|Android/i.test(userAgent)) {
      deviceType = 'Mobile';
    } else if (/iPad|Tablet/i.test(userAgent)) {
      deviceType = 'Tablet';
    } else {
      deviceType = 'Desktop';
    }
    
    return deviceType;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Share Your Feedback</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
          <p className="font-medium">Thank you for your feedback!</p>
          <p className="text-sm mt-1">Your input helps us improve the Bible Operating System.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Feedback Type
            </label>
            <select
              id="feedback-type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="general">General Feedback</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
              <option value="content">Content Feedback</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject (Optional)
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Brief description of your feedback"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Feedback
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Please share your thoughts, suggestions, or report an issue..."
              required
            />
          </div>
          
          {(type === 'general' || type === 'feature') && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rate Your Experience (Optional)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full focus:outline-none ${
                      rating === value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    aria-label={`Rate ${value} out of 5`}
                  >
                    {value}
                  </button>
                ))}
                {rating && (
                  <button
                    type="button"
                    onClick={() => setRating(null)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
          
          {!user && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Your email if you'd like us to respond"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                We'll only use your email to respond to your feedback.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            {onClose && (
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      )}
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          Your feedback helps us improve the Bible Operating System. We appreciate your input!
        </p>
      </div>
    </div>
  );
};

export default FeedbackForm;
