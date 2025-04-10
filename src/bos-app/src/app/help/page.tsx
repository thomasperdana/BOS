import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { AuthProvider } from '../../context/AuthContext';
import Link from 'next/link';
import Button from '../../components/ui/Button';

export default function HelpPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Help & Documentation</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Getting Started</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/getting-started" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Introduction to BOS
                  </Link>
                </li>
                <li>
                  <Link href="/help/account-setup" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Account Setup
                  </Link>
                </li>
                <li>
                  <Link href="/help/navigation" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Navigating the App
                  </Link>
                </li>
                <li>
                  <Link href="/help/accessibility" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Accessibility Features
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Bible Features</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/bible-reading" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Reading the Bible
                  </Link>
                </li>
                <li>
                  <Link href="/help/search" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Searching Scripture
                  </Link>
                </li>
                <li>
                  <Link href="/help/bookmarks" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Using Bookmarks
                  </Link>
                </li>
                <li>
                  <Link href="/help/study-tools" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Study Tools
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Community</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/facebook-integration" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Facebook Integration
                  </Link>
                </li>
                <li>
                  <Link href="/help/discussion-forums" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Discussion Forums
                  </Link>
                </li>
                <li>
                  <Link href="/help/study-groups" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Study Groups
                  </Link>
                </li>
                <li>
                  <Link href="/help/prayer-requests" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Prayer Requests
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">What Bible version does BOS use?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BOS exclusively uses the King James Version (KJV) of the Bible, which is widely respected for its accuracy and historical significance.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">How do I create an account?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can create an account by clicking the "Sign In" button in the top right corner of the page. You can sign up using your Google account, Facebook account, or email address.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">Is BOS free to use?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, BOS is completely free to use. We believe in making Bible study tools accessible to everyone.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">How does the AI content verification work?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI content verification system cross-references all AI-generated content with the King James Bible to ensure biblical accuracy. It provides accuracy scores and identifies supporting and contradicting verses.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">Can I use BOS offline?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  BOS has limited offline functionality. The Bible reading features will work offline, but AI and community features require an internet connection.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Video Tutorials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Getting Started with BOS</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center">Video Tutorial</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Using AI Study Tools</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center">Video Tutorial</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Need More Help?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you can't find the answer to your question, please contact our support team. We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/help/contact">
                <Button variant="primary">Contact Support</Button>
              </Link>
              <Link href="/community">
                <Button variant="outline">Ask the Community</Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
