import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { AuthProvider } from '../../context/AuthContext';
import FacebookConnect from '../../components/social/FacebookConnect';
import DiscussionForumList from '../../components/community/DiscussionForumList';
import StudyGroupList from '../../components/community/StudyGroupList';
import PrayerRequestList from '../../components/community/PrayerRequestList';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Community</h1>

          <div className="mb-8">
            <FacebookConnect />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Discussion Forums</h2>
              <DiscussionForumList />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Study Groups</h2>
              <StudyGroupList />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Prayer Requests</h2>
            <PrayerRequestList />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Community Guidelines</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our community is committed to respectful, Christ-centered discussions. All content is verified for biblical accuracy against the King James Version Bible.
            </p>
            <Link href="/community/guidelines">
              <Button variant="outline">Read Community Guidelines</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
