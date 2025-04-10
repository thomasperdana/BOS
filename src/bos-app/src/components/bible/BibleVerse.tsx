import React from 'react';

interface BibleVerseProps {
  verseNumber: number;
  text: string;
  isHighlighted?: boolean;
}

const BibleVerse: React.FC<BibleVerseProps> = ({
  verseNumber,
  text,
  isHighlighted = false,
}) => {
  return (
    <p className={`mb-2 ${isHighlighted ? 'bg-yellow-100 p-1 rounded' : ''}`}>
      <sup className="font-semibold text-blue-700 mr-1">{verseNumber}</sup>
      <span>{text}</span>
    </p>
  );
};

export default BibleVerse;
