import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { storage as puterStorage } from '../../lib/puter';
import { ModerationReport } from '../../lib/types';

interface ReportContentProps {
  contentType: 'post' | 'comment' | 'prayer-request' | 'shared-verse' | 'profile';
  contentId: string;
  contentPreview: string;
  onClose?: () => void;
}

const ReportContent: React.FC<ReportContentProps> = ({
  contentType,
  contentId,
  contentPreview,
  onClose
}) => {
  const { user, isAuthenticated } = useAuth();
  
  const [reason, setReason] = useState<'inappropriate' | 'spam' | 'offensive' | 'false-teaching' | 'other'>('inappropriate');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Handle report submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      setError('Please sign in to report content');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Create report object
      const report: ModerationReport = {
        id: Date.now().toString(),
        contentType,
        contentId,
        reportedBy: user.id,
        reportedAt: new Date().toISOString(),
        reason,
        details: details || undefined,
        status: 'pending'
      };
      
      // Load existing reports
      const existingReports = await puterStorage.loadData('moderation:reports') || [];
      
      // Add new report
      await puterStorage.saveData('moderation:reports', [report, ...existingReports]);
      
      setSuccess('Thank you for your report. Our moderation team will review it shortly.');
      setDetails('');
      
      // Close the report dialog if onClose is provided
      if (onClose) {
        setTimeout(onClose, 2000);
      }
    } catch (err) {
      console.error('Failed to submit report:', err);
      setError(`Failed to submit report: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Please sign in to report content.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Report Content</h2>
      
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
        <h3 className="text-md font-medium mb-2 dark:text-white">Content Being Reported:</h3>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md dark:text-gray-200">
          <p className="text-sm">{contentPreview.length > 200 ? `${contentPreview.substring(0, 200)}...` : contentPreview}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reason for Report
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value as any)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="inappropriate">Inappropriate Content</option>
            <option value="spam">Spam</option>
            <option value="offensive">Offensive Language</option>
            <option value="false-teaching">False Teaching</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Additional Details (Optional)
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="Please provide any additional details about why you're reporting this content..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          {onClose && (
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          Our moderation team will review this report and take appropriate action according to our 
          <a href="/community/guidelines" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
            community guidelines
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ReportContent;
