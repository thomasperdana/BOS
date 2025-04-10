import React, { useState } from 'react';
import { useBible } from '../../context/BibleContext';
import Button from '../ui/Button';

const BibleSearch: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    performSearch, 
    setCurrentReference,
    isDarkMode
  } = useBible();
  
  const [searchOptions, setSearchOptions] = useState({
    caseSensitive: false,
    wholeWord: false
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };
  
  const handleOptionChange = (option: 'caseSensitive' | 'wholeWord') => {
    setSearchOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  const handleResultClick = (book: string, chapter: number) => {
    setCurrentReference(book, chapter);
  };
  
  return (
    <div className={`bible-search p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Search the Bible
      </h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term..."
            className={`flex-grow p-2 border rounded ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
        
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={searchOptions.caseSensitive}
              onChange={() => handleOptionChange('caseSensitive')}
              className="mr-2"
            />
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Case sensitive</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={searchOptions.wholeWord}
              onChange={() => handleOptionChange('wholeWord')}
              className="mr-2"
            />
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Whole word</span>
          </label>
        </div>
      </form>
      
      {searchResults.length > 0 ? (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Search Results ({searchResults.length})
          </h3>
          <div className={`max-h-96 overflow-y-auto p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            {searchResults.map((result, index) => (
              <div 
                key={`${result.book}-${result.chapter}-${result.verse}`}
                className={`p-3 mb-2 rounded cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-100 shadow-sm'
                }`}
                onClick={() => handleResultClick(result.book, result.chapter)}
              >
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  {result.book} {result.chapter}:{result.verse}
                </div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {result.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : searchTerm && (
        <div className={`p-4 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          {searchTerm.length > 0 ? 'No results found. Try a different search term.' : 'Enter a search term to begin.'}
        </div>
      )}
    </div>
  );
};

export default BibleSearch;
