import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

interface FeedbackButtonProps {
  feedbackType?: 'general' | 'feature' | 'bug' | 'content';
  featureName?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonText?: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  feedbackType = 'general',
  featureName,
  position = 'bottom-right',
  buttonText = 'Feedback',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };
  
  const toggleFeedback = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <button
        onClick={toggleFeedback}
        className={`fixed ${positionClasses[position]} z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
        aria-label="Open feedback form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
        {buttonText}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md">
            <FeedbackForm
              feedbackType={feedbackType}
              featureName={featureName}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
