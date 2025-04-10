import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import { AuthProvider } from '../../../context/AuthContext';
import ProfileEdit from '../../../components/profile/ProfileEdit';
import Link from 'next/link';
import Button from '../../../components/ui/Button';

export default function ProfileEditPage() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold dark:text-white">Edit Profile</h1>
            <Link href="/profile">
              <Button variant="outline">
                Back to Profile
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <ProfileEdit />
          </div>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
