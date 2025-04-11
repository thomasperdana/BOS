/**
 * Type definitions for the BOS application
 */

// User profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  denomination?: string;
  joinDate: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  preferences: {
    darkMode: boolean;
    fontSize: number;
    emailNotifications: boolean;
    studyGroupNotifications: boolean;
  };
  privacy: {
    showEmail: boolean;
    showSocialLinks: boolean;
    publicProfile: boolean;
  };
}

// Study group
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  createdBy: string; // User ID
  createdAt: string;
  members: string[]; // User IDs
  admins: string[]; // User IDs
  meetingSchedule?: {
    day: string;
    time: string;
    frequency: 'weekly' | 'biweekly' | 'monthly';
    timezone: string;
  };
  currentStudy?: {
    book?: string;
    chapter?: number;
    theme?: string;
  };
  isPrivate: boolean;
  requiresApproval: boolean;
}

// Discussion forum
export interface DiscussionForum {
  id: string;
  name: string;
  description: string;
  createdBy: string; // User ID
  createdAt: string;
  topics: DiscussionTopic[];
  category: 'bible-study' | 'theology' | 'prayer' | 'testimonies' | 'general';
  isPrivate: boolean;
}

// Discussion topic
export interface DiscussionTopic {
  id: string;
  title: string;
  content: string;
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
  posts: DiscussionPost[];
  isPinned: boolean;
  isLocked: boolean;
  views: number;
}

// Discussion post
export interface DiscussionPost {
  id: string;
  content: string;
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
  likes: string[]; // User IDs
  isEdited: boolean;
  quotedPostId?: string;
  attachments?: {
    type: 'image' | 'link' | 'verse';
    content: string;
  }[];
}

// Prayer request
export interface PrayerRequest {
  id: string;
  title: string;
  content: string;
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  isPraisePrayer: boolean;
  prayerCount: number;
  usersPrayed: string[]; // User IDs
  isAnswered: boolean;
  answerTestimony?: string;
}

// Shared verse
export interface SharedVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  sharedBy: string; // User ID
  sharedAt: string;
  notes?: string;
  likes: string[]; // User IDs
  comments: {
    id: string;
    content: string;
    createdBy: string; // User ID
    createdAt: string;
  }[];
}

// Facebook integration
export interface FacebookGroup {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  isConnected: boolean;
  lastSyncTime?: string;
  permissions: {
    canPost: boolean;
    canComment: boolean;
    canReadFeed: boolean;
  };
}

// Notification
export interface Notification {
  id: string;
  type: 'mention' | 'reply' | 'like' | 'group-invite' | 'prayer-request' | 'system';
  content: string;
  createdAt: string;
  isRead: boolean;
  linkTo?: string; // URL to navigate to when clicked
  fromUser?: string; // User ID
}

// Content moderation report
export interface ModerationReport {
  id: string;
  contentType: 'post' | 'comment' | 'prayer-request' | 'shared-verse' | 'profile';
  contentId: string;
  reportedBy: string; // User ID
  reportedAt: string;
  reason: 'inappropriate' | 'spam' | 'offensive' | 'false-teaching' | 'other';
  details?: string;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  moderatorNotes?: string;
  reviewedBy?: string; // User ID
  reviewedAt?: string;
}

// User role
export type UserRole = 'user' | 'moderator' | 'admin';
