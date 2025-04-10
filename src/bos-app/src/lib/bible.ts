import bibleData from '../data/kjv-bible.json';

export interface BibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleReference {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
}

// Type assertion for the imported Bible data
const typedBibleData = bibleData as BibleBook[];

/**
 * Get all books of the Bible
 * @returns Array of Bible books with name and abbreviation
 */
export function getAllBooks(): { name: string; abbrev: string }[] {
  return typedBibleData.map(book => ({
    name: book.name,
    abbrev: book.abbrev
  }));
}

/**
 * Get a specific book of the Bible
 * @param bookName Name or abbreviation of the book
 * @returns The book object or undefined if not found
 */
export function getBook(bookName: string): BibleBook | undefined {
  const normalizedName = bookName.toLowerCase().trim();
  
  return typedBibleData.find(
    book => 
      book.name.toLowerCase() === normalizedName || 
      book.abbrev.toLowerCase() === normalizedName
  );
}

/**
 * Get a specific chapter from a book
 * @param bookName Name or abbreviation of the book
 * @param chapterNum Chapter number (1-based)
 * @returns The chapter as an array of verses or undefined if not found
 */
export function getChapter(bookName: string, chapterNum: number): BibleChapter | undefined {
  const book = getBook(bookName);
  
  if (!book || chapterNum < 1 || chapterNum > book.chapters.length) {
    return undefined;
  }
  
  const chapterVerses = book.chapters[chapterNum - 1];
  
  return {
    book: book.name,
    chapter: chapterNum,
    verses: chapterVerses.map((text, index) => ({
      book: book.name,
      chapter: chapterNum,
      verse: index + 1,
      text
    }))
  };
}

/**
 * Get a specific verse from a chapter
 * @param bookName Name or abbreviation of the book
 * @param chapterNum Chapter number (1-based)
 * @param verseNum Verse number (1-based)
 * @returns The verse object or undefined if not found
 */
export function getVerse(bookName: string, chapterNum: number, verseNum: number): BibleVerse | undefined {
  const chapter = getChapter(bookName, chapterNum);
  
  if (!chapter || verseNum < 1 || verseNum > chapter.verses.length) {
    return undefined;
  }
  
  return chapter.verses[verseNum - 1];
}

/**
 * Parse a Bible reference string (e.g., "John 3:16" or "Genesis 1:1-10")
 * @param reference The reference string to parse
 * @returns A BibleReference object or undefined if invalid
 */
export function parseReference(reference: string): BibleReference | undefined {
  // Basic regex to match common Bible reference formats
  const regex = /^(\d?\s?[a-zA-Z]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/;
  const match = reference.match(regex);
  
  if (!match) return undefined;
  
  const [, book, chapter, verse, endVerse] = match;
  
  // Verify the book exists
  const bookObj = getBook(book);
  if (!bookObj) return undefined;
  
  const result: BibleReference = {
    book: bookObj.name,
    chapter: parseInt(chapter, 10)
  };
  
  if (verse) {
    result.verse = parseInt(verse, 10);
  }
  
  if (endVerse) {
    result.endVerse = parseInt(endVerse, 10);
  }
  
  return result;
}

/**
 * Get verses from a Bible reference
 * @param reference The reference object or string
 * @returns Array of verse objects
 */
export function getVersesByReference(reference: BibleReference | string): BibleVerse[] {
  let ref: BibleReference;
  
  if (typeof reference === 'string') {
    const parsedRef = parseReference(reference);
    if (!parsedRef) return [];
    ref = parsedRef;
  } else {
    ref = reference;
  }
  
  const chapter = getChapter(ref.book, ref.chapter);
  if (!chapter) return [];
  
  // If no verse is specified, return the whole chapter
  if (!ref.verse) {
    return chapter.verses;
  }
  
  // If a verse range is specified, return the range
  if (ref.endVerse && ref.endVerse >= ref.verse) {
    return chapter.verses.slice(ref.verse - 1, ref.endVerse);
  }
  
  // Return a single verse
  const verse = getVerse(ref.book, ref.chapter, ref.verse);
  return verse ? [verse] : [];
}

/**
 * Search the Bible for a specific term
 * @param searchTerm The term to search for
 * @param options Search options (case sensitivity, whole word, etc.)
 * @returns Array of matching verses
 */
export function searchBible(
  searchTerm: string, 
  options: { caseSensitive?: boolean; wholeWord?: boolean; limit?: number } = {}
): BibleVerse[] {
  const { caseSensitive = false, wholeWord = false, limit = 100 } = options;
  
  const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();
  const results: BibleVerse[] = [];
  
  for (const book of typedBibleData) {
    for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex++) {
      const chapter = book.chapters[chapterIndex];
      
      for (let verseIndex = 0; verseIndex < chapter.length; verseIndex++) {
        const verseText = chapter[verseIndex];
        const searchText = caseSensitive ? verseText : verseText.toLowerCase();
        
        let match = false;
        
        if (wholeWord) {
          const regex = new RegExp(`\\b${term}\\b`, caseSensitive ? '' : 'i');
          match = regex.test(searchText);
        } else {
          match = searchText.includes(term);
        }
        
        if (match) {
          results.push({
            book: book.name,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            text: verseText
          });
          
          if (results.length >= limit) {
            return results;
          }
        }
      }
    }
  }
  
  return results;
}

