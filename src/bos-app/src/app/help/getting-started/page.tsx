import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { AuthProvider } from '../../../context/AuthContext';
import Link from 'next/link';
import Button from '../../../components/ui/Button';

export default function GettingStartedPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Getting Started with BOS</h1>
            <Link href="/help">
              <Button variant="outline">
                Back to Help
              </Button>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Welcome to the Bible Operating System</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Bible Operating System (BOS) is a comprehensive web application designed for Evangelical Christians to engage with the King James Version of the Bible. This guide will help you get started with the key features of BOS.
            </p>
            
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-md mb-6 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">Welcome Video</p>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Bible Reading:</strong> Access the complete King James Version Bible with intuitive navigation.</li>
              <li><strong>Study Tools:</strong> AI-powered tools for verse analysis, thematic exploration, and contextual insights.</li>
              <li><strong>Community:</strong> Connect with other believers through discussion forums, study groups, and prayer requests.</li>
              <li><strong>Facebook Integration:</strong> Share your Bible studies and insights with your Facebook groups.</li>
              <li><strong>Content Verification:</strong> All AI-generated content is verified for biblical accuracy against the King James Bible.</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Quick Start Guide</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">1. Create an Account</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click the "Sign In" button in the top right corner of the page. You can sign up using your Google account, Facebook account, or email address. Creating an account allows you to save your preferences, bookmarks, and participate in community features.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">2. Explore the Bible</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Navigate to the Bible page to start reading. You can select books, chapters, and verses using the navigation controls. Use the search function to find specific passages or topics. Bookmark verses for later reference.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">3. Use Study Tools</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visit the Study page to access AI-powered study tools. These include Verse Analysis for historical context and applications, Thematic Exploration for biblical themes, and Contextual Insights with historical and cultural information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">4. Join the Community</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Connect with other believers on the Community page. Join discussion forums, participate in study groups, and share prayer requests. You can also connect with Facebook groups to share your Bible studies and insights.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">5. Customize Your Experience</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Personalize your BOS experience by adjusting settings like font size, dark mode, and accessibility options. You can also manage your profile and privacy settings on the Profile page.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Navigation Guide</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Main Navigation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The main navigation menu is located at the top of every page. It provides access to the following sections:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 mt-2">
                  <li><strong>Home:</strong> The landing page with an overview of BOS features.</li>
                  <li><strong>Bible:</strong> Access the King James Version Bible for reading and study.</li>
                  <li><strong>Study:</strong> AI-powered Bible study tools and resources.</li>
                  <li><strong>Community:</strong> Connect with other believers and participate in discussions.</li>
                  <li><strong>Profile:</strong> Manage your account, preferences, and saved content.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Accessibility Menu</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The accessibility menu is available in the top right corner. It allows you to adjust font size, enable high contrast mode, and reduce motion for a more comfortable experience.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Dark Mode</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Toggle between light and dark mode using the sun/moon icon in the top right corner. Dark mode provides a more comfortable reading experience in low-light environments.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Next Steps</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Now that you're familiar with the basics, explore these resources to learn more about specific features:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/help/bible-reading" className="block">
                <Button variant="outline" className="w-full">Bible Reading Guide</Button>
              </Link>
              <Link href="/help/study-tools" className="block">
                <Button variant="outline" className="w-full">Study Tools Guide</Button>
              </Link>
              <Link href="/help/community" className="block">
                <Button variant="outline" className="w-full">Community Features</Button>
              </Link>
              <Link href="/help/accessibility" className="block">
                <Button variant="outline" className="w-full">Accessibility Features</Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
