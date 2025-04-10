import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  BibleBook, 
  BibleChapter, 
  BibleVerse, 
  getAllBooks, 
  getChapter, 
  getNextChapter, 
  getPreviousChapter,
  searchBible
} from '../lib/bible';

interface BibleContextType {
  books: { name: string; abbrev: string }[];
  currentBook: string;
  currentChapter: number;
  chapterData: BibleChapter | null;
  isLoading: boolean;
  error: string | null;
  setCurrentReference: (book: string, chapter: number) => void;
  goToNextChapter: () => void;
  goToPreviousChapter: () => void;
  searchResults: BibleVerse[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  performSearch: () => void;
  bookmarks: { book: string; chapter: number; verse?: number }[];
  addBookmark: (book: string, chapter: number, verse?: number) => void;
  removeBookmark: (book: string, chapter: number, verse?: number) => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const BibleContext = createContext<BibleContextType | undefined>(undefined);

interface BibleProviderProps {
  children: ReactNode;
}

export const BibleProvider: React.FC<BibleProviderProps> = ({ children }) => {
  const [books] = useState(getAllBooks());
  const [currentBook, setCurrentBook] = useState('Genesis');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  
  const [bookmarks, setBookmarks] = useState<{ book: string; chapter: number; verse?: number }[]>([]);
  
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load chapter data when currentBook or currentChapter changes
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = getChapter(currentBook, currentChapter);
      
      if (!data) {
        setError(`Chapter not found: ${currentBook} ${currentChapter}`);
        setChapterData(null);
      } else {
        setChapterData(data);
      }
    } catch (err) {
      setError(`Error loading chapter: ${err instanceof Error ? err.message : String(err)}`);
      setChapterData(null);
    } finally {
      setIsLoading(false);
    }
  }, [currentBook, currentChapter]);
  
  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bos-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (err) {
        console.error('Error loading bookmarks:', err);
      }
    }
    
    // Load user preferences
    const savedFontSize = localStorage.getItem('bos-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
    
    const savedDarkMode = localStorage.getItem('bos-dark-mode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);
  
  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bos-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Save user preferences when they change
  useEffect(() => {
    localStorage.setItem('bos-font-size', fontSize.toString());
  }, [fontSize]);
  
  useEffect(() => {
    localStorage.setItem('bos-dark-mode', isDarkMode.toString());
    
    // Apply dark mode to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const setCurrentReference = (book: string, chapter: number) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
  };
  
  const goToNextChapter = () => {
    const next = getNextChapter(currentBook, currentChapter);
    if (next) {
      setCurrentReference(next.book, next.chapter);
    }
  };
  
  const goToPreviousChapter = () => {
    const prev = getPreviousChapter(currentBook, currentChapter);
    if (prev) {
      setCurrentReference(prev.book, prev.chapter);
    }
  };
  
  const performSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = searchBible(searchTerm, { limit: 50 });
    setSearchResults(results);
  };
  
  const addBookmark = (book: string, chapter: number, verse?: number) => {
    const newBookmark = { book, chapter, verse };
    
    // Check if bookmark already exists
    const exists = bookmarks.some(bookmark => 
      bookmark.book === book && 
      bookmark.chapter === chapter && 
      bookmark.verse === verse
    );
    
    if (!exists) {
      setBookmarks([...bookmarks, newBookmark]);
    }
  };
  
  const removeBookmark = (book: string, chapter: number, verse?: number) => {
    setBookmarks(bookmarks.filter(bookmark => 
      !(bookmark.book === book && 
        bookmark.chapter === chapter && 
        bookmark.verse === verse)
    ));
  };
  
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 28)); // Max font size: 28px
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12)); // Min font size: 12px
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const value = {
    books,
    currentBook,
    currentChapter,
    chapterData,
    isLoading,
    error,
    setCurrentReference,
    goToNextChapter,
    goToPreviousChapter,
    searchResults,
    searchTerm,
    setSearchTerm,
    performSearch,
    bookmarks,
    addBookmark,
    removeBookmark,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    isDarkMode,
    toggleDarkMode
  };
  
  return (
    <BibleContext.Provider value={value}>
      {children}
    </BibleContext.Provider>
  );
};

export const useBible = (): BibleContextType => {
  const context = useContext(BibleContext);
  if (context === undefined) {
    throw new Error('useBible must be used within a BibleProvider');
  }
  return context;
};

export default BibleContext;