/**
 * Get the number of chapters in a book
 * @param bookName Name or abbreviation of the book
 * @returns Number of chapters or 0 if book not found
 */
export function getChapterCount(bookName: string): number {
  const book = getBook(bookName);
  return book ? book.chapters.length : 0;
}

/**
 * Get the number of verses in a chapter
 * @param bookName Name or abbreviation of the book
 * @param chapterNum Chapter number (1-based)
 * @returns Number of verses or 0 if chapter not found
 */
export function getVerseCount(bookName: string, chapterNum: number): number {
  const chapter = getChapter(bookName, chapterNum);
  return chapter ? chapter.verses.length : 0;
}

/**
 * Get the next chapter reference
 * @param bookName Current book name
 * @param chapterNum Current chapter number
 * @returns The next chapter reference or undefined if at the end of the Bible
 */
export function getNextChapter(bookName: string, chapterNum: number): { book: string; chapter: number } | undefined {
  const book = getBook(bookName);
  if (!book) return undefined;
  
  // If not the last chapter of the book
  if (chapterNum < book.chapters.length) {
    return { book: book.name, chapter: chapterNum + 1 };
  }
  
  // Find the index of the current book
  const bookIndex = typedBibleData.findIndex(b => b.name === book.name);
  
  // If not the last book of the Bible
  if (bookIndex < typedBibleData.length - 1) {
    const nextBook = typedBibleData[bookIndex + 1];
    return { book: nextBook.name, chapter: 1 };
  }
  
  // At the end of the Bible
  return undefined;
}

/**
 * Get the previous chapter reference
 * @param bookName Current book name
 * @param chapterNum Current chapter number
 * @returns The previous chapter reference or undefined if at the beginning of the Bible
 */
export function getPreviousChapter(bookName: string, chapterNum: number): { book: string; chapter: number } | undefined {
  const book = getBook(bookName);
  if (!book) return undefined;
  
  // If not the first chapter of the book
  if (chapterNum > 1) {
    return { book: book.name, chapter: chapterNum - 1 };
  }
  
  // Find the index of the current book
  const bookIndex = typedBibleData.findIndex(b => b.name === book.name);
  
  // If not the first book of the Bible
  if (bookIndex > 0) {
    const prevBook = typedBibleData[bookIndex - 1];
    return { book: prevBook.name, chapter: prevBook.chapters.length };
  }
  
  // At the beginning of the Bible
  return undefined;
}

export default {
  getAllBooks,
  getBook,
  getChapter,
  getVerse,
  parseReference,
  getVersesByReference,
  searchBible,
  getChapterCount,
  getVerseCount,
  getNextChapter,
  getPreviousChapter
};
