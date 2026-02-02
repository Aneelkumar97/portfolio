'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  createCounter,
  curry,
  add,
  memoize,
  debounce,
  throttle,
  deepClone,
  pipe,
  compose,
  fibonacci,
  createRangeIterator,
  Singleton,
  Observable,
  Factory,
  demonstrateES6,
  createUniqueKey,
  CollectionUtils,
  demonstrateEventLoop,
  demonstrateCallStack,
  demonstrateMicrotaskVsMacrotask,
  demonstrateEventLoopWithState,
  EventLoopLog,
  EventLoopState,
} from '@/utils/jsUtilities';
import { IconTooltip } from './Tooltip';
import { getConceptDetails } from '@/utils/conceptDetails';
import { getTooltip } from '@/utils/tooltipContent';

export default function JavaScriptConcepts() {
  // Pure JavaScript closure - created once outside React's render cycle
  // This demonstrates the actual closure concept: a function that remembers its lexical scope
  const [, forceUpdate] = useState({});
  const [curriedResult, setCurriedResult] = useState<number | null>(null);
  const [memoResult, setMemoResult] = useState<number | null>(null);
  const [fibSequence, setFibSequence] = useState<number[]>([]);
  const [iteratorValues, setIteratorValues] = useState<number[]>([]);
  const [observableData, setObservableData] = useState<string[]>([]);
  const [es6Results, setES6Results] = useState<any>(null);
  const [singletonTest, setSingletonTest] = useState<string>('');
  const [factoryResult, setFactoryResult] = useState<string>('');
  const [pipeComposeResult, setPipeComposeResult] = useState<{pipe: number, compose: number} | null>(null);
  
  // Event Loop demonstration
  const [eventLoopLogs, setEventLoopLogs] = useState<EventLoopLog[]>([]);
  const [callStackDemo, setCallStackDemo] = useState<string[]>([]);
  const [microtaskMacrotaskDemo, setMicrotaskMacrotaskDemo] = useState<string[]>([]);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  
  // New Event Loop with State
  const [eventLoopStates, setEventLoopStates] = useState<EventLoopState[]>([]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);
  const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);

  // AbortController demonstration
  const [abortStatus, setAbortStatus] = useState<string>('');
  const [abortFetchStatus, setAbortFetchStatus] = useState<string>('');
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // Closure demonstration - useMemo ensures counter is created only once
  // The closure itself is pure JS - the counter object "closes over" the private count variable
  const counter = useMemo(() => createCounter(), []);

  // Memoization demonstration
  const expensiveFn = memoize((n: number) => {
    console.log('Computing...');
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
      result += i;
    }
    return result;
  });

  // Debounce demonstration
  const [debouncedText, setDebouncedText] = useState('');
  const [actualText, setActualText] = useState('');
  
  useEffect(() => {
    const debouncedUpdate = debounce((text: string) => {
      setDebouncedText(text);
    }, 500);
    
    debouncedUpdate(actualText);
  }, [actualText]);

  // Throttle demonstration
  const [throttleCount, setThrottleCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);
  
  // Create throttled function once with useMemo
  const throttledUpdate = useMemo(
    () => throttle(() => {
      setThrottledCount(prev => prev + 1);
    }, 1000),
    []
  );

  // Generator demonstration - create once and call next() each time
  const fibGenerator = useMemo(() => fibonacci(20), []);
  
  const getNextFibonacci = () => {
    const next = fibGenerator.next();
    if (!next.done) {
      setFibSequence(prev => [...prev, next.value]);
    }
  };

  const resetFibonacci = () => {
    setFibSequence([]);
    // Note: Can't reset a generator, would need to create new one
    // For simplicity, we'll just clear the display
  };

  // Iterator demonstration - create once and call next() each time
  const rangeIterator = useMemo(() => createRangeIterator(1, 10, 2), []);
  
  const getNextIteratorValue = () => {
    const next = rangeIterator.next();
    if (!next.done && next.value !== undefined) {
      setIteratorValues(prev => [...prev, next.value]);
    }
  };

  const resetIterator = () => {
    setIteratorValues([]);
    // Note: Can't reset an iterator, would need to create new one
  };

  // Singleton demonstration
  const testSingleton = () => {
    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();
    const areEqual = instance1 === instance2;
    setSingletonTest(areEqual ? '✓ Both calls returned the SAME instance' : '✗ Different instances (bug!)');
  };

  // Observer pattern demonstration - manual control
  const observable = useMemo(() => new Observable<string>(), []);
  
  const notifyObservers = (message: string) => {
    observable.notify(message);
  };

  useEffect(() => {
    const unsubscribe = observable.subscribe((data) => {
      setObservableData((prev) => [...prev, data]);
    });
    return () => unsubscribe();
  }, [observable]);

  const clearObserverData = () => setObservableData([]);

  // Factory pattern demonstration
  const testFactory = (type: 'A' | 'B') => {
    const product = Factory.createProduct(type);
    setFactoryResult(`Created ${type}: "${product.operation()}"`);
  };

  // ES6 features demonstration
  const testES6 = () => {
    const results = demonstrateES6();
    setES6Results(results);
  };

  // Pipe and Compose demonstration
  const testPipeCompose = () => {
    const double = (x: number) => x * 2;
    const increment = (x: number) => x + 1;
    const square = (x: number) => x * x;

    const input = 5;
    const pipeResult = pipe(double, increment, square)(input); // ((5 * 2) + 1)^2 = 121
    const composeResult = compose(square, increment, double)(input); // (5 * 2 + 1)^2 = 121
    
    setPipeComposeResult({ pipe: pipeResult, compose: composeResult });
  };

  // Event Loop demonstration handlers
  const runEventLoopDemo = () => {
    // Clear and reset
    setEventLoopStates([]);
    setSelectedLogIndex(null);
    setCurrentStateIndex(0);
    setIsVisualizing(true);
    
    const states = demonstrateEventLoopWithState();
    
    // Animate states one by one
    states.forEach((state, index) => {
      setTimeout(() => {
        setEventLoopStates((prev) => [...prev, state]);
        setCurrentStateIndex(index);
        
        // Mark as done when last state is added
        if (index === states.length - 1) {
          setTimeout(() => setIsVisualizing(false), 300);
        }
      }, index * 600); // 600ms delay between each step
    });
  };

  return (
    <section id="javascript" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600">
          JavaScript Mastery
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Advanced JavaScript Concepts & ES6+ Features
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Closures */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🔒 Closures
              <IconTooltip 
                content="Functions that remember their lexical scope. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('closures')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Functions that remember their lexical scope
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-blue-600">{counter.getCount()}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    counter.increment();
                    forceUpdate({});
                  }}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    counter.decrement();
                    forceUpdate({});
                  }}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  -
                </button>
              </div>
            </div>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
              Private count maintained via closure
            </code>
          </div>

          {/* Currying */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🍛 Currying
              <IconTooltip 
                content="Transforms functions with multiple args into sequences. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('currying')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Transform function with multiple args into sequence of functions
            </p>
            <button
              onClick={() => setCurriedResult(add(2)(3)(4))}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition mb-2"
            >
              Calculate add(2)(3)(4)
            </button>
            {curriedResult !== null && (
              <div className="text-center p-3 bg-purple-100 dark:bg-purple-900 rounded">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  {curriedResult}
                </span>
              </div>
            )}
          </div>

          {/* Memoization */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              💾 Memoization
              <IconTooltip 
                content="Caches function results for performance. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('memoization')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Cache expensive function results
            </p>
            <button
              onClick={() => setMemoResult(expensiveFn(5))}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition mb-2"
            >
              Sum 0 to 5 Million
            </button>
            {memoResult !== null && (
              <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Calculation:</strong> 0 + 1 + 2 + ... + 4,999,999
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Result:</strong> {memoResult.toExponential(2)}
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Check console - second call uses cache!</p>
          </div>

          {/* Debounce */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              ⏱️ Debounce
              <IconTooltip 
                content="Debounce delays function execution until after a wait period since the last call. Perfect for search inputs - instead of calling API on every keystroke, wait until user stops typing. Reduces unnecessary operations."
                conceptDetails={getConceptDetails('debounce')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Delay execution until after wait time
            </p>
            <input
              type="text"
              value={actualText}
              onChange={(e) => setActualText(e.target.value)}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Debounced: <span className="font-bold">{debouncedText}</span>
            </p>
          </div>

          {/* Throttle */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🚦 Throttle
              <IconTooltip 
                content="Throttle ensures a function executes at most once per specified time period, regardless of how many times it's called. Ideal for scroll or resize handlers. Unlike debounce, it executes immediately then blocks further calls."
                conceptDetails={getConceptDetails('throttle')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Execute at most once per time period
            </p>
            <button
              onClick={() => {
                setThrottleCount(prev => prev + 1);
                throttledUpdate();
              }}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition mb-2"
            >
              Click Fast! ({throttleCount})
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Throttled: <span className="font-bold">{throttledCount}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">Click rapidly - throttled updates max once/second</p>
          </div>

          {/* Generators */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              ⚙️ Generators
              <IconTooltip 
                content="Generators are functions that can pause execution and resume later using yield. They enable lazy evaluation, infinite sequences, and cooperative multitasking. Perfect for iterating over large datasets efficiently."
                conceptDetails={getConceptDetails('generators')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Functions that can pause and resume
            </p>
            <div className="flex gap-2 mb-2">
              <button
                onClick={getNextFibonacci}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Next Fibonacci
              </button>
              <button
                onClick={resetFibonacci}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Reset
              </button>
            </div>
            {fibSequence.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {fibSequence.join(', ')}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Click to generate next value using yield</p>
          </div>

          {/* Iterators */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🔄 Iterators
              <IconTooltip 
                content="Iterators define how to iterate over custom objects using the iteration protocol. They implement a next() method returning {value, done}. Enables for...of loops on custom data structures."
                conceptDetails={getConceptDetails('iterators')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Custom iteration protocol implementation
            </p>
            <div className="flex gap-2 mb-2">
              <button
                onClick={getNextIteratorValue}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Next Value (1-10, step 2)
              </button>
              <button
                onClick={resetIterator}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Reset
              </button>
            </div>
            {iteratorValues.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {iteratorValues.join(', ')}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Click to get next value using iterator.next()</p>
          </div>

          {/* Singleton Pattern */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              👤 Singleton
              <IconTooltip 
                content="Singleton pattern ensures a class has only one instance and provides global access to it. Useful for managing shared resources like database connections, configuration, or logging services."
                conceptDetails={getConceptDetails('singleton')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Ensures only one instance exists
            </p>
            <button
              onClick={testSingleton}
              className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition mb-2"
            >
              Test getInstance() Twice
            </button>
            {singletonTest && (
              <div className={`text-sm p-3 rounded ${singletonTest.includes('✓') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                {singletonTest}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Both calls should return the same instance</p>
          </div>

          {/* Observer Pattern */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              👁️ Observer
              <IconTooltip 
                content="Observer pattern establishes one-to-many relationship where observers subscribe to a subject and get notified of changes. Foundation of event systems, reactive programming, and state management (like Redux)."
                conceptDetails={getConceptDetails('observer')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to and notify observers
            </p>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => notifyObservers(`Event ${observableData.length + 1}: Action triggered`)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Notify Observers
              </button>
              <button
                onClick={clearObserverData}
                className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {observableData.length === 0 ? (
                <p className="text-xs text-gray-500 italic">Click to notify observers...</p>
              ) : (
                observableData.map((event, i) => (
                  <div key={i} className="text-xs bg-blue-100 dark:bg-blue-900 p-2 rounded animate-fade-in">
                    {event}
                  </div>
                ))
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">All subscribed observers receive notifications</p>
          </div>

          {/* Factory Pattern */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🏭 Factory
              <IconTooltip 
                content="Factory pattern creates objects without specifying their exact class. It encapsulates object creation logic, making code more flexible and easier to maintain. Used extensively in frameworks and libraries."
                conceptDetails={getConceptDetails('factory')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Create objects without specifying exact class
            </p>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => testFactory('A')}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Product A
              </button>
              <button
                onClick={() => testFactory('B')}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Product B
              </button>
            </div>
            {factoryResult && (
              <div className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                {factoryResult}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Factory creates different products based on type</p>
          </div>

          {/* Pipe & Compose */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🔗 Pipe & Compose
              <IconTooltip 
                content="Pipe executes functions left-to-right, compose right-to-left. Both enable function composition for clean, readable data transformations. Core to functional programming - build complex operations from simple functions."
                conceptDetails={getConceptDetails('pipeCompose')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Function composition utilities
            </p>
            <button
              onClick={testPipeCompose}
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition mb-2"
            >
              Run: double → increment → square (5)
            </button>
            {pipeComposeResult && (
              <div className="space-y-2 text-sm">
                <div className="bg-violet-100 dark:bg-violet-900 p-3 rounded">
                  <strong>Pipe (L→R):</strong> {pipeComposeResult.pipe}
                  <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    5 × 2 = 10 → 10 + 1 = 11 → 11² = 121
                  </div>
                </div>
                <div className="bg-violet-100 dark:bg-violet-900 p-3 rounded">
                  <strong>Compose (R→L):</strong> {pipeComposeResult.compose}
                  <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    5 × 2 = 10 → 10 + 1 = 11 → 11² = 121
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Pipe: left-to-right, Compose: right-to-left</p>
          </div>

          {/* ES6+ Features */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              ✨ ES6+ Features
              <IconTooltip 
                content="ES6+ introduced arrow functions, destructuring, spread/rest operators, template literals, classes, modules, and more. These features make JavaScript more expressive, concise, and powerful for modern development."
                conceptDetails={getConceptDetails('es6Features')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Modern JavaScript syntax & features
            </p>
            <button
              onClick={testES6}
              className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition mb-2"
            >
              Demonstrate ES6 Features
            </button>
            {es6Results && (
              <div className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-auto max-h-48">
                <pre className="whitespace-pre-wrap">{JSON.stringify(es6Results, null, 2)}</pre>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Shows destructuring, spread, template literals, etc.</p>
          </div>

          {/* Event Loop */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow md:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              🔄 Event Loop Visualizer
              <IconTooltip 
                content="The Event Loop is JavaScript's concurrency model. Watch how tasks move through Call Stack, Microtask Queue (Promises), Event Handler Queue (DOM events), and Macrotask Queue (setTimeout). Click on any log to see the state at that moment!"
                conceptDetails={getConceptDetails('eventLoop')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Interactive visualization of JavaScript's concurrency model with state snapshots
            </p>
            
            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <button
                onClick={runEventLoopDemo}
                disabled={isVisualizing}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isVisualizing ? '⏳ Visualizing...' : '▶️ Visualize Event Loop'}
              </button>
              <button
                onClick={() => {
                  setEventLoopStates([]);
                  setSelectedLogIndex(null);
                  setCurrentStateIndex(0);
                }}
                disabled={isVisualizing || eventLoopStates.length === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🗑️ Clear
              </button>
            </div>

            {/* Data Structures Visualization */}
            {eventLoopStates.length > 0 && (
              <div className="space-y-6">
                {/* Four Column Layout for Data Structures */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Call Stack */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-300 dark:border-blue-700">
                    <h4 className="font-bold text-sm mb-3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                      <span className="text-xl">📚</span> Call Stack (LIFO)
                      <IconTooltip content={getTooltip('javascript', 'callStack')} />
                    </h4>
                    <div className="space-y-2 min-h-[200px]">
                      {(selectedLogIndex !== null 
                        ? eventLoopStates[selectedLogIndex]?.callStack 
                        : eventLoopStates[currentStateIndex]?.callStack
                      )?.length > 0 ? (
                        (selectedLogIndex !== null 
                          ? eventLoopStates[selectedLogIndex]?.callStack 
                          : eventLoopStates[currentStateIndex]?.callStack
                        )?.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-blue-100 dark:bg-blue-800 rounded text-sm font-mono border border-blue-300 dark:border-blue-600 animate-[fadeIn_0.3s_ease-in]"
                          >
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm italic py-8">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Microtask Queue */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-700">
                    <h4 className="font-bold text-sm mb-3 text-purple-900 dark:text-purple-100 flex items-center gap-2">
                      <span className="text-xl">⚡</span> Microtask Queue (FIFO)
                      <IconTooltip content={getTooltip('javascript', 'microtaskQueue')} />
                    </h4>
                    <div className="space-y-2 min-h-[200px]">
                      {(selectedLogIndex !== null 
                        ? eventLoopStates[selectedLogIndex]?.microtaskQueue 
                        : eventLoopStates[currentStateIndex]?.microtaskQueue
                      )?.length > 0 ? (
                        (selectedLogIndex !== null 
                          ? eventLoopStates[selectedLogIndex]?.microtaskQueue 
                          : eventLoopStates[currentStateIndex]?.microtaskQueue
                        )?.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-purple-100 dark:bg-purple-800 rounded text-sm font-mono border border-purple-300 dark:border-purple-600 animate-[fadeIn_0.3s_ease-in]"
                          >
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm italic py-8">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Handler Queue */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-2 border-orange-300 dark:border-orange-700">
                    <h4 className="font-bold text-sm mb-3 text-orange-900 dark:text-orange-100 flex items-center gap-2">
                      <span className="text-xl">🖱️</span> Event Handler Queue (FIFO)
                      <IconTooltip content={getTooltip('javascript', 'eventHandlerQueue')} />
                    </h4>
                    <div className="space-y-2 min-h-[200px]">
                      {(selectedLogIndex !== null 
                        ? eventLoopStates[selectedLogIndex]?.eventHandlerQueue 
                        : eventLoopStates[currentStateIndex]?.eventHandlerQueue
                      )?.length > 0 ? (
                        (selectedLogIndex !== null 
                          ? eventLoopStates[selectedLogIndex]?.eventHandlerQueue 
                          : eventLoopStates[currentStateIndex]?.eventHandlerQueue
                        )?.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-orange-100 dark:bg-orange-800 rounded text-sm font-mono border border-orange-300 dark:border-orange-600 animate-[fadeIn_0.3s_ease-in]"
                          >
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm italic py-8">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Macrotask Queue */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
                    <h4 className="font-bold text-sm mb-3 text-green-900 dark:text-green-100 flex items-center gap-2">
                      <span className="text-xl">⏰</span> Macrotask Queue (FIFO)
                      <IconTooltip content={getTooltip('javascript', 'macrotaskQueue')} />
                    </h4>
                    <div className="space-y-2 min-h-[200px]">
                      {(selectedLogIndex !== null 
                        ? eventLoopStates[selectedLogIndex]?.macrotaskQueue 
                        : eventLoopStates[currentStateIndex]?.macrotaskQueue
                      )?.length > 0 ? (
                        (selectedLogIndex !== null 
                          ? eventLoopStates[selectedLogIndex]?.macrotaskQueue 
                          : eventLoopStates[currentStateIndex]?.macrotaskQueue
                        )?.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-green-100 dark:bg-green-800 rounded text-sm font-mono border border-green-300 dark:border-green-600 animate-[fadeIn_0.3s_ease-in]"
                          >
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 text-sm italic py-8">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Two Column Layout: Left (Code) and Right (Event Logs + Console stacked) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                  {/* Left Column: Code Block */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border-2 border-gray-300 dark:border-gray-700 flex flex-col">
                      <h4 className="font-bold text-sm mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-xl">💻</span> Executing Code
                        <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                          (Watch execution flow)
                        </span>
                      </h4>
                      <div className="bg-gray-900 dark:bg-black rounded p-4 overflow-x-auto">
                        <div className="font-mono text-sm leading-relaxed">
                        {[
                          { line: 1, code: "console.log('Start');", indent: 0 },
                          { line: 2, code: "", indent: 0 },
                          { line: 3, code: "// Register button click handler", indent: 0 },
                          { line: 4, code: "const button = document.querySelector('#btn');", indent: 0 },
                          { line: 5, code: "button.addEventListener('click', () => {", indent: 0 },
                          { line: 6, code: "console.log('Button clicked!');", indent: 1 },
                          { line: 7, code: "});", indent: 0 },
                          { line: 8, code: "", indent: 0 },
                          { line: 9, code: "setTimeout(() => {", indent: 0 },
                          { line: 10, code: "console.log('setTimeout 1');", indent: 1 },
                          { line: 11, code: "Promise.resolve().then(() => {", indent: 1 },
                          { line: 12, code: "console.log('Promise inside setTimeout');", indent: 2 },
                          { line: 13, code: "});", indent: 1 },
                          { line: 14, code: "}, 0);", indent: 0 },
                          { line: 15, code: "", indent: 0 },
                          { line: 16, code: "setTimeout(() => {", indent: 0 },
                          { line: 17, code: "console.log('setTimeout 2');", indent: 1 },
                          { line: 18, code: "}, 10);", indent: 0 },
                          { line: 19, code: "", indent: 0 },
                          { line: 20, code: "Promise.resolve().then(() => {", indent: 0 },
                          { line: 21, code: "console.log('Promise 1');", indent: 1 },
                          { line: 22, code: "return Promise.resolve();", indent: 1 },
                          { line: 23, code: "}).then(() => {", indent: 0 },
                          { line: 24, code: "console.log('Chained Promise');", indent: 1 },
                          { line: 25, code: "});", indent: 0 },
                          { line: 26, code: "", indent: 0 },
                          { line: 27, code: "queueMicrotask(() => {", indent: 0 },
                          { line: 28, code: "console.log('queueMicrotask');", indent: 1 },
                          { line: 29, code: "});", indent: 0 },
                          { line: 30, code: "", indent: 0 },
                          { line: 31, code: "console.log('Middle');", indent: 0 },
                          { line: 32, code: "", indent: 0 },
                          { line: 33, code: "// User clicks button here 🖱️", indent: 0 },
                          { line: 34, code: "button.click();", indent: 0 },
                          { line: 35, code: "", indent: 0 },
                          { line: 36, code: "Promise.resolve().then(() => {", indent: 0 },
                          { line: 37, code: "console.log('Promise 2');", indent: 1 },
                          { line: 38, code: "});", indent: 0 },
                          { line: 39, code: "", indent: 0 },
                          { line: 40, code: "console.log('End');", indent: 0 },
                        ].map(({ line, code, indent }) => {
                          const currentLog = selectedLogIndex !== null 
                            ? eventLoopStates[selectedLogIndex]?.log 
                            : eventLoopStates[currentStateIndex]?.log;
                          
                          // Determine if this line should be highlighted
                          const isHighlighted = 
                            // Synchronous execution
                            (currentLog?.includes("Executed \"console.log('Start')\"") && line === 1) ||
                            (currentLog?.includes("Executed \"console.log('Middle')\"") && line === 31) ||
                            (currentLog?.includes("Executed \"console.log('End')\"") && line === 40) ||
                            
                            // Button event listener registration
                            (currentLog?.includes("Pushing \"button.addEventListener") && line === 5) ||
                            (currentLog?.includes("Registering 'Click event handler'") && line === 5) ||
                            (currentLog?.includes("Pushing 'Click event handler' from Event Handler Queue") && line === 5) ||
                            (currentLog?.includes("User clicks button") && line === 34) ||
                            (currentLog?.includes("Click event handler moved to ready") && line === 34) ||
                            (currentLog?.includes("Executed 'Click event handler'") && line === 6) ||
                            
                            // Pushing to queues - highlight the registration/setup line
                            (currentLog?.includes("Pushing 'setTimeout(cb1") && line === 9) ||
                            (currentLog?.includes("Pushing 'setTimeout callback 1'") && line === 9) ||
                            (currentLog?.includes("Pushing 'setTimeout(cb2") && line === 16) ||
                            (currentLog?.includes("Pushing 'setTimeout callback 2'") && line === 16) ||
                            (currentLog?.includes("Pushing 'Promise.resolve().then(cb1)'") && line === 20) ||
                            (currentLog?.includes("Pushing 'Promise callback 1'") && line === 20) ||
                            (currentLog?.includes("Pushing 'queueMicrotask()'") && line === 27) ||
                            (currentLog?.includes("Pushing 'queueMicrotask callback'") && line === 27) ||
                            (currentLog?.includes("Pushing 'Promise.resolve().then(cb2)'") && line === 36) ||
                            (currentLog?.includes("Pushing 'Promise callback 2'") && line === 36) ||
                            (currentLog?.includes("Pushing 'Chained Promise callback'") && line === 22) ||
                            (currentLog?.includes("Pushing 'Promise inside setTimeout'") && line === 11) ||
                            
                            // Executing callbacks - highlight the callback content line
                            (currentLog?.includes("Executed 'setTimeout callback 1'") && line === 10) ||
                            (currentLog?.includes("Executed 'setTimeout callback 2'") && line === 17) ||
                            (currentLog?.includes("Executed 'Promise callback 1'") && line === 21) ||
                            (currentLog?.includes("Executed 'Chained Promise callback'") && line === 24) ||
                            (currentLog?.includes("Executed 'queueMicrotask callback'") && line === 28) ||
                            (currentLog?.includes("Executed 'Promise callback 2'") && line === 37) ||
                            (currentLog?.includes("Executed 'Promise inside setTimeout'") && line === 12);

                          return (
                            <div
                              key={line}
                              className={`flex gap-3 px-2 py-0.5 -mx-2 transition-all duration-300 ${
                                isHighlighted
                                  ? 'bg-yellow-500/30 border-l-4 border-yellow-500 pl-3'
                                  : 'hover:bg-gray-800/50'
                              }`}
                            >
                              <span className="text-gray-500 select-none min-w-[2rem] text-right">
                                {line}
                              </span>
                              <span className={`${
                                isHighlighted ? 'text-yellow-100 font-semibold' : 'text-gray-300'
                              }`}>
                                <span style={{ paddingLeft: `${indent * 1.5}rem` }}>
                                  {code || ' '}
                                </span>
                              </span>
                            </div>
                          );
                        })}
                        </div>
                      {/* Execution Status */}
                      {eventLoopStates.length > 0 && (
                        <div className="mt-4 p-3 bg-indigo-500/20 border-l-4 border-indigo-500 rounded">
                          <div className="text-xs text-indigo-200 font-semibold mb-1">
                            Step {(selectedLogIndex !== null ? selectedLogIndex : currentStateIndex) + 1} of {eventLoopStates.length}:
                          </div>
                          <div className="text-sm text-indigo-100 font-mono">
                            {(selectedLogIndex !== null 
                              ? eventLoopStates[selectedLogIndex]?.log 
                              : eventLoopStates[currentStateIndex]?.log
                            )}
                          </div>
                        </div>
                      )}
                      </div>
                    </div>

                  {/* Right Column: Event Logs and Console stacked */}
                  <div className="space-y-4">
                    {/* Event Logs */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
                      <h4 className="font-bold text-sm mb-3 text-gray-900 dark:text-white flex items-center gap-2 flex-shrink-0">
                        <span className="text-xl">📋</span> Event Logs 
                        <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                          (Click to view snapshot)
                        </span>
                      </h4>
                      <div className="space-y-1 min-h-[600px] max-h-[600px] overflow-y-auto overflow-x-hidden">
                      {[...eventLoopStates].reverse().map((state, index) => {
                        const actualIndex = eventLoopStates.length - 1 - index;
                        return (
                          <button
                            key={actualIndex}
                            onClick={() => setSelectedLogIndex(selectedLogIndex === actualIndex ? null : actualIndex)}
                            className={`w-full text-left p-3 rounded text-sm font-mono transition-all overflow-hidden ${
                              selectedLogIndex === actualIndex
                                ? 'bg-yellow-200 dark:bg-yellow-900 border-2 border-yellow-500 shadow-lg scale-[1.02]'
                                : actualIndex === currentStateIndex && selectedLogIndex === null
                                ? 'bg-white dark:bg-gray-800 border-2 border-indigo-400'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                            } animate-[fadeIn_0.3s_ease-in]`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                {state.step}.
                              </span>
                              <span className="break-words overflow-wrap-anywhere flex-1">{state.log}</span>
                              {selectedLogIndex === actualIndex && (
                                <span className="text-xs text-yellow-700 dark:text-yellow-300 flex-shrink-0">
                                  ← Viewing
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                      </div>
                    </div>

                    {/* Browser Console */}
                    <div className="bg-white dark:bg-gray-950 rounded-lg border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
                      <div className="bg-gray-200 dark:bg-gray-800 px-3 py-2 border-b border-gray-300 dark:border-gray-700 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Console</span>
                      </div>
                      <div className="p-3 font-mono text-sm min-h-[400px] max-h-[400px] overflow-y-auto bg-white dark:bg-gray-950">
                        {(selectedLogIndex !== null 
                          ? eventLoopStates[selectedLogIndex]?.consoleOutput 
                          : eventLoopStates[currentStateIndex]?.consoleOutput
                        ) && (selectedLogIndex !== null 
                          ? eventLoopStates[selectedLogIndex]?.consoleOutput 
                          : eventLoopStates[currentStateIndex]?.consoleOutput
                        )!.length > 0 ? (
                          [...(selectedLogIndex !== null 
                            ? eventLoopStates[selectedLogIndex]?.consoleOutput 
                            : eventLoopStates[currentStateIndex]?.consoleOutput
                          )!].reverse().map((output, idx) => (
                            <div
                              key={idx}
                              className="py-1 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 last:border-0 animate-[fadeIn_0.3s_ease-in]"
                            >
                              <span className="text-blue-600 dark:text-blue-400 mr-2">&gt;</span>
                              {output}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-400 dark:text-gray-600 text-xs italic">
                            Console output will appear here...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong className="text-indigo-600 dark:text-indigo-400">💡 How it works:</strong> Watch how JavaScript moves tasks through different queues. 
                    The Event Loop checks if Call Stack is empty, processes ALL Microtasks, then ONE Macrotask, and repeats. 
                    Click any log to freeze and inspect the exact state at that moment!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional JS Concepts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              🗺️ Map & Set
              <IconTooltip content="Map stores key-value pairs with any type as key (unlike objects). Set stores unique values. Both offer better performance for large collections and useful methods like has(), delete(). Essential for efficient data management." />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Modern data structures for collections
            </p>
            <div className="space-y-2 text-sm">
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <strong>Map:</strong> Key-value pairs with any type as key
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <strong>Set:</strong> Unique values collection
              </div>
              <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs whitespace-pre-wrap">
                {`const map = new Map([['a', 1]]);\nconst set = new Set([1,2,2,3]);`}
              </code>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              🎯 Promises & Async/Await
              <IconTooltip content="Promises represent eventual completion of async operations. Async/await is syntactic sugar making promise-based code look synchronous. Essential for API calls, file operations, and any asynchronous JavaScript." />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Asynchronous programming patterns
            </p>
            <div className="space-y-2 text-sm bg-white dark:bg-gray-800 p-3 rounded">
              <div><strong>Promise:</strong> Represents eventual completion</div>
              <div><strong>Async/Await:</strong> Syntactic sugar for promises</div>
              <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs mt-2 whitespace-pre-wrap">
                {`async function fetchData() {\n  const data = await fetch(url);\n  return data.json();\n}`}
              </code>
            </div>
          </div>
        </div>

        {/* AbortController Demo */}
        <div className="mt-12 p-6 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
            🛑 AbortController
            <IconTooltip 
              content="Click to learn about AbortController - abort async operations, prevent memory leaks, and avoid race conditions."
              conceptDetails={getConceptDetails('abortController')}
            />
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Demonstrates canceling async operations mid-execution.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
            💡 Hint: Start a task or fetch, then click "Abort" before it completes. Notice how the operation stops immediately.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Simulated Long Task */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Abort Long-Running Task
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Start a 5-second task and try aborting it mid-execution
              </p>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => {
                    const controller = new AbortController();
                    setAbortController(controller);
                    setAbortStatus('⏳ Task running...');

                    const startTime = Date.now();
                    const checkAbort = () => {
                      if (controller.signal.aborted) {
                        setAbortStatus('❌ Task aborted!');
                        return;
                      }

                      const elapsed = Date.now() - startTime;
                      if (elapsed >= 5000) {
                        setAbortStatus('✅ Task completed!');
                        setAbortController(null);
                      } else {
                        setAbortStatus(`⏳ Running... ${(elapsed / 1000).toFixed(1)}s`);
                        setTimeout(checkAbort, 100);
                      }
                    };

                    checkAbort();
                  }}
                  disabled={!!abortController}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Start Task
                </button>
                <button
                  onClick={() => {
                    if (abortController) {
                      abortController.abort();
                      setAbortController(null);
                    }
                  }}
                  disabled={!abortController}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Abort Task
                </button>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                Status: <span className="font-semibold">{abortStatus || 'Ready'}</span>
              </div>
            </div>

            {/* Abort Fetch Request */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Abort Fetch Request
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Cancel a real API request before it completes (5s delay)
              </p>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={async () => {
                    const controller = new AbortController();
                    setAbortController(controller);
                    setAbortFetchStatus('🌐 Fetching data...');

                    try {
                      // Using a delay API to simulate slow request
                      const response = await fetch('https://httpbin.org/delay/5', {
                        signal: controller.signal
                      });
                      const data = await response.json();
                      setAbortFetchStatus('✅ Fetch completed!');
                      setAbortController(null);
                    } catch (error: any) {
                      if (error.name === 'AbortError') {
                        setAbortFetchStatus('❌ Fetch aborted!');
                      } else {
                        setAbortFetchStatus('⚠️ Error: ' + error.message);
                      }
                      setAbortController(null);
                    }
                  }}
                  disabled={!!abortController}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Start Fetch
                </button>
                <button
                  onClick={() => {
                    if (abortController) {
                      abortController.abort();
                      setAbortController(null);
                    }
                  }}
                  disabled={!abortController}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Abort Fetch
                </button>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                Status: <span className="font-semibold">{abortFetchStatus || 'Ready'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
