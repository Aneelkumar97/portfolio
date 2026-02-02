'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
      {/* Theme Toggle Button */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer pointer-events-auto"
              aria-label="Toggle theme"
              title={`Current: ${theme} mode`}
            >
              {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
            </button>
          </div>
        </div>
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Floating Emoji Decorations */}
        <div className="absolute -top-20 -left-20 text-6xl animate-bounce animation-delay-1000 opacity-70">
          🚀
        </div>
        <div className="absolute -top-16 -right-16 text-5xl animate-bounce animation-delay-2000 opacity-70">
          ✨
        </div>
        <div className="absolute top-32 -left-24 text-5xl animate-pulse animation-delay-3000 opacity-60">
          🎯
        </div>
        <div className="absolute top-40 -right-20 text-6xl animate-pulse animation-delay-1500 opacity-60">
          💡
        </div>
        <div className="absolute -bottom-12 left-16 text-5xl animate-bounce animation-delay-2500 opacity-70">
          🎨
        </div>
        <div className="absolute -bottom-16 right-20 text-6xl animate-bounce animation-delay-500 opacity-70">
          🔥
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            &lt;WhatAwaitsYou /&gt;
          </span>
        </h1>
        
        <p className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-12 animate-fade-in-up animation-delay-200">
          Two paths. One adventure. 🗺️
        </p>

        <button
          onClick={() => router.push('/learn')}
          className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-fade-in-up animation-delay-400"
        >
          <span className="relative z-10 flex items-center gap-3">
            Discover Now 🎁
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm animate-fade-in-up animation-delay-600">
          ✨ Something special is waiting for you... 🎪
        </p>
      </div>
    </main>
  );
}
