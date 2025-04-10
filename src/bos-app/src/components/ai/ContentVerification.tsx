import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ai } from '../../lib/puter';
import Button from '../ui/Button';

const ContentVerification: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const [content, setContent] = useState('');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verify content using AI
  const verifyContent = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to use AI features');
      return;
    }
    
    if (!content.trim()) {
      setError('Please enter content to verify');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setVerificationResult(null);
    
    try {
      const result = await ai.verifyBiblicalContent(content);
      
      if (result) {
        setVerificationResult(result);
      } else {
        setError('Failed to verify content');
      }
    } catch (err) {
      setError(`Verification failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="content-verification p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Biblical Content Verification</h2>
      
      {!isAuthenticated && (
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            Please sign in to use AI-powered content verification.
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content to Verify
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter biblical content to verify against the King James Version..."
          rows={6}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div className="mb-4">
        <Button
          onClick={verifyContent}
          disabled={isLoading || !isAuthenticated || !content.trim()}
          variant="primary"
        >
          {isLoading ? 'Verifying...' : 'Verify Content'}
        </Button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {verificationResult && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Verification Results:</h3>
          
          <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                <div 
                  className={`h-4 rounded-full ${
                    verificationResult.score >= 90 
                      ? 'bg-green-500' 
                      : verificationResult.score >= 70 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${verificationResult.score}%` }}
                ></div>
              </div>
              <span className="ml-3 font-medium dark:text-white">{verificationResult.score}/100</span>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2 dark:text-white">Overall Assessment:</h4>
              <p className={`p-2 rounded ${
                verificationResult.score >= 90 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : verificationResult.score >= 70 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {verificationResult.score >= 90 
                  ? 'This content is biblically accurate according to the King James Version.' 
                  : verificationResult.score >= 70 
                    ? 'This content is mostly accurate but contains some minor inaccuracies.' 
                    : 'This content contains significant inaccuracies according to the King James Version.'}
              </p>
            </div>
            
            {verificationResult.inaccuracies && verificationResult.inaccuracies.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2 dark:text-white">Inaccuracies Found:</h4>
                <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                  {verificationResult.inaccuracies.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {verificationResult.corrections && verificationResult.corrections.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2 dark:text-white">Corrections:</h4>
                <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                  {verificationResult.corrections.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {verificationResult.supportingVerses && verificationResult.supportingVerses.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2 dark:text-white">Supporting Verses:</h4>
                <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                  {verificationResult.supportingVerses.map((verse: string, i: number) => (
                    <li key={i}>{verse}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {verificationResult.contradictingVerses && verificationResult.contradictingVerses.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 dark:text-white">Contradicting Verses:</h4>
                <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
                  {verificationResult.contradictingVerses.map((verse: string, i: number) => (
                    <li key={i}>{verse}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentVerification;
