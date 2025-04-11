"use client";

import React, { useState } from 'react';
import { useBible } from '../../context/BibleContext';
import { useAuth } from '../../context/AuthContext';
import { ai } from '../../lib/puter';
import Button from '../ui/Button';

const ContextualInsights: React.FC = () => {
  const { currentBook, currentChapter } = useBible();
  const { isAuthenticated } = useAuth();

  const [book, setBook] = useState(currentBook);
  const [chapter, setChapter] = useState(currentChapter);
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Get the chapter text for context
  const getChapterSummary = () => {
    try {
      const reference = `${book} ${chapter}`;

      const verses = useBible().getVersesByReference(reference);

      if (!verses || verses.length === 0) {
        return 'Chapter not found';
      }

      // Return a brief summary (first few verses)
      const firstVerses = verses.slice(0, 3);
      return firstVerses.map(v => `${v.verse}. ${v.text}`).join(' ') + '...';
    } catch (err) {
      console.error('Error getting chapter summary:', err);
      return 'Error loading chapter';
    }
  };

  // Generate contextual insights using AI
  const generateInsights = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to use AI features');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);
    setVerificationResult(null);
    setImageUrl(null);

    try {
      const reference = `${book} ${chapter}`;

      const prompt = `
        Provide contextual insights for ${reference} from the King James Version of the Bible.

        Please include:
        1. Historical and cultural context of this chapter
        2. The author and audience of this book
        3. Key events or teachings in this chapter
        4. How this chapter fits into the broader biblical narrative
        5. Archaeological or historical evidence related to this chapter

        Format your response in markdown with clear headings for each section.
      `;

      const result = await ai.generateText(prompt, {
        maxTokens: 1500,
        temperature: 0.7,
      });

      if (result) {
        setInsights(result);

        // Verify the generated content
        const verification = await ai.verifyBiblicalContent(result);
        setVerificationResult(verification);
      } else {
        setError('Failed to generate contextual insights');
      }
    } catch (err) {
      setError(`Insights generation failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Insights error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate an image related to the chapter
  const generateImage = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to use AI features');
      return;
    }

    setIsGeneratingImage(true);
    setError(null);

    try {
      const reference = `${book} ${chapter}`;

      const prompt = `
        Create a biblically accurate, respectful illustration of a scene from ${reference} in the Bible.
        The image should be in a classical painting style, similar to Renaissance biblical art.
        Do not include any text or captions in the image.
        Make sure the image is historically accurate in terms of clothing, architecture, and setting.
      `;

      const imageUrl = await ai.generateImage(prompt, {
        size: '1024x1024',
        quality: 'standard',
      });

      if (imageUrl) {
        setImageUrl(imageUrl);
      } else {
        setError('Failed to generate image');
      }
    } catch (err) {
      setError(`Image generation failed: ${err instanceof Error ? err.message : String(err)}`);
      console.error('Image generation error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="contextual-insights p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Contextual Insights</h2>

      {!isAuthenticated && (
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md mb-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            Please sign in to use AI-powered contextual insights.
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
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2 dark:text-white">Chapter Preview:</h3>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md dark:text-gray-200">
          {getChapterSummary()}
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <Button
          onClick={generateInsights}
          disabled={isLoading || !isAuthenticated}
          variant="primary"
        >
          {isLoading ? 'Generating...' : 'Generate Insights'}
        </Button>

        <Button
          onClick={generateImage}
          disabled={isGeneratingImage || !isAuthenticated}
          variant="secondary"
        >
          {isGeneratingImage ? 'Generating...' : 'Generate Image'}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Insights for {book} {chapter}:
            </h3>
            <div className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              {insights.split('\n').map((line, index) => (
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
                    These insights are biblically accurate according to the King James Version.
                  </p>
                ) : verificationResult.score >= 70 ? (
                  <div>
                    <p className="text-yellow-600 dark:text-yellow-400 mb-2">
                      These insights are mostly accurate but may contain some minor inaccuracies.
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
                      These insights contain significant inaccuracies according to the King James Version.
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

        {imageUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Illustration for {book} {chapter}:
            </h3>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
              <img
                src={imageUrl}
                alt={`AI-generated illustration of ${book} ${chapter}`}
                className="w-full h-auto rounded-md"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                AI-generated illustration. This image is for study purposes only and may not be historically accurate.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualInsights;
