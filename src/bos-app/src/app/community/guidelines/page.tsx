import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { AuthProvider } from '../../../context/AuthContext';
import Link from 'next/link';
import Button from '../../../components/ui/Button';

export default function CommunityGuidelinesPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Community Guidelines</h1>
            <Link href="/community">
              <Button variant="outline">
                Back to Community
              </Button>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Bible Operating System (BOS) community exists to foster Christ-centered discussions, 
              Bible study, and spiritual growth. We aim to create a welcoming environment where believers 
              can connect, learn, and grow together in their faith.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our community is built on the foundation of the King James Version of the Bible, and all 
              content is verified for biblical accuracy against this standard.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Core Principles</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">1. Biblical Truth</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All discussions and content should align with the teachings of the Bible. We use the 
                  King James Version as our standard for biblical accuracy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">2. Respect and Kindness</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Treat all community members with respect and kindness, even in disagreement. Remember 
                  that we are all on a journey of faith and understanding.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">3. Edification</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Aim to build up and encourage others in their faith. Share insights, ask thoughtful 
                  questions, and provide supportive feedback.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">4. Privacy and Confidentiality</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Respect the privacy of others. Do not share personal information or prayer requests 
                  outside the community without permission.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">5. Humility</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Approach discussions with humility, recognizing that no one has perfect understanding. 
                  Be open to learning from others and growing in your faith.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Prohibited Content</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">1. False Teaching</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Content that contradicts clear biblical teachings or promotes unbiblical doctrines.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">2. Harassment and Bullying</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Any form of harassment, bullying, or personal attacks against community members.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">3. Inappropriate Content</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Profanity, explicit content, or discussions that are not appropriate for a Christian community.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">4. Spam and Solicitation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Unsolicited advertising, spam, or promotional content unrelated to the community's purpose.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold dark:text-white">5. Divisive Content</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Content that is intentionally divisive or designed to create conflict within the community.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Moderation</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our community is moderated by volunteers who are committed to maintaining a healthy and 
              edifying environment. Moderators may take the following actions:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Remove content that violates our guidelines</li>
              <li>Issue warnings to users who violate guidelines</li>
              <li>Temporarily restrict posting privileges for repeated violations</li>
              <li>Permanently remove users who consistently violate guidelines</li>
            </ul>
            
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              If you believe content violates our guidelines, please report it using the reporting feature. 
              Our moderation team will review all reports and take appropriate action.
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Our Commitment</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We are committed to creating a community that honors God and helps believers grow in their 
              faith. By participating in this community, you agree to abide by these guidelines and 
              contribute to a positive, Christ-centered environment.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              "Let no corrupt communication proceed out of your mouth, but that which is good to the use 
              of edifying, that it may minister grace unto the hearers." - Ephesians 4:29 (KJV)
            </p>
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
