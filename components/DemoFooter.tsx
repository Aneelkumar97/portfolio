'use client';

import React from 'react';

export default function DemoFooter() {
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
          {/* About Demos */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              &lt;Learn With Aneel /&gt;
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              A comprehensive showcase of React and JavaScript expertise through interactive demonstrations
              and real-world code examples.
            </p>
            <p className="text-xs text-gray-500">
              Built with Next.js 14, React 19, TypeScript, and Tailwind CSS
            </p>
          </div>

          {/* React Concepts */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">React Concepts Covered</h4>
            <div className="flex flex-wrap gap-2">
              {concepts.react.slice(0, 12).map((concept) => (
                <span
                  key={concept}
                  className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-blue-900 transition-colors"
                >
                  {concept}
                </span>
              ))}
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded">
                +{concepts.react.length - 12} more concepts
              </span>
            </div>
          </div>

          {/* JavaScript Concepts */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">JavaScript Concepts Covered</h4>
            <div className="flex flex-wrap gap-2">
              {concepts.javascript.slice(0, 12).map((concept) => (
                <span
                  key={concept}
                  className="text-xs px-2 py-1 bg-gray-800 rounded hover:bg-yellow-900 transition-colors"
                >
                  {concept}
                </span>
              ))}
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded">
                +{concepts.javascript.length - 12} more concepts
              </span>
            </div>
          </div>
        </div>

        {/* Technologies & Patterns Demonstrated */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            Technologies & Patterns Demonstrated
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h5 className="text-white font-semibold mb-2">State Management</h5>
              <ul className="space-y-1 text-xs">
                <li>• Context API</li>
                <li>• useReducer</li>
                <li>• Custom Hooks</li>
                <li>• Local Storage</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Performance</h5>
              <ul className="space-y-1 text-xs">
                <li>• React.memo</li>
                <li>• useMemo/useCallback</li>
                <li>• Code Splitting</li>
                <li>• Lazy Loading</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Advanced Patterns</h5>
              <ul className="space-y-1 text-xs">
                <li>• HOC</li>
                <li>• Render Props</li>
                <li>• Compound Components</li>
                <li>• Error Boundaries</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">JavaScript</h5>
              <ul className="space-y-1 text-xs">
                <li>• Design Patterns</li>
                <li>• Functional Programming</li>
                <li>• Async Patterns</li>
                <li>• Modern ES6+</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Interactive Demos. Built with ❤️ using React & Next.js
          </p>
          <div className="flex items-center gap-6">
            <a href="/about" className="text-sm hover:text-purple-400 transition-colors">
              About Me
            </a>
            <a href="/" className="text-sm hover:text-purple-400 transition-colors">
              Home
            </a>
            <a href="https://github.com/Aneelkumar97/portfolio" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-purple-400 transition-colors">
              View Source
            </a>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-700">
            💡 Fun fact: This demo section showcases {concepts.react.length + concepts.javascript.length}+ concepts!
          </p>
        </div>
      </div>
    </footer>
  );
}
