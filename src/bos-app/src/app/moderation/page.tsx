import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { AuthProvider } from '../../context/AuthContext';
import ModerationDashboard from '../../components/moderation/ModerationDashboard';
import Link from 'next/link';
import Button from '../../components/ui/Button';

export default function ModerationPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-6xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Moderation Dashboard</h1>
            <Link href="/community">
              <Button variant="outline">
                Back to Community
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <ModerationDashboard />
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
