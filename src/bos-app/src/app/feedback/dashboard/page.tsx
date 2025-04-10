import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { AuthProvider } from '../../../context/AuthContext';
import FeedbackDashboard from '../../../components/feedback/FeedbackDashboard';
import Link from 'next/link';
import Button from '../../../components/ui/Button';

export default function FeedbackDashboardPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-6xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Feedback Dashboard</h1>
            <Link href="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <FeedbackDashboard />
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
