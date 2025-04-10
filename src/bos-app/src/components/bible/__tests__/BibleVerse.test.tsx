import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BibleVerse from '../BibleVerse';
import { BibleProvider } from '../../../context/BibleContext';

// Mock the BibleContext
jest.mock('../../../context/BibleContext', () => {
  const originalModule = jest.requireActual('../../../context/BibleContext');
  
  return {
    ...originalModule,
    useBible: () => ({
      toggleBookmark: jest.fn(),
      isBookmarked: jest.fn().mockReturnValue(false),
      fontSize: 16,
    }),
    BibleProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('BibleVerse Component', () => {
  const mockVerse = {
    book: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
  };

  it('renders verse number and text correctly', () => {
    render(<BibleVerse {...mockVerse} />);
    
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText(mockVerse.text)).toBeInTheDocument();
  });

  it('applies the correct font size', () => {
    render(<BibleVerse {...mockVerse} />);
    
    const verseText = screen.getByText(mockVerse.text);
    expect(verseText).toHaveStyle('font-size: 16px');
  });

  it('highlights the verse when isHighlighted is true', () => {
    render(<BibleVerse {...mockVerse} isHighlighted />);
    
    const verseContainer = screen.getByTestId('verse-container');
    expect(verseContainer).toHaveClass('bg-yellow-100');
  });

  it('does not highlight the verse when isHighlighted is false', () => {
    render(<BibleVerse {...mockVerse} isHighlighted={false} />);
    
    const verseContainer = screen.getByTestId('verse-container');
    expect(verseContainer).not.toHaveClass('bg-yellow-100');
  });

  it('renders bookmark icon', () => {
    render(<BibleVerse {...mockVerse} />);
    
    const bookmarkIcon = screen.getByTestId('bookmark-icon');
    expect(bookmarkIcon).toBeInTheDocument();
  });

  it('calls toggleBookmark when bookmark icon is clicked', () => {
    const toggleBookmarkMock = jest.fn();
    
    // Override the mock for this specific test
    jest.spyOn(require('../../../context/BibleContext'), 'useBible').mockImplementation(() => ({
      toggleBookmark: toggleBookmarkMock,
      isBookmarked: () => false,
      fontSize: 16,
    }));
    
    render(<BibleVerse {...mockVerse} />);
    
    const bookmarkIcon = screen.getByTestId('bookmark-icon');
    fireEvent.click(bookmarkIcon);
    
    expect(toggleBookmarkMock).toHaveBeenCalledWith({
      book: mockVerse.book,
      chapter: mockVerse.chapter,
      verse: mockVerse.verse,
    });
  });

  it('shows filled bookmark icon when verse is bookmarked', () => {
    // Override the mock for this specific test
    jest.spyOn(require('../../../context/BibleContext'), 'useBible').mockImplementation(() => ({
      toggleBookmark: jest.fn(),
      isBookmarked: () => true,
      fontSize: 16,
    }));
    
    render(<BibleVerse {...mockVerse} />);
    
    const filledBookmarkIcon = screen.getByTestId('bookmark-icon-filled');
    expect(filledBookmarkIcon).toBeInTheDocument();
  });

  it('shows outline bookmark icon when verse is not bookmarked', () => {
    // Override the mock for this specific test
    jest.spyOn(require('../../../context/BibleContext'), 'useBible').mockImplementation(() => ({
      toggleBookmark: jest.fn(),
      isBookmarked: () => false,
      fontSize: 16,
    }));
    
    render(<BibleVerse {...mockVerse} />);
    
    const outlineBookmarkIcon = screen.getByTestId('bookmark-icon-outline');
    expect(outlineBookmarkIcon).toBeInTheDocument();
  });
});
