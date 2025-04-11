"use client";

import { env } from './env';

/**
 * Puter.js integration utility
 * Provides functions for authentication, cloud storage, and AI services
 */

// Declare global puter object
declare global {
  interface Window {
    puter: any;
  }
}

// Initialize Puter with app ID
const initPuter = async (): Promise<boolean> => {
  try {
    // Check if puter is already initialized
    if (typeof window !== 'undefined' && window.puter) {
      return true;
    }

    // If not initialized, load the script
    if (typeof window !== 'undefined' && !document.getElementById('puter-js-script')) {
      const script = document.createElement('script');
      script.id = 'puter-js-script';
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      document.head.appendChild(script);

      // Return a promise that resolves when the script is loaded
      return new Promise<boolean>((resolve) => {
        script.onload = () => {
          // Initialize with app ID if needed
          if (env.puterAppId) {
            window.puter.appID = env.puterAppId;
          }
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Puter.js script');
          resolve(false);
        };
      });
    }

    return false;
  } catch (error) {
    console.error('Failed to initialize Puter:', error);
    return false;
  }
};

// Authentication functions
export const auth = {
  /**
   * Sign in with Puter
   * @returns Promise resolving to user info or null if failed
   */
  signIn: async () => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        const user = await window.puter.auth.signIn();
        return user;
      }
      return null;
    } catch (error) {
      console.error('Sign in failed:', error);
      return null;
    }
  },

  /**
   * Sign out from Puter
   * @returns Promise resolving to true if successful
   */
  signOut: async () => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        await window.puter.auth.signOut();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign out failed:', error);
      return false;
    }
  },

  /**
   * Get current user info
   * @returns User info or null if not signed in
   */
  getCurrentUser: async () => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        return window.puter.auth.getUser();
      }
      return null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  /**
   * Check if user is signed in
   * @returns Boolean indicating if user is signed in
   */
  isSignedIn: async () => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        return window.puter.auth.isSignedIn();
      }
      return false;
    } catch (error) {
      console.error('Failed to check sign in status:', error);
      return false;
    }
  },
};

// Cloud storage functions
export const storage = {
  /**
   * Save data to Puter cloud storage
   * @param key Storage key
   * @param data Data to store (will be JSON stringified)
   * @returns Promise resolving to true if successful
   */
  saveData: async (key: string, data: any) => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        await window.puter.kv.set(key, JSON.stringify(data));
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Failed to save data for key ${key}:`, error);
      return false;
    }
  },

  /**
   * Load data from Puter cloud storage
   * @param key Storage key
   * @returns Promise resolving to data or null if not found
   */
  loadData: async (key: string) => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        const data = await window.puter.kv.get(key);
        return data ? JSON.parse(data) : null;
      }
      return null;
    } catch (error) {
      console.error(`Failed to load data for key ${key}:`, error);
      return null;
    }
  },

  /**
   * Delete data from Puter cloud storage
   * @param key Storage key
   * @returns Promise resolving to true if successful
   */
  deleteData: async (key: string) => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        await window.puter.kv.del(key);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Failed to delete data for key ${key}:`, error);
      return false;
    }
  },

  /**
   * List all keys in Puter cloud storage
   * @returns Promise resolving to array of keys or empty array if failed
   */
  listKeys: async () => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        const keys = await window.puter.kv.list();
        return keys;
      }
      return [];
    } catch (error) {
      console.error('Failed to list keys:', error);
      return [];
    }
  },
};

// AI services
export const ai = {
  /**
   * Generate text using AI models
   * @param prompt The prompt to send to the AI model
   * @param options Additional options
   * @returns Promise resolving to generated text or null if failed
   */
  generateText: async (prompt: string, options: { maxTokens?: number; temperature?: number } = {}) => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        const { maxTokens = 500, temperature = 0.7 } = options;

        const response = await window.puter.ai.chat(prompt, {
          temperature,
        });

        return response;
      }
      return null;
    } catch (error) {
      console.error('Failed to generate text:', error);
      return null;
    }
  },

  /**
   * Generate image using AI models
   * @param prompt The prompt to send to the image generation model
   * @param options Additional options
   * @returns Promise resolving to image URL or null if failed
   */
  generateImage: async (prompt: string, options: { size?: string; quality?: string } = {}) => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        const { size = '1024x1024', quality = 'standard' } = options;

        const response = await window.puter.ai.txt2img(prompt);
        return response;
      }
      return null;
    } catch (error) {
      console.error('Failed to generate image:', error);
      return null;
    }
  },

  /**
   * Verify content against the King James Bible
   * @param content The content to verify
   * @returns Promise resolving to verification result
   */
  verifyBiblicalContent: async (content: string) => {
    try {
      await initPuter();
      if (typeof window !== 'undefined' && window.puter) {
        // Use AI to verify the content against the King James Bible
        const prompt = `
          You are a biblical accuracy verification system. Your task is to verify if the following content
          is accurate according to the King James Version of the Bible.

          Content to verify:
          "${content}"

          Please analyze this content and provide:
          1. A verification score from 0-100 (where 100 is completely accurate)
          2. Any inaccuracies or misrepresentations found
          3. The correct information from the King James Bible
          4. Bible verses that support or contradict the content

          Format your response as a JSON object with the following structure:
          {
            "score": number,
            "accurate": boolean,
            "inaccuracies": string[],
            "corrections": string[],
            "supportingVerses": string[],
            "contradictingVerses": string[]
          }
        `;

        const response = await window.puter.ai.chat(prompt, {
          temperature: 0.2,
        });

        try {
          return JSON.parse(response);
        } catch (e) {
          console.error('Failed to parse verification result:', e);
          return {
            score: 0,
            accurate: false,
            inaccuracies: ['Failed to parse verification result'],
            corrections: [],
            supportingVerses: [],
            contradictingVerses: [],
          };
        }
      }
      return {
        score: 0,
        accurate: false,
        inaccuracies: ['Puter.js not initialized'],
        corrections: [],
        supportingVerses: [],
        contradictingVerses: [],
      };
    } catch (error) {
      console.error('Failed to verify content:', error);
      return {
        score: 0,
        accurate: false,
        inaccuracies: ['Verification failed due to an error'],
        corrections: [],
        supportingVerses: [],
        contradictingVerses: [],
      };
    }
  },
};

export default {
  init: initPuter,
  auth,
  storage,
  ai,
};
