import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { AuthProvider } from '../../context/AuthContext';
import { BibleProvider } from '../../context/BibleContext';
import VerseAnalysis from '../../components/ai/VerseAnalysis';
import ThematicExploration from '../../components/ai/ThematicExploration';
import ContextualInsights from '../../components/ai/ContextualInsights';
import ContentVerification from '../../components/ai/ContentVerification';

export default function StudyPage() {
  return (
    <AuthProvider>
      <BibleProvider>
        <MainLayout>
          <div className="max-w-6xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Bible Study Tools</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <VerseAnalysis />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <ThematicExploration />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <ContextualInsights />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <ContentVerification />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">AI-Powered Bible Study</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our AI-powered Bible study tools use advanced technology to help you gain deeper insights into the scriptures. All content is verified for biblical accuracy by cross-referencing with the King James Version Bible.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Sign in</strong> to access these powerful tools and enhance your Bible study experience.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md">Learn More About Our AI Technology</Button>
                <Button variant="secondary" size="md">View Our Verification Process</Button>
              </div>
            </div>
          </div>
        </MainLayout>
      </BibleProvider>
    </AuthProvider>
  );
}
