import React from 'react';
import { useBible } from '../../context/BibleContext';
import Button from '../ui/Button';

const BibleBookmarks: React.FC = () => {
  const { 
    bookmarks, 
    removeBookmark, 
    setCurrentReference,
    isDarkMode
  } = useBible();
  
  const handleBookmarkClick = (book: string, chapter: number) => {
    setCurrentReference(book, chapter);
  };
  
  return (
    <div className={`bible-bookmarks p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Your Bookmarks
      </h2>
      
      {bookmarks.length > 0 ? (
        <div className="space-y-2">
          {bookmarks.map((bookmark, index) => (
            <div 
              key={`${bookmark.book}-${bookmark.chapter}-${bookmark.verse || 'chapter'}`}
              className={`flex justify-between items-center p-3 rounded ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div 
                className="flex-grow cursor-pointer"
                onClick={() => handleBookmarkClick(bookmark.book, bookmark.chapter)}
              >
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {bookmark.book} {bookmark.chapter}
                  {bookmark.verse ? `:${bookmark.verse}` : ''}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => removeBookmark(bookmark.book, bookmark.chapter, bookmark.verse)}
                aria-label="Remove bookmark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className={`p-4 rounded text-center ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          <p>You don't have any bookmarks yet.</p>
          <p className="text-sm mt-2">Click the bookmark icon next to any verse to save it for later.</p>
        </div>
      )}
    </div>
  );
};

export default BibleBookmarks;
