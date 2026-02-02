'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, memo, lazy, Suspense, createContext, useContext } from 'react';
import { useDebounce, useThrottle, useLocalStorage, usePrevious, useToggle } from '@/hooks/useCustomHooks';
import { IconTooltip } from './Tooltip';
import { getConceptDetails } from '@/utils/conceptDetails';

// Context for useContext demo
const DemoContext = createContext<{ message: string; updateMessage: (msg: string) => void } | null>(null);

// Demonstrating React.memo for performance optimization
const MemoizedCard = memo(({ title, content, count }: { title: string; content: string; count: number }) => {
  console.log(`Rendering ${title}`);
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-700 dark:text-gray-300">{content}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Render count: {count}</p>
    </div>
  );
});

MemoizedCard.displayName = 'MemoizedCard';

// Component that consumes context
function ContextConsumer() {
  const context = useContext(DemoContext);
  if (!context) return null;
  
  
  return (
    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        <strong>Message from Context:</strong>
      </p>
      <p className="text-gray-900 dark:text-white font-semibold">
        {context.message || 'No message yet...'}
      </p>
    </div>
  );
}

export default function ReactHooksDemo() {
  // useState - Basic state management
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Context state for useContext demo
  const [contextMessage, setContextMessage] = useState('Hello from Context!');
  
  // useDebounce custom hook
  const debouncedText = useDebounce(text, 500);
  
  // useThrottle custom hook
  const [throttleCount, setThrottleCount] = useState(0);
  const throttledCount = useThrottle(throttleCount, 1000);
  
  // useLocalStorage custom hook
  const [savedValue, setSavedValue] = useLocalStorage('demo-key', '');
  
  // useToggle custom hook
  const [isVisible, toggleVisible] = useToggle(false);
  
  // usePrevious custom hook
  const previousCount = usePrevious(count);
  
  // useRef - Persist values without re-render
  const renderCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // useMemo - Expensive computation memoization
  const expensiveCalculation = useMemo(() => {
    console.log('Running expensive calculation...');
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += i;
    }
    return result;
  }, [count]);
  
  // useCallback - Memoize callback functions
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const handleReset = useCallback(() => {
    setCount(0);
    setText('');
  }, []);
  
  // useEffect - Side effects
  useEffect(() => {
    renderCount.current += 1;
    console.log('Component rendered:', renderCount.current);
  });
  
  useEffect(() => {
    document.title = `Count: ${count}`;
    
    return () => {
      console.log('Cleanup from count effect');
    };
  }, [count]);
  
  useEffect(() => {
    if (debouncedText) {
      console.log('Debounced search:', debouncedText);
    }
  }, [debouncedText]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <DemoContext.Provider value={{ message: contextMessage, updateMessage: setContextMessage }}>
      <section id="react" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            React Hooks Mastery
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Comprehensive demonstration of all React hooks and patterns
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* useState Demo */}
          <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useState
              <IconTooltip 
                content="State management hook for functional components. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useState')}
              />
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Current count: {count}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Previous count: {previousCount ?? 'N/A'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Increment
              </button>
              <button
                onClick={() => setCount(prev => prev - 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Decrement
              </button>
            </div>
          </div>

          {/* useRef Demo */}
          <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useRef
              <IconTooltip 
                content="Mutable ref object for DOM access and persistent values. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useRef')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Renders: {renderCount.current} (useRef persists without triggering re-renders)
            </p>
            <input
              ref={inputRef}
              type="text"
              placeholder="Focus me!"
              className="w-full px-3 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={focusInput}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full"
            >
              Focus Input
            </button>
          </div>

          {/* useMemo Demo */}
          <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useMemo
              <IconTooltip 
                content="Memoizes expensive calculations. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useMemo')}
              />
            </h3>
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg mb-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                <strong>Calculation:</strong> Sum of {(count * 1000000).toLocaleString()} iterations
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                (count × 1,000,000 loop operations)
              </p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Result: <span className="font-mono text-pink-600 dark:text-pink-400">{expensiveCalculation.toExponential(2)}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              💡 Only recalculates when count changes. Check console for "Running expensive calculation..." log.
            </p>
          </div>

          {/* useCallback Demo */}
          <div className="p-6 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useCallback
              <IconTooltip 
                content="Memoizes callback functions to optimize child components. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useCallback')}
              />
            </h3>
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>💡 What's happening:</strong> The handleReset function is wrapped in useCallback, maintaining the same reference across re-renders.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>📊 Benefit:</strong> The MemoizedCard below only re-renders when the count prop changes, not when this parent component re-renders.
              </p>
            </div>
            <MemoizedCard
              title="Memoized Component"
              content="I only re-render when my props change"
              count={count}
            />
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
            >
              Reset All (useCallback wrapped)
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Check console to see render logs. Without useCallback, child would re-render unnecessarily.
            </p>
          </div>

          {/* useDebounce Demo */}
          <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useDebounce
              <IconTooltip 
                content="Delays value updates until user stops typing. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useDebounce')}
              />
            </h3>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-3 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Debounced: {debouncedText}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Updates 500ms after typing stops
            </p>
          </div>

          {/* useThrottle Demo */}
          <div className="p-6 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useThrottle
              <IconTooltip 
                content="Limits value updates to once per interval. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useThrottle')}
              />
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Clicks: {throttleCount}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Throttled: {throttledCount}
            </p>
            <button
              onClick={() => setThrottleCount(prev => prev + 1)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full"
            >
              Click Fast!
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Throttled value updates max once per second
            </p>
          </div>

          {/* useLocalStorage Demo */}
          <div className="p-6 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useLocalStorage
              <IconTooltip 
                content="Syncs state with localStorage for persistence. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useLocalStorage')}
              />
            </h3>
            <input
              type="text"
              value={savedValue}
              onChange={(e) => setSavedValue(e.target.value)}
              placeholder="Persists in localStorage"
              className="w-full px-3 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Try refreshing the page - value persists!
            </p>
          </div>

          {/* useToggle Demo */}
          <div className="p-6 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useToggle
              <IconTooltip 
                content="Custom hook that simplifies boolean state toggling. Built on useState, it returns [value, toggle] where toggle flips the boolean state."
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Custom hook pattern: const [value, toggle] = useToggle(false)
            </p>
            <button
              onClick={toggleVisible}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition w-full mb-4"
            >
              Toggle Content
            </button>
            {isVisible && (
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg animate-fade-in">
                <p className="text-gray-700 dark:text-gray-300">
                  🎉 Hidden content revealed!
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              A reusable pattern for boolean toggles
            </p>
          </div>

          {/* useContext Demo */}
          <div className="p-6 bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useContext
              <IconTooltip 
                content="Accesses context values without prop drilling. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useContext')}
              />
            </h3>
            
            {/* Instructions */}
            <div className="mb-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded border border-cyan-200 dark:border-cyan-800">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                📚 <strong>How it works:</strong> The input and display are separate components, but share data through Context - no props passed!
              </p>
            </div>

            <input
              type="text"
              value={contextMessage}
              onChange={(e) => setContextMessage(e.target.value)}
              placeholder="Update context message..."
              className="w-full px-3 py-2 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            
            <ContextConsumer />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
              💡 Child component reads context without props - eliminates prop drilling!
            </p>
          </div>

          {/* useEffect Demo */}
          <div className="p-6 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              useEffect
              <IconTooltip 
                content="Handles side effects in functional components. Click to see full implementation details and code examples."
                conceptDetails={getConceptDetails('useEffect')}
              />
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Check browser title and console
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Document title updates with count
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Open DevTools to see cleanup logs
            </p>
          </div>
        </div>
      </div>
      </section>
    </DemoContext.Provider>
  );
}
