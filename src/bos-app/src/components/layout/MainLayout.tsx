import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if dark mode is enabled in localStorage on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('bos-dark-mode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Apply dark mode to the document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('bos-dark-mode', newMode.toString());
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <header className="bg-blue-800 dark:bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold mb-2 sm:mb-0">
            Bible Operating System
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex space-x-4">
              <Link href="/" className={`hover:underline ${pathname === '/' ? 'font-semibold' : ''}`}>
                Home
              </Link>
              <Link href="/bible" className={`hover:underline ${pathname === '/bible' ? 'font-semibold' : ''}`}>
                Bible
              </Link>
              <Link href="/study" className={`hover:underline ${pathname === '/study' ? 'font-semibold' : ''}`}>
                Study
              </Link>
              <Link href="/community" className={`hover:underline ${pathname === '/community' ? 'font-semibold' : ''}`}>
                Community
              </Link>
            </nav>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 p-4 shadow-inner">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
          <p>Bible Operating System (BOS) &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-1">All scripture from the King James Version</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
