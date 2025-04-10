import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import { AuthProvider } from '../../context/AuthContext';

export default function CommunityPage() {
  return (
    <AuthProvider>
      <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Community</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3">Facebook Integration</h2>
          <p className="text-gray-600 mb-4">
            Connect with Facebook groups and other believers. Share your Bible studies and insights with your community.
          </p>
          <div className="flex gap-3">
            <Button variant="primary">Connect with Facebook</Button>
            <Button variant="outline">View Connected Groups</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Discussion Forums</h2>
            <p className="text-gray-600 mb-4">
              Join discussions on various Bible topics and connect with other believers.
            </p>
            <div className="space-y-3 mb-4">
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Understanding Revelation</h3>
                <p className="text-sm text-gray-600">32 participants · 128 messages</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Daily Devotionals</h3>
                <p className="text-sm text-gray-600">87 participants · 342 messages</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Prayer Requests</h3>
                <p className="text-sm text-gray-600">156 participants · 513 messages</p>
              </div>
            </div>
            <Button variant="secondary">View All Forums</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Study Groups</h2>
            <p className="text-gray-600 mb-4">
              Join or create Bible study groups to grow together in faith.
            </p>
            <div className="space-y-3 mb-4">
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium">New Believers Group</h3>
                <p className="text-sm text-gray-600">Meets every Monday · 18 members</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Psalms Deep Dive</h3>
                <p className="text-sm text-gray-600">Meets every Wednesday · 24 members</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <h3 className="font-medium">Apologetics Study</h3>
                <p className="text-sm text-gray-600">Meets every Friday · 15 members</p>
              </div>
            </div>
            <Button variant="secondary">View All Groups</Button>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Community Guidelines</h2>
          <p className="text-gray-700 mb-4">
            Our community is committed to respectful, Christ-centered discussions. All content is verified for biblical accuracy against the King James Version Bible.
          </p>
          <Button variant="outline">Read Community Guidelines</Button>
        </div>
      </div>
    </MainLayout>
    </AuthProvider>
  );
}
