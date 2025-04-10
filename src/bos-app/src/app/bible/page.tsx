import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { AuthProvider } from '../../context/AuthContext';
import { BibleProvider } from '../../context/BibleContext';
import BibleReader from '../../components/bible/BibleReader';
import BibleSearch from '../../components/bible/BibleSearch';
import BibleBookmarks from '../../components/bible/BibleBookmarks';
import Link from 'next/link';

export default function BiblePage() {
  return (
    <AuthProvider>
      <BibleProvider>
        <MainLayout>
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">King James Bible</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Bible reader - takes up 2/3 of the space on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <BibleReader />
              </div>
            </div>

            {/* Sidebar with search and bookmarks - takes up 1/3 of the space */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <BibleSearch />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <BibleBookmarks />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2 dark:text-white">Study Tools</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Use our AI-powered study tools to gain deeper insights into the scripture.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/study">
                    <Button variant="primary" size="sm">AI Bible Study</Button>
                  </Link>
                  <Button variant="secondary" size="sm">Cross References</Button>
                  <Button variant="outline" size="sm">Share</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">About the King James Bible</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The King James Version (KJV), also known as the Authorized Version, is an English translation of the Christian Bible for the Church of England that was commissioned in 1604 and completed in 1611.
              </p>
              <p>
                The King James Version has been called "the most influential version of the most influential book in the world, in what is now its most influential language". It has been the standard Bible of the English-speaking world and has profoundly influenced English literature, language, and culture.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
      </BibleProvider>
    </AuthProvider>
  );
}
