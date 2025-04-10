import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ai } from '../../lib/puter';
import Button from '../ui/Button';

const ThematicExploration: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const [theme, setTheme] = useState('');
  const [exploration, setExploration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  
  // Generate thematic exploration using AI
  const generateExploration = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to use AI features');
      return;
    }
    
    if (!theme.trim()) {
      setError('Please enter a theme to explore');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setExploration(null);
    setVerificationResult(null);
    
    try {
      const prompt = `
        Provide a biblical exploration of the theme "${theme}" according to the King James Version of the Bible.
        
        Please include:
        1. A definition and overview of the theme
        2. Key Bible verses related to this theme (with full references)
        3. How this theme develops throughout the Bible (Old and New Testament)
        4. Practical applications for Christians today
        5. Related themes and concepts
        
        Format your response in markdown with clear headings for each section.
      `;
      
      const result = await ai.generateText(prompt, {
        maxTokens: 1500,
        temperature: 0.7,
      });
      
      if (result) {
        setExploration(result);
        
        // Verify the generated content
        const verification = await ai.verifyBiblicalContent(result);
        setVerificationResult(verification);
      } else {
        setError('Failed to generate thematic exploration');
      }
    } catch (err) {
      setError(`Exploration failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Exploration error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Suggested themes
  const suggestedThemes = [
    'Faith', 'Love', 'Hope', 'Salvation', 'Grace',
    'Forgiveness', 'Prayer', 'Wisdom', 'Righteousness', 'Redemption'
  ];
  
  const selectSuggestedTheme = (suggestedTheme: string) => {
    setTheme(suggestedTheme);
  };
  
  return (
    <div className="thematic-exploration p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Thematic Exploration</h2>
      
      {!isAuthenticated && (
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            Please sign in to use AI-powered thematic exploration.
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Biblical Theme
        </label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a biblical theme (e.g., Faith, Love, Salvation)"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suggested themes:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedThemes.map((suggestedTheme) => (
            <button
              key={suggestedTheme}
              onClick={() => selectSuggestedTheme(suggestedTheme)}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full dark:text-gray-200"
            >
              {suggestedTheme}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <Button
          onClick={generateExploration}
          disabled={isLoading || !isAuthenticated || !theme.trim()}
          variant="primary"
        >
          {isLoading ? 'Generating...' : 'Explore Theme'}
        </Button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {exploration && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Exploration of "{theme}":
          </h3>
          <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            {exploration.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          
          {verificationResult && (
            <div className="mt-4 p-3 rounded-md border border-gray-200 dark:border-gray-600">
              <h4 className="text-md font-medium mb-2 dark:text-white">
                Biblical Accuracy: {verificationResult.score}/100
              </h4>
              
              {verificationResult.score >= 90 ? (
                <p className="text-green-600 dark:text-green-400">
                  This exploration is biblically accurate according to the King James Version.
                </p>
              ) : verificationResult.score >= 70 ? (
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 mb-2">
                    This exploration is mostly accurate but may contain some minor inaccuracies.
                  </p>
                  {verificationResult.inaccuracies && verificationResult.inaccuracies.length > 0 && (
                    <div>
                      <p className="font-medium dark:text-white">Potential inaccuracies:</p>
                      <ul className="list-disc pl-5 dark:text-gray-300">
                        {verificationResult.inaccuracies.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-red-600 dark:text-red-400 mb-2">
                    This exploration contains significant inaccuracies according to the King James Version.
                  </p>
                  {verificationResult.inaccuracies && verificationResult.inaccuracies.length > 0 && (
                    <div>
                      <p className="font-medium dark:text-white">Inaccuracies:</p>
                      <ul className="list-disc pl-5 dark:text-gray-300">
                        {verificationResult.inaccuracies.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {verificationResult.supportingVerses && verificationResult.supportingVerses.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium dark:text-white">Supporting verses:</p>
                  <ul className="list-disc pl-5 dark:text-gray-300">
                    {verificationResult.supportingVerses.map((verse: string, i: number) => (
                      <li key={i}>{verse}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThematicExploration;
