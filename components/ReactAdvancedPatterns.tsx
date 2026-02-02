'use client';

import React, { Component, ReactNode, ErrorInfo, Suspense, lazy, useState, startTransition, useDeferredValue, useTransition } from 'react';
import { IconTooltip } from './Tooltip';
import { getConceptDetails } from '@/utils/conceptDetails';

// Lazy loaded component - will create a separate chunk in the build
const LazyComponent = lazy(() => import('./LazyLoadedComponent'));

// Error Boundary Class Component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-100 dark:bg-red-900 rounded-lg border-2 border-red-300 dark:border-red-700">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
              ⚠️ Error Boundary Caught an Error
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Reset Error Boundary
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Component that throws error for demonstration
function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Intentional error for Error Boundary demo!');
  }
  return <div className="text-green-600 dark:text-green-400">✓ Component rendered successfully!</div>;
}

// Loading fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
  );
}

// Simple item component
function PostItem({ id, title }: { id: number; title: string }) {
  return (
    <div className="p-2 bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500 mb-1">
      <div className="font-semibold text-xs text-gray-800 dark:text-gray-200">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">Post #{id} • 5 min read • By Author {id % 10}</div>
      <div className="text-xs text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipiscing...</div>
    </div>
  );
}

// Component demonstrating useTransition
function TransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<Array<{id: number; title: string}>>([]);
  const [useTransitionEnabled, setUseTransitionEnabled] = useState(true);

  // Generate posts for rendering - 5000 is enough to show lag without hanging
  const generatePosts = (category: string) => {
    return Array.from({ length: 5000 }, (_, i) => ({
      id: i,
      title: `${category} Post #${i} - Lorem ipsum dolor sit amet consectetur adipiscing elit`
    }));
  };

  const handleLoadPosts = (category: string) => {
    if (useTransitionEnabled) {
      // With useTransition - other interactions (like counter) stay responsive
      startTransition(() => {
        setPosts(generatePosts(category));
      });
    } else {
      // Without useTransition - blocks everything including counter
      setPosts(generatePosts(category));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900 dark:to-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        useTransition
        <IconTooltip 
          content="useTransition marks state updates as non-urgent transitions. It keeps the UI responsive during expensive updates by allowing React to interrupt rendering, prioritizing user interactions over heavy computations."
          conceptDetails={getConceptDetails('useTransition')}
        />
      </h3>
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          <strong>🧪 The Key Test:</strong>
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded mb-2">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Click "Load Tech Posts" then IMMEDIATELY click the counter button multiple times:</p>
          <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5 list-decimal list-inside">
            <li><strong>WITHOUT useTransition:</strong>
              <ul className="ml-5 mt-1 space-y-0.5 list-disc">
                <li>Toggle to "❌ Without useTransition"</li>
                <li>Click "Load Tech Posts" → immediately spam click the counter</li>
                <li><strong className="text-red-600 dark:text-red-400">Counter freezes!</strong> Clicks don't register during rendering</li>
              </ul>
            </li>
            <li><strong>WITH useTransition:</strong>
              <ul className="ml-5 mt-1 space-y-0.5 list-disc">
                <li>Toggle to "✅ With useTransition"</li>
                <li>Click "Load Tech Posts" → immediately spam click the counter</li>
                <li><strong className="text-green-600 dark:text-green-400">Counter works!</strong> Clicks still register while rendering</li>
              </ul>
            </li>
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
            <p className="font-semibold text-green-700 dark:text-green-400">✅ With useTransition</p>
            <p className="text-gray-600 dark:text-gray-400">Other interactions stay responsive</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
            <p className="font-semibold text-red-700 dark:text-red-400">❌ Without useTransition</p>
            <p className="text-gray-600 dark:text-gray-400">Everything freezes during render</p>
          </div>
        </div>
      </div>
      
      <div className="mb-3 flex items-center gap-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useTransitionEnabled}
            onChange={(e) => setUseTransitionEnabled(e.target.checked)}
            className="mr-2"
          />
          <span className={`text-sm font-semibold ${useTransitionEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {useTransitionEnabled ? '✅ With useTransition' : '❌ Without useTransition'}
          </span>
        </label>
        {isPending && <span className="text-xs text-orange-600 dark:text-orange-400 animate-pulse">🔄 Rendering {posts.length} posts...</span>}
      </div>
      
      <div className="mb-3 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg border-2 border-blue-300 dark:border-blue-700">
        <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-2">
          👆 Test Interaction Responsiveness
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Click Me: {count}
          </button>
          <span className="text-xs text-gray-700 dark:text-gray-300">
            ← Try clicking this while loading posts!
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {['Tech', 'Business', 'Sports'].map(category => (
          <button
            key={category}
            onClick={() => handleLoadPosts(category)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Load {category} Posts
          </button>
        ))}
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Posts ({posts.length} total)
        </h4>
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {posts.length === 0 ? (
            <p className="text-xs text-gray-500 italic">Click a button above to load posts...</p>
          ) : (
            posts.map(post => (
              <PostItem key={post.id} id={post.id} title={post.title} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Component demonstrating useDeferredValue
function DeferredValueDemo() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  
  const items = Array.from({ length: 100 }, (_, i) => `${deferredText} ${i}`);

  return (
    <div className="p-6 bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900 dark:to-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        useDeferredValue
        <IconTooltip 
          content="useDeferredValue defers updating a value until more urgent updates are processed. It helps keep input responsive while rendering expensive lists or heavy components by allowing React to prioritize user input."
          conceptDetails={getConceptDetails('useDeferredValue')}
        />
      </h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        className="w-full px-3 py-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <div className="max-h-40 overflow-y-auto bg-white dark:bg-gray-700 rounded p-2">
        {items.map((item, i) => (
          <div key={i} className="text-xs text-gray-600 dark:text-gray-400">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-3 p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg border border-violet-200 dark:border-violet-700">
        <p className="text-sm font-semibold text-violet-900 dark:text-violet-200 mb-2">
          What to Observe:
        </p>
        <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
          <li>• <strong>Type quickly</strong> in the input field - notice it stays responsive</li>
          <li>• The <strong>input value updates immediately</strong> without lag</li>
          <li>• The <strong>list below updates with a slight delay</strong> (deferred)</li>
          <li>• React prioritizes your typing over rendering the expensive list</li>
          <li>• This prevents the UI from feeling sluggish during heavy renders</li>
        </ul>
      </div>
    </div>
  );
}

export default function ReactAdvancedPatterns() {
  const [showBuggy, setShowBuggy] = useState(false);
  const [showLazy, setShowLazy] = useState(false);

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Advanced React Patterns
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Error Boundaries, Suspense, Lazy Loading, Transitions & More
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Error Boundary Demo */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Error Boundary
              <IconTooltip 
                content="Catches JavaScript errors gracefully. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('errorBoundaries')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Catches JavaScript errors in child components
            </p>
            
            <ErrorBoundary>
              <BuggyComponent shouldThrow={showBuggy} />
            </ErrorBoundary>
            
            <button
              onClick={() => setShowBuggy(!showBuggy)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full"
            >
              {showBuggy ? 'Fix Component' : 'Trigger Error'}
            </button>
          </div>

          {/* Suspense & Lazy Demo */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Suspense & React.lazy
              <IconTooltip 
                content="Enable code-splitting and lazy loading. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('suspense')}
              />
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>💡 How to verify lazy loading:</strong>
              </p>
              <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                <li>Open DevTools → Network tab (filter by JS)</li>
                <li>Click "Load Component" button below</li>
                <li>Look for a new JS chunk file (LazyLoadedComponent-[hash].js) being loaded</li>
                <li>The component loads from a separate code-split chunk!</li>
              </ol>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                💾 After first load, it may be cached. Disable cache in DevTools to see it load again.
              </p>
            </div>
            
            <button
              onClick={() => setShowLazy(!showLazy)}
              className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full"
            >
              {showLazy ? 'Hide Component' : '🚀 Load Component (Lazy)'}
            </button>
            
            {showLazy && (
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyComponent />
                </Suspense>
              </ErrorBoundary>
            )}
          </div>

          {/* useTransition Demo */}
          <TransitionDemo />

          {/* useDeferredValue Demo */}
          <DeferredValueDemo />
        </div>
      </div>
    </section>
  );
}

export { ErrorBoundary };
