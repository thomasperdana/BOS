import React from 'react';
import BibleVerse from './BibleVerse';

interface Verse {
  number: number;
  text: string;
}

interface BibleChapterProps {
  book: string;
  chapter: number;
  verses: Verse[];
}

const BibleChapter: React.FC<BibleChapterProps> = ({
  book,
  chapter,
  verses,
}) => {
  return (
    <div className="bible-chapter">
      <h2 className="text-2xl font-bold mb-4">{book} {chapter}</h2>
      <div className="prose max-w-none">
        {verses.map((verse) => (
          <BibleVerse
            key={verse.number}
            verseNumber={verse.number}
            text={verse.text}
          />
        ))}
      </div>
    </div>
  );
};

export default BibleChapter;
