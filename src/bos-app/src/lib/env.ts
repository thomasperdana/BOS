/**
 * Environment variable utility functions
 */

/**
 * Get an environment variable with validation
 * @param key The environment variable key
 * @param defaultValue Optional default value if not found
 * @param required Whether the variable is required
 * @returns The environment variable value
 */
export const getEnv = (
  key: string,
  defaultValue?: string,
  required = true
): string => {
  const value = process.env[key] || defaultValue;

  if (required && !value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }

  return value || '';
};

/**
 * Get a client-side environment variable (must be prefixed with NEXT_PUBLIC_)
 * @param key The environment variable key (without NEXT_PUBLIC_ prefix)
 * @param defaultValue Optional default value if not found
 * @param required Whether the variable is required
 * @returns The environment variable value
 */
export const getClientEnv = (
  key: string,
  defaultValue?: string,
  required = true
): string => {
  const fullKey = `NEXT_PUBLIC_${key}`;
  return getEnv(fullKey, defaultValue, required);
};

/**
 * Environment variables object
 */
export const env = {
  // Facebook
  facebookAppId: getClientEnv('FACEBOOK_APP_ID', '', false),
  facebookGroupId: getClientEnv('FACEBOOK_GROUP_ID', '', false),

  // AI Services
  geminiApiKey: getClientEnv('GEMINI_API_KEY', '', false),
  openrouterApiKey: getClientEnv('OPENROUTER_API_KEY', '', false),
  openrouterBaseUrl: getClientEnv('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1', false),

  // Puter.js
  puterAppId: getClientEnv('PUTER_APP_ID', 'bos-app', false),
  puterApiKey: getClientEnv('PUTER_API_KEY', '', false),

  // Feature Flags
  enableFacebookIntegration: getClientEnv('ENABLE_FACEBOOK_INTEGRATION', 'false', false) === 'true',
  enableGoogleIntegration: getClientEnv('ENABLE_GOOGLE_INTEGRATION', 'true', false) === 'true',
  enableCommunityFeatures: getClientEnv('ENABLE_COMMUNITY_FEATURES', 'true', false) === 'true',
  enableAiFeatures: getClientEnv('ENABLE_AI_FEATURES', 'true', false) === 'true',
};
