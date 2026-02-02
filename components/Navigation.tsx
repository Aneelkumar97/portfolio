'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useApp } from '@/contexts/AppContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useApp();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'About', href: '/about', section: 'about' },
    { label: 'Experience', href: '/career', section: 'career' },
    { label: 'Learn with Me', href: '/learn-with-aneel', section: 'demos' },
  ];

  const handleMenuClick = (section: string) => {
    dispatch({ type: 'SET_SECTION', payload: section });
    dispatch({ type: 'INCREMENT_INTERACTION' });
    setIsOpen(false);
  };

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const getHeaderTitle = () => {
    if (pathname === '/about') return '&lt;LearnAboutAneel /&gt;';
    if (pathname.startsWith('/career')) return '&lt;CareerJourney /&gt;';
    if (pathname.startsWith('/learn-with-aneel')) return '&lt;LearnWithAneel /&gt;';
    if (pathname === '/learn') return '&lt;ChooseYourPath /&gt;';
    return '&lt;Home /&gt;';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => handleMenuClick('home')}
              aria-label="Go to home"
              title="Home"
            >
              🏠
            </Link>
            <div
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              dangerouslySetInnerHTML={{ __html: getHeaderTitle() }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.section}
                href={item.href}
                onClick={() => handleMenuClick(item.section)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer ${
                  isActive(item.href)
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Toggle theme"
              title={`Current: ${theme} mode`}
            >
              {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.section}
                href={item.href}
                onClick={() => handleMenuClick(item.section)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  isActive(item.href)
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
            User Interactions: {state.userInteractions}
          </div>
        </div>
      )}
    </nav>
  );
}
