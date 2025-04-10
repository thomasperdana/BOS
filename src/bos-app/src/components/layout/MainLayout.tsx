import React from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Bible Operating System
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/bible" className="hover:underline">
              Bible
            </Link>
            <Link href="/study" className="hover:underline">
              Study
            </Link>
            <Link href="/community" className="hover:underline">
              Community
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
      <footer className="bg-gray-100 p-4">
        <div className="container mx-auto text-center text-gray-600">
          <p>Bible Operating System (BOS) &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-1">All scripture from the King James Version</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
