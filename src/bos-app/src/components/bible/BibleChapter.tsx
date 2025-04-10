import React, { useState } from 'react';
import BibleVerse from './BibleVerse';
import { useBible } from '../../context/BibleContext';
import Button from '../ui/Button';
import { BibleVerse as BibleVerseType } from '../../lib/bible';

interface BibleChapterProps {
  book: string;
  chapter: number;
  verses: BibleVerseType[];
}

const BibleChapter: React.FC<BibleChapterProps> = ({
  book,
  chapter,
  verses,
}) => {
  const { goToNextChapter, goToPreviousChapter, isDarkMode } = useBible();
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  // Function to scroll to a specific verse
  const scrollToVerse = (verseNumber: number) => {
    setHighlightedVerse(verseNumber);

    // After a short delay, remove the highlight
    setTimeout(() => {
      setHighlightedVerse(null);
    }, 3000);
  };

  return (
    <div className={`bible-chapter ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {book} {chapter}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousChapter}
            aria-label="Previous chapter"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextChapter}
            aria-label="Next chapter"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        {verses.map((verse) => (
          <BibleVerse
            key={verse.verse}
            book={book}
            chapter={chapter}
            verseNumber={verse.verse}
            text={verse.text}
            isHighlighted={highlightedVerse === verse.verse}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousChapter}
          aria-label="Previous chapter"
        >
          Previous Chapter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextChapter}
          aria-label="Next chapter"
        >
          Next Chapter
        </Button>
      </div>
    </div>
  );
};

export default BibleChapter;
