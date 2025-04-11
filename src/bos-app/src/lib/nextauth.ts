"use client";

import { signIn, signOut, useSession } from "next-auth/react";

/**
 * NextAuth.js integration utility
 * Provides functions for authentication with various providers
 */

// Authentication functions
export const auth = {
  /**
   * Sign in with Facebook
   * @returns Promise resolving to true if successful
   */
  signInWithFacebook: async (): Promise<boolean> => {
    try {
      const result = await signIn("facebook", { redirect: false });
      return !result?.error;
    } catch (error) {
      console.error("Facebook sign in failed:", error);
      return false;
    }
  },

  /**
   * Sign in with Google
   * @returns Promise resolving to true if successful
   */
  signInWithGoogle: async (): Promise<boolean> => {
    try {
      const result = await signIn("google", { redirect: false });
      return !result?.error;
    } catch (error) {
      console.error("Google sign in failed:", error);
      return false;
    }
  },

  /**
   * Sign out from NextAuth.js
   * @returns Promise resolving to true if successful
   */
  signOut: async (): Promise<boolean> => {
    try {
      await signOut({ redirect: false });
      return true;
    } catch (error) {
      console.error("Sign out failed:", error);
      return false;
    }
  },

  /**
   * Get current session
   * @returns Session object or null if not signed in
   */
  getSession: () => {
    const { data: session } = useSession();
    return session;
  },

  /**
   * Check if user is signed in
   * @returns Boolean indicating if user is signed in
   */
  isSignedIn: () => {
    const { status } = useSession();
    return status === "authenticated";
  },
};

export default auth;
