import { 
  getBooks, 
  getChapters, 
  getVersesByReference, 
  parseReference,
  searchBible
} from '../bible';

// Mock the Bible data
jest.mock('../../data/kjv-bible.json', () => [
  {
    "abbrev": "Gen",
    "name": "Genesis",
    "chapters": [
      {
        "chapter": 1,
        "verses": [
          {
            "verse": 1,
            "text": "In the beginning God created the heaven and the earth."
          },
          {
            "verse": 2,
            "text": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
          }
        ]
      },
      {
        "chapter": 2,
        "verses": [
          {
            "verse": 1,
            "text": "Thus the heavens and the earth were finished, and all the host of them."
          }
        ]
      }
    ]
  },
  {
    "abbrev": "John",
    "name": "John",
    "chapters": [
      {
        "chapter": 1,
        "verses": [
          {
            "verse": 1,
            "text": "In the beginning was the Word, and the Word was with God, and the Word was God."
          }
        ]
      },
      {
        "chapter": 3,
        "verses": [
          {
            "verse": 16,
            "text": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
          }
        ]
      }
    ]
  }
], { virtual: true });

describe('Bible Utility Functions', () => {
  describe('getBooks', () => {
    it('should return a list of all Bible books', () => {
      const books = getBooks();
      expect(books).toHaveLength(2);
      expect(books[0].name).toBe('Genesis');
      expect(books[1].name).toBe('John');
    });
  });

  describe('getChapters', () => {
    it('should return chapters for a valid book', () => {
      const chapters = getChapters('Genesis');
      expect(chapters).toHaveLength(2);
      expect(chapters[0].chapter).toBe(1);
      expect(chapters[1].chapter).toBe(2);
    });

    it('should return empty array for an invalid book', () => {
      const chapters = getChapters('InvalidBook');
      expect(chapters).toHaveLength(0);
    });
  });

  describe('getVersesByReference', () => {
    it('should return verses for a valid book and chapter', () => {
      const verses = getVersesByReference({ book: 'Genesis', chapter: 1 });
      expect(verses).toHaveLength(2);
      expect(verses[0].verse).toBe(1);
      expect(verses[0].text).toBe('In the beginning God created the heaven and the earth.');
    });

    it('should return a specific verse when verse is specified', () => {
      const verses = getVersesByReference({ book: 'Genesis', chapter: 1, verse: 2 });
      expect(verses).toHaveLength(1);
      expect(verses[0].verse).toBe(2);
      expect(verses[0].text).toBe('And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.');
    });

    it('should return a range of verses when endVerse is specified', () => {
      const verses = getVersesByReference({ book: 'Genesis', chapter: 1, verse: 1, endVerse: 2 });
      expect(verses).toHaveLength(2);
      expect(verses[0].verse).toBe(1);
      expect(verses[1].verse).toBe(2);
    });

    it('should return empty array for an invalid reference', () => {
      const verses = getVersesByReference({ book: 'InvalidBook', chapter: 1 });
      expect(verses).toHaveLength(0);
    });
  });

  describe('parseReference', () => {
    it('should parse a simple book and chapter reference', () => {
      const reference = parseReference('Genesis 1');
      expect(reference).toEqual({ book: 'Genesis', chapter: 1 });
    });

    it('should parse a book, chapter, and verse reference', () => {
      const reference = parseReference('John 3:16');
      expect(reference).toEqual({ book: 'John', chapter: 3, verse: 16 });
    });

    it('should parse a book, chapter, and verse range reference', () => {
      const reference = parseReference('Genesis 1:1-2');
      expect(reference).toEqual({ book: 'Genesis', chapter: 1, verse: 1, endVerse: 2 });
    });

    it('should handle abbreviations', () => {
      const reference = parseReference('Gen 1:1');
      expect(reference).toEqual({ book: 'Genesis', chapter: 1, verse: 1 });
    });

    it('should return null for invalid references', () => {
      const reference = parseReference('Invalid Reference');
      expect(reference).toBeNull();
    });
  });

  describe('searchBible', () => {
    it('should find verses containing the search term', () => {
      const results = searchBible('beginning');
      expect(results).toHaveLength(2);
      expect(results[0].text).toContain('beginning');
      expect(results[1].text).toContain('beginning');
    });

    it('should respect case sensitivity when specified', () => {
      const results = searchBible('Beginning', { caseSensitive: true });
      expect(results).toHaveLength(0);
    });

    it('should match whole words when specified', () => {
      const results = searchBible('the', { wholeWord: true });
      expect(results.length).toBeGreaterThan(0);
      results.forEach(result => {
        // Check that "the" is surrounded by word boundaries
        expect(result.text.match(/\bthe\b/i)).not.toBeNull();
      });
    });

    it('should return empty array when no matches are found', () => {
      const results = searchBible('nonexistentterm');
      expect(results).toHaveLength(0);
    });
  });
});
