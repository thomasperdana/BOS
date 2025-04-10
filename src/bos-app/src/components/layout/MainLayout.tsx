import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from '../auth/AuthButton';
import SkipToContent from '../ui/SkipToContent';
import AccessibilityMenu from '../ui/AccessibilityMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Load user preferences from localStorage on initial render
  useEffect(() => {
    // Dark mode
    const savedDarkMode = localStorage.getItem('bos-dark-mode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }

    // Font size
    const savedFontSize = localStorage.getItem('bos-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }

    // High contrast
    const savedHighContrast = localStorage.getItem('bos-high-contrast');
    if (savedHighContrast) {
      setHighContrast(savedHighContrast === 'true');
    }

    // Reduce motion
    const savedReduceMotion = localStorage.getItem('bos-reduce-motion');
    if (savedReduceMotion) {
      setReduceMotion(savedReduceMotion === 'true');
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

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply reduced motion
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('bos-dark-mode', newMode.toString());
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    localStorage.setItem('bos-font-size', size.toString());
  };

  const handleContrastChange = (contrast: boolean) => {
    setHighContrast(contrast);
    localStorage.setItem('bos-high-contrast', contrast.toString());
  };

  const handleMotionChange = (motion: boolean) => {
    setReduceMotion(motion);
    localStorage.setItem('bos-reduce-motion', motion.toString());
  };

  return (
    <div className={`min-h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors ${reduceMotion ? 'transition-none' : 'duration-200'} ${highContrast ? 'high-contrast' : ''}`}>
      <SkipToContent />

      <header className="bg-blue-800 dark:bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold mb-2 sm:mb-0">
            Bible Operating System
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex space-x-4" aria-label="Main Navigation">
              <Link href="/" className={`hover:underline ${pathname === '/' ? 'font-semibold aria-current="page"' : ''}`}>
                Home
              </Link>
              <Link href="/bible" className={`hover:underline ${pathname === '/bible' ? 'font-semibold aria-current="page"' : ''}`}>
                Bible
              </Link>
              <Link href="/study" className={`hover:underline ${pathname === '/study' ? 'font-semibold aria-current="page"' : ''}`}>
                Study
              </Link>
              <Link href="/community" className={`hover:underline ${pathname === '/community' ? 'font-semibold aria-current="page"' : ''}`}>
                Community
              </Link>
              <Link href="/profile" className={`hover:underline ${pathname === '/profile' ? 'font-semibold aria-current="page"' : ''}`}>
                Profile
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <AccessibilityMenu
                onFontSizeChange={handleFontSizeChange}
                onContrastChange={handleContrastChange}
                onMotionChange={handleMotionChange}
                currentFontSize={fontSize}
                highContrast={highContrast}
                reduceMotion={reduceMotion}
              />
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow container mx-auto p-4" style={{ fontSize: `${fontSize}px` }}>
        {children}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 p-4 shadow-inner">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p>Bible Operating System (BOS) &copy; {new Date().getFullYear()}</p>
              <p className="text-sm mt-1">All scripture from the King James Version</p>
            </div>
            <div className="mt-4 md:mt-0">
              <nav className="flex flex-wrap justify-center gap-4" aria-label="Footer Navigation">
                <Link href="/" className="text-sm hover:underline">Home</Link>
                <Link href="/bible" className="text-sm hover:underline">Bible</Link>
                <Link href="/study" className="text-sm hover:underline">Study</Link>
                <Link href="/community" className="text-sm hover:underline">Community</Link>
                <Link href="/community/guidelines" className="text-sm hover:underline">Guidelines</Link>
                <Link href="/profile" className="text-sm hover:underline">Profile</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
