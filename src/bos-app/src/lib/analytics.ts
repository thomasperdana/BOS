"use client";

// Google Analytics implementation
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

// Log page view
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Log event
export interface EventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventProps) => {
  if (!GA_TRACKING_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// User tracking
export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  if (!GA_TRACKING_ID || !userId) return;

  window.gtag('set', 'user_properties', {
    user_id: userId,
    ...userProperties,
  });
};

// Feature usage tracking
export const trackFeatureUsage = (featureName: string, metadata: Record<string, any> = {}) => {
  event({
    action: 'feature_used',
    category: 'Feature Usage',
    label: featureName,
  });

  // Log additional metadata if provided
  if (Object.keys(metadata).length > 0) {
    window.gtag('event', 'feature_metadata', {
      feature_name: featureName,
      ...metadata,
    });
  }
};

// Bible reading tracking
export const trackBibleReading = (book: string, chapter: number, duration: number) => {
  event({
    action: 'bible_reading',
    category: 'Bible Usage',
    label: `${book} ${chapter}`,
    value: Math.round(duration), // Duration in seconds
  });
};

// AI feature usage tracking
export const trackAIFeatureUsage = (featureType: string, promptLength: number, responseLength: number) => {
  event({
    action: 'ai_feature_used',
    category: 'AI Usage',
    label: featureType,
  });

  window.gtag('event', 'ai_feature_metadata', {
    feature_type: featureType,
    prompt_length: promptLength,
    response_length: responseLength,
  });
};

// Community feature tracking
export const trackCommunityInteraction = (interactionType: string, contentId?: string) => {
  event({
    action: 'community_interaction',
    category: 'Community',
    label: interactionType,
  });

  if (contentId) {
    window.gtag('event', 'community_content_interaction', {
      interaction_type: interactionType,
      content_id: contentId,
    });
  }
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string, errorStack?: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: errorType,
  });

  window.gtag('event', 'error_details', {
    error_type: errorType,
    error_message: errorMessage,
    error_stack: errorStack?.substring(0, 500), // Limit stack trace length
  });
};
