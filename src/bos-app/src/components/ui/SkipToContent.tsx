import React from 'react';

/**
 * SkipToContent component for accessibility
 * Allows keyboard users to skip navigation and go directly to main content
 */
const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
