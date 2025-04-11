"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { storage as puterStorage } from '../../lib/puter';
import { ModerationReport } from '../../lib/types';

const ModerationDashboard: React.FC = () => {
  const { user, isAuthenticated, isModerator, isAdmin } = useAuth();

  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'actioned' | 'dismissed'>('pending');

  // Load reports when component mounts
  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const savedReports = await puterStorage.loadData('moderation:reports');

        if (savedReports) {
          setReports(savedReports);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error('Failed to load moderation reports:', err);
        setError('Failed to load moderation reports');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && (isModerator() || isAdmin())) {
      loadReports();
    }
  }, [isAuthenticated, isModerator, isAdmin]);

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

  // Handle report action
  const handleReportAction = async (reportId: string, action: 'reviewed' | 'actioned' | 'dismissed', notes?: string) => {
    if (!isAuthenticated || !(isModerator() || isAdmin())) {
      setError('You do not have permission to moderate content');
      return;
    }

    try {
      const reportToUpdate = reports.find(r => r.id === reportId);

      if (!reportToUpdate) {
        setError('Report not found');
        return;
      }

      // Update report status
      const updatedReport = {
        ...reportToUpdate,
        status: action,
        moderatorNotes: notes || reportToUpdate.moderatorNotes,
        reviewedBy: user?.id,
        reviewedAt: new Date().toISOString()
      };

      // Update reports list
      const updatedReports = reports.map(r => r.id === reportId ? updatedReport : r);

      // Save to storage
      await puterStorage.saveData('moderation:reports', updatedReports);

      // Update state
      setReports(updatedReports);

      // Show success message
      setError(`Report ${action} successfully`);
    } catch (err) {
      console.error('Failed to update report:', err);
      setError('Failed to update report');
    }
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  // Sort reports by date (newest first)
  const sortedReports = [...filteredReports].sort((a, b) =>
    new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
  );

  if (!isAuthenticated || !(isModerator() || isAdmin())) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          You do not have permission to access the moderation dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Moderation Dashboard</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Reports
          </Button>
          <Button
            variant={filter === 'pending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'reviewed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('reviewed')}
          >
            Reviewed
          </Button>
          <Button
            variant={filter === 'actioned' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('actioned')}
          >
            Actioned
          </Button>
          <Button
            variant={filter === 'dismissed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('dismissed')}
          >
            Dismissed
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading reports...</p>
        </div>
      ) : sortedReports.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No {filter === 'all' ? '' : filter} reports found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Report
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Content Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Reason
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
              {sortedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ID: {report.id.substring(0, 8)}...
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Reported: {formatDate(report.reportedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {report.contentType.replace('-', ' ')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {report.contentId.substring(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white capitalize">
                      {report.reason.replace('-', ' ')}
                    </div>
                    {report.details && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {report.details.length > 50 ? `${report.details.substring(0, 50)}...` : report.details}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : report.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : report.status === 'actioned'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>

                    {report.reviewedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(report.reviewedAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {report.status === 'pending' && (
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'reviewed')}
                        >
                          Mark Reviewed
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'actioned')}
                        >
                          Take Action
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'dismissed')}
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}

                    {report.status === 'reviewed' && (
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'actioned')}
                        >
                          Take Action
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'dismissed')}
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}

                    {(report.status === 'actioned' || report.status === 'dismissed') && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        No actions available
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
        <h3 className="text-md font-medium mb-2 dark:text-white">Moderation Guidelines</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          When reviewing reports, please refer to our
          <a href="/community/guidelines" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">
            community guidelines
          </a>
          to determine appropriate actions. All moderation actions should be fair, consistent, and aligned with our values.
        </p>
      </div>
    </div>
  );
};

export default ModerationDashboard;
