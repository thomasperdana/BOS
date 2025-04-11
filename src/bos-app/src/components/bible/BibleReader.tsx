"use client";

import React, { useState } from 'react';
import { useBible } from '../../context/BibleContext';
import BibleChapter from './BibleChapter';
import Button from '../ui/Button';

const BibleReader: React.FC = () => {
  const {
    books,
    currentBook,
    currentChapter,
    chapterData,
    isLoading,
    error,
    setCurrentReference,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    isDarkMode,
    getChapterCount,
    toggleDarkMode
  } = useBible();

  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);

  // Group books by testament
  const oldTestament = books.slice(0, 39);
  const newTestament = books.slice(39);

  const handleBookSelect = (bookName: string) => {
    setCurrentReference(bookName, 1);
    setShowBookSelector(false);
    setShowChapterSelector(true);
  };

  const handleChapterSelect = (chapter: number) => {
    setCurrentReference(currentBook, chapter);
    setShowChapterSelector(false);
  };

  // Generate array of chapter numbers for the current book
  const chapterNumbers = Array.from(
    { length: getChapterCount(currentBook) },
    (_, i) => i + 1
  );

  return (
    <div className={`bible-reader p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowBookSelector(prev => !prev)}
          >
            {currentBook}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowChapterSelector(prev => !prev)}
          >
            Chapter {currentChapter}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decreaseFontSize}
            aria-label="Decrease font size"
          >
            A-
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={increaseFontSize}
            aria-label="Increase font size"
          >
            A+
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Book selector dropdown */}
      {showBookSelector && (
        <div className={`book-selector mb-6 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Old Testament</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {oldTestament.map(book => (
                  <button
                    key={book.abbrev}
                    onClick={() => handleBookSelect(book.name)}
                    className={`p-2 text-sm text-left rounded hover:bg-blue-100 ${
                      currentBook === book.name
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800'
                    }`}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>New Testament</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {newTestament.map(book => (
                  <button
                    key={book.abbrev}
                    onClick={() => handleBookSelect(book.name)}
                    className={`p-2 text-sm text-left rounded hover:bg-blue-100 ${
                      currentBook === book.name
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800'
                    }`}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter selector dropdown */}
      {showChapterSelector && (
        <div className={`chapter-selector mb-6 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {currentBook} - Select Chapter
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {chapterNumbers.map(chapter => (
              <button
                key={chapter}
                onClick={() => handleChapterSelect(chapter)}
                className={`p-2 text-center rounded ${
                  currentChapter === chapter
                    ? 'bg-blue-500 text-white'
                    : isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {chapter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bible content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      ) : chapterData ? (
        <BibleChapter
          book={chapterData.book}
          chapter={chapterData.chapter}
          verses={chapterData.verses}
        />
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No chapter data available. Please select a book and chapter.</p>
        </div>
      )}
    </div>
  );
};

export default BibleReader;
