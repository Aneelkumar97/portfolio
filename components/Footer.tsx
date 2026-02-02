'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const concepts = {
    react: [
      'useState', 'useEffect', 'useContext', 'useReducer', 'useMemo', 'useCallback',
      'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useTransition', 'useDeferredValue',
      'Error Boundaries', 'Suspense', 'Lazy Loading', 'Portals', 'HOC', 'Render Props',
      'Compound Components', 'Custom Hooks', 'Context API', 'Server Components'
    ],
    javascript: [
      'Closures', 'Currying', 'Memoization', 'Debounce', 'Throttle', 'Promises',
      'Async/Await', 'Generators', 'Iterators', 'Proxy', 'Reflect', 'Symbols',
      'Map/Set', 'WeakMap/WeakSet', 'Design Patterns', 'ES6+', 'Event Loop',
      'Prototypes', 'Classes', 'Modules'
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              &lt;LearnAboutAneel /&gt;
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Senior Frontend Engineer with 7+ years of experience building scalable,
              high-performance web applications for diverse clients worldwide.
            </p>
            <p className="text-xs text-gray-500">
              Built with Next.js 14, React 19, TypeScript, and Tailwind CSS
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#projects" className="text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  → Featured Projects (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  → Get In Touch
                </a>
              </li>
              <li>
                <a href="/learn-with-aneel" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2">
                  → Learn With Me
                </a>
              </li>
              <li>
                <a href="https://github.com/Aneelkumar97" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  → GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/g-aneel-kumar" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-purple-400 transition-colors flex items-center gap-2">
                  → LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Core Expertise */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Core Expertise</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full">
                React.js
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full">
                TypeScript
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full">
                Next.js
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-full">
                JavaScript
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-full">
                Node.js
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full">
                Redux
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full">
                GraphQL
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full">
                REST APIs
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-full">
                Tailwind CSS
              </span>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full">
                Git/CI/CD
              </span>
            </div>
          </div>
        </div>

        {/* Services & Specializations */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            What I Can Help You With
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h5 className="text-white font-semibold mb-2">Frontend Development</h5>
              <ul className="space-y-1 text-xs">
                <li>• React Applications</li>
                <li>• Single Page Apps</li>
                <li>• Progressive Web Apps</li>
                <li>• Responsive Design</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Performance</h5>
              <ul className="space-y-1 text-xs">
                <li>• Code Optimization</li>
                <li>• Bundle Size Reduction</li>
                <li>• Load Time Improvement</li>
                <li>• Core Web Vitals</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Architecture</h5>
              <ul className="space-y-1 text-xs">
                <li>• Scalable Solutions</li>
                <li>• Code Refactoring</li>
                <li>• Design Patterns</li>
                <li>• Best Practices</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Consulting</h5>
              <ul className="space-y-1 text-xs">
                <li>• Tech Stack Selection</li>
                <li>• Code Reviews</li>
                <li>• Team Mentoring</li>
                <li>• Project Planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Portfolio. Built with ❤️ using React & Next.js
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-sm hover:text-purple-400 transition-colors">
              Back to Top ↑
            </a>
            <a href="https://github.com/Aneelkumar97/portfolio" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-purple-400 transition-colors">
              View Source
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-700">
            💼 Available for freelance projects and consulting opportunities
          </p>
        </div>
      </div>
    </footer>
  );
}
