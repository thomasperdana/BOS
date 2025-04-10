import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { AuthProvider } from '../../context/AuthContext';
import ProfileCard from '../../components/profile/ProfileCard';
import Link from 'next/link';
import Button from '../../components/ui/Button';

export default function ProfilePage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Profile</h1>
          
          <div className="mb-8">
            <ProfileCard />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Your Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium dark:text-white">Bible Reading</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track your reading progress
                    </p>
                  </div>
                  <Link href="/bible">
                    <Button variant="outline" size="sm">
                      Continue Reading
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium dark:text-white">Bookmarks</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View your saved verses
                    </p>
                  </div>
                  <Link href="/bible?tab=bookmarks">
                    <Button variant="outline" size="sm">
                      View Bookmarks
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium dark:text-white">Study Notes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Access your Bible study notes
                    </p>
                  </div>
                  <Link href="/study">
                    <Button variant="outline" size="sm">
                      View Notes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Community</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium dark:text-white">Study Groups</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your Bible study groups
                    </p>
                  </div>
                  <Link href="/community">
                    <Button variant="outline" size="sm">
                      View Groups
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium dark:text-white">Prayer Requests</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your prayer requests
                    </p>
                  </div>
                  <Link href="/community">
                    <Button variant="outline" size="sm">
                      View Prayers
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium dark:text-white">Shared Content</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Content you've shared with others
                    </p>
                  </div>
                  <Link href="/profile/shared">
                    <Button variant="outline" size="sm">
                      View Shared
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-white">Edit Profile</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update your profile information
                  </p>
                </div>
                <Link href="/profile/edit">
                  <Button variant="primary" size="sm">
                    Edit Profile
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-white">Privacy Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your privacy preferences
                  </p>
                </div>
                <Link href="/profile/privacy">
                  <Button variant="outline" size="sm">
                    Privacy Settings
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-white">Notification Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your notification preferences
                  </p>
                </div>
                <Link href="/profile/notifications">
                  <Button variant="outline" size="sm">
                    Notification Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
