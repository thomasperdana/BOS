import React, { useState } from 'react';
import { useBible } from '../../context/BibleContext';
import { useAuth } from '../../context/AuthContext';
import { ai } from '../../lib/puter';
import Button from '../ui/Button';

interface VerseAnalysisProps {
  book?: string;
  chapter?: number;
  verse?: number;
}

const VerseAnalysis: React.FC<VerseAnalysisProps> = ({ 
  book: initialBook, 
  chapter: initialChapter, 
  verse: initialVerse 
}) => {
  const { currentBook, currentChapter, getVersesByReference } = useBible();
  const { isAuthenticated } = useAuth();
  
  const [book, setBook] = useState(initialBook || currentBook);
  const [chapter, setChapter] = useState(initialChapter || currentChapter);
  const [verse, setVerse] = useState(initialVerse || 1);
  const [endVerse, setEndVerse] = useState<number | undefined>(undefined);
  
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  
  // Get the verse text for display
  const getVerseText = () => {
    try {
      const reference = {
        book,
        chapter,
        verse,
        endVerse
      };
      
      const verses = getVersesByReference(reference);
      
      if (!verses || verses.length === 0) {
        return 'Verse not found';
      }
      
      return verses.map(v => `${v.verse}. ${v.text}`).join(' ');
    } catch (err) {
      console.error('Error getting verse text:', err);
      return 'Error loading verse';
    }
  };
  
  // Generate analysis using AI
  const generateAnalysis = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to use AI features');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setVerificationResult(null);
    
    try {
      const verseText = getVerseText();
      const reference = `${book} ${chapter}:${verse}${endVerse ? `-${endVerse}` : ''}`;
      
      const prompt = `
        Analyze the following Bible verse(s) from the King James Version:
        
        Reference: ${reference}
        Text: "${verseText}"
        
        Please provide:
        1. Historical context
        2. Key themes and messages
        3. Cross-references to other relevant Bible passages
        4. Practical applications for modern Christians
        
        Format your response in markdown with clear headings for each section.
      `;
      
      const result = await ai.generateText(prompt, {
        maxTokens: 1000,
        temperature: 0.7,
      });
      
      if (result) {
        setAnalysis(result);
        
        // Verify the generated content
        const verification = await ai.verifyBiblicalContent(result);
        setVerificationResult(verification);
      } else {
        setError('Failed to generate analysis');
      }
    } catch (err) {
      setError(`Analysis failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="verse-analysis p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Verse Analysis</h2>
      
      {!isAuthenticated && (
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            Please sign in to use AI-powered verse analysis.
          </p>
        </div>
      )}
      
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Book
          </label>
          <input
            type="text"
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chapter
            </label>
            <input
              type="number"
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
              min={1}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Verse
            </label>
            <input
              type="number"
              value={verse}
              onChange={(e) => setVerse(parseInt(e.target.value) || 1)}
              min={1}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Verse
            </label>
            <input
              type="number"
              value={endVerse || ''}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : undefined;
                setEndVerse(value);
              }}
              min={verse}
              placeholder="Optional"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2 dark:text-white">Verse Text:</h3>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md dark:text-gray-200">
          {getVerseText()}
        </div>
      </div>
      
      <div className="mb-4">
        <Button
          onClick={generateAnalysis}
          disabled={isLoading || !isAuthenticated}
          variant="primary"
        >
          {isLoading ? 'Generating...' : 'Generate Analysis'}
        </Button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {analysis && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Analysis:</h3>
          <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            {analysis.split('\n').map((line, index) => (
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
                  This analysis is biblically accurate according to the King James Version.
                </p>
              ) : verificationResult.score >= 70 ? (
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 mb-2">
                    This analysis is mostly accurate but may contain some minor inaccuracies.
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
                    This analysis contains significant inaccuracies according to the King James Version.
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerseAnalysis;
