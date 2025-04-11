"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

const ProfileEdit: React.FC = () => {
  const { profile, updateProfile, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    denomination: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      website: '',
    },
    privacy: {
      showEmail: false,
      showSocialLinks: true,
      publicProfile: true,
    },
    preferences: {
      darkMode: false,
      fontSize: 16,
      emailNotifications: true,
      studyGroupNotifications: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load profile data when component mounts
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        denomination: profile.denomination || '',
        socialLinks: {
          facebook: profile.socialLinks?.facebook || '',
          twitter: profile.socialLinks?.twitter || '',
          instagram: profile.socialLinks?.instagram || '',
          website: profile.socialLinks?.website || '',
        },
        privacy: {
          showEmail: profile.privacy?.showEmail || false,
          showSocialLinks: profile.privacy?.showSocialLinks || true,
          publicProfile: profile.privacy?.publicProfile || true,
        },
        preferences: {
          darkMode: profile.preferences?.darkMode || false,
          fontSize: profile.preferences?.fontSize || 16,
          emailNotifications: profile.preferences?.emailNotifications || true,
          studyGroupNotifications: profile.preferences?.studyGroupNotifications || true,
        },
      });
    }
  }, [profile]);

  if (!isAuthenticated || !profile) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Please sign in to edit your profile.
        </p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const success = await updateProfile({
        ...profile,
        name: formData.name,
        bio: formData.bio,
        denomination: formData.denomination,
        socialLinks: formData.socialLinks,
        privacy: formData.privacy,
        preferences: formData.preferences,
      });

      if (success) {
        setSuccessMessage('Profile updated successfully!');

        // Apply dark mode immediately if changed
        if (formData.preferences.darkMode !== profile.preferences?.darkMode) {
          document.documentElement.classList.toggle('dark', formData.preferences.darkMode);
        }

        // Apply font size immediately if changed
        if (formData.preferences.fontSize !== profile.preferences?.fontSize) {
          localStorage.setItem('bos-font-size', formData.preferences.fontSize.toString());
        }
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError(`Error updating profile: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Edit Profile</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-white">Basic Information</h3>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="denomination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Denomination
              </label>
              <select
                id="denomination"
                name="denomination"
                value={formData.denomination}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a denomination (optional)</option>
                <option value="Baptist">Baptist</option>
                <option value="Catholic">Catholic</option>
                <option value="Lutheran">Lutheran</option>
                <option value="Methodist">Methodist</option>
                <option value="Presbyterian">Presbyterian</option>
                <option value="Anglican/Episcopal">Anglican/Episcopal</option>
                <option value="Pentecostal">Pentecostal</option>
                <option value="Evangelical">Evangelical</option>
                <option value="Non-denominational">Non-denominational</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-white">Social Links</h3>

            <div>
              <label htmlFor="socialLinks.facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                id="socialLinks.facebook"
                name="socialLinks.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="socialLinks.twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Twitter URL
              </label>
              <input
                type="url"
                id="socialLinks.twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="socialLinks.instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                id="socialLinks.instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="socialLinks.website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Personal Website
              </label>
              <input
                type="url"
                id="socialLinks.website"
                name="socialLinks.website"
                value={formData.socialLinks.website}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-white">Privacy Settings</h3>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacy.showEmail"
                name="privacy.showEmail"
                checked={formData.privacy.showEmail}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="privacy.showEmail" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Show my email address to other users
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacy.showSocialLinks"
                name="privacy.showSocialLinks"
                checked={formData.privacy.showSocialLinks}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="privacy.showSocialLinks" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Show my social media links to other users
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacy.publicProfile"
                name="privacy.publicProfile"
                checked={formData.privacy.publicProfile}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="privacy.publicProfile" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Make my profile visible to all users
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-white">Preferences</h3>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="preferences.darkMode"
                name="preferences.darkMode"
                checked={formData.preferences.darkMode}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="preferences.darkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Use dark mode
              </label>
            </div>

            <div>
              <label htmlFor="preferences.fontSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Font Size (px)
              </label>
              <input
                type="number"
                id="preferences.fontSize"
                name="preferences.fontSize"
                value={formData.preferences.fontSize}
                onChange={handleInputChange}
                min={12}
                max={24}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="preferences.emailNotifications"
                name="preferences.emailNotifications"
                checked={formData.preferences.emailNotifications}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="preferences.emailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Receive email notifications
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="preferences.studyGroupNotifications"
                name="preferences.studyGroupNotifications"
                checked={formData.preferences.studyGroupNotifications}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="preferences.studyGroupNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Receive study group notifications
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
