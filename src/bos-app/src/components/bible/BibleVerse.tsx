import React from 'react';
import { useBible } from '../../context/BibleContext';

interface BibleVerseProps {
  book: string;
  chapter: number;
  verseNumber: number;
  text: string;
  isHighlighted?: boolean;
}

const BibleVerse: React.FC<BibleVerseProps> = ({
  book,
  chapter,
  verseNumber,
  text,
  isHighlighted = false,
}) => {
  const { bookmarks, addBookmark, removeBookmark, fontSize, isDarkMode } = useBible();

  // Check if this verse is bookmarked
  const isBookmarked = bookmarks.some(
    bookmark =>
      bookmark.book === book &&
      bookmark.chapter === chapter &&
      bookmark.verse === verseNumber
  );

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(book, chapter, verseNumber);
    } else {
      addBookmark(book, chapter, verseNumber);
    }
  };

  return (
    <div
      className={`group mb-3 flex ${isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900 p-1 rounded' : ''} ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="flex-none w-8 text-right">
        <sup className="font-semibold text-blue-700 dark:text-blue-400">{verseNumber}</sup>
      </div>
      <div className="flex-grow px-2">
        <span>{text}</span>
      </div>
      <div className="flex-none opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={toggleBookmark}
          className="text-gray-500 hover:text-yellow-500 focus:outline-none"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default BibleVerse;
