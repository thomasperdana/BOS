"use client";

import { env } from './env';
import { FacebookGroup } from './types';

/**
 * Facebook integration utility
 * Provides functions for connecting with Facebook groups and sharing content
 */

// Initialize Facebook SDK
export const initFacebook = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Facebook SDK can only be initialized in browser environment'));
      return;
    }

    // Check if Facebook SDK is already loaded
    if ((window as any).FB) {
      resolve();
      return;
    }

    // Load Facebook SDK
    (window as any).fbAsyncInit = function() {
      (window as any).FB.init({
        appId: env.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });

      resolve();
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
};

// Check if user is logged in to Facebook
export const checkLoginStatus = (): Promise<{ status: string; authResponse: any }> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    (window as any).FB.getLoginStatus(function(response: any) {
      resolve(response);
    });
  });
};

// Login to Facebook
export const login = (): Promise<{ status: string; authResponse: any }> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    (window as any).FB.login(function(response: any) {
      if (response.authResponse) {
        resolve(response);
      } else {
        reject(new Error('User cancelled login or did not fully authorize'));
      }
    }, { scope: 'public_profile,email,groups_access_member_info,publish_to_groups' });
  });
};

// Logout from Facebook
export const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    (window as any).FB.logout(function(response: any) {
      resolve();
    });
  });
};

// Get user's Facebook groups
export const getUserGroups = (): Promise<FacebookGroup[]> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    (window as any).FB.api('/me/groups', function(response: any) {
      if (response.error) {
        reject(new Error(response.error.message));
        return;
      }

      const groups: FacebookGroup[] = response.data.map((group: any) => ({
        id: group.id,
        name: group.name,
        description: group.description || '',
        memberCount: 0, // Facebook API doesn't provide this directly
        isConnected: true,
        permissions: {
          canPost: true, // We'll assume true initially
          canComment: true,
          canReadFeed: true
        }
      }));

      resolve(groups);
    });
  });
};

// Get group details
export const getGroupDetails = (groupId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    (window as any).FB.api(`/${groupId}`, function(response: any) {
      if (response.error) {
        reject(new Error(response.error.message));
        return;
      }

      resolve(response);
    });
  });
};

// Post to a Facebook group
export const postToGroup = (groupId: string, message: string, link?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    const postData: any = { message };

    if (link) {
      postData.link = link;
    }

    (window as any).FB.api(`/${groupId}/feed`, 'POST', postData, function(response: any) {
      if (response.error) {
        reject(new Error(response.error.message));
        return;
      }

      resolve(response);
    });
  });
};

// Share Bible verse to Facebook
export const shareBibleVerse = (
  groupId: string,
  reference: string,
  text: string,
  notes?: string
): Promise<any> => {
  const message = `${reference}\n\n"${text}"\n\n${notes ? `${notes}\n\n` : ''}Shared via Bible Operating System`;

  return postToGroup(groupId, message);
};

// Share Bible study to Facebook
export const shareBibleStudy = (
  groupId: string,
  title: string,
  content: string,
  references: string[]
): Promise<any> => {
  const referencesText = references.length > 0 ? `References: ${references.join(', ')}\n\n` : '';
  const message = `${title}\n\n${content}\n\n${referencesText}Shared via Bible Operating System`;

  return postToGroup(groupId, message);
};

export default {
  initFacebook,
  checkLoginStatus,
  login,
  logout,
  getUserGroups,
  getGroupDetails,
  postToGroup,
  shareBibleVerse,
  shareBibleStudy
};
