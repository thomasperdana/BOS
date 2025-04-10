import React, { useState } from 'react';
import Button from './Button';

interface AccessibilityMenuProps {
  onFontSizeChange: (size: number) => void;
  onContrastChange: (highContrast: boolean) => void;
  onMotionChange: (reduceMotion: boolean) => void;
  currentFontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
}

/**
 * AccessibilityMenu component
 * Provides controls for accessibility settings like font size, contrast, and motion
 */
const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
  onFontSizeChange,
  onContrastChange,
  onMotionChange,
  currentFontSize,
  highContrast,
  reduceMotion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFontSizeChange = (size: number) => {
    onFontSizeChange(size);
  };

  const handleContrastChange = () => {
    onContrastChange(!highContrast);
  };

  const handleMotionChange = () => {
    onMotionChange(!reduceMotion);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        className="flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
        Accessibility
      </Button>

      {isOpen && (
        <div
          id="accessibility-menu"
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 p-4"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="accessibility-menu-button"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Accessibility Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Font Size
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFontSizeChange(Math.max(12, currentFontSize - 2))}
                  className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  aria-label="Decrease font size"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {currentFontSize}px
                </span>
                <button
                  onClick={() => handleFontSizeChange(Math.min(24, currentFontSize + 2))}
                  className="p-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  aria-label="Increase font size"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="high-contrast"
                type="checkbox"
                checked={highContrast}
                onChange={handleContrastChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="high-contrast"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                High Contrast Mode
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="reduce-motion"
                type="checkbox"
                checked={reduceMotion}
                onChange={handleMotionChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="reduce-motion"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Reduce Motion
              </label>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
