import { ConceptDetails } from '@/components/Tooltip';

export const conceptDetailsLibrary: Record<string, ConceptDetails> = {
  // React Hooks
  useState: {
    title: 'useState Hook',
    brief: 'useState is a React Hook that lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.',
    implementation: 'In this example, useState manages the counter value. When you click the increment/decrement buttons, the setCount function is called, which triggers a re-render with the new count value displayed on the screen.',
    codeExample: `const [count, setCount] = useState(0);

// Update state with new value
const increment = () => setCount(count + 1);

// Update state based on previous value (recommended)
const increment = () => setCount(prev => prev + 1);

// JSX
<button onClick={increment}>Count: {count}</button>`,
    useCases: [
      'Managing form inputs and validation states',
      'Toggling UI elements (modals, dropdowns, accordions)',
      'Tracking user interactions and counters',
      'Controlling component visibility and display modes'
    ],
    benefits: [
      'Simple and intuitive state management',
      'Automatically triggers re-renders on state changes',
      'Can store any data type (primitives, objects, arrays)',
      'Preserves state between re-renders'
    ],
    relatedConcepts: ['useReducer', 'useRef', 'useContext', 'State Management']
  },

  useEffect: {
    title: 'useEffect Hook',
    brief: 'useEffect lets you perform side effects in functional components. It runs after render and can be configured to run on mount, unmount, or when specific dependencies change.',
    implementation: 'This example demonstrates multiple useEffect patterns: one that runs on every render (no deps), one on mount only (empty deps), and one that runs when specific values change. It also shows cleanup with the return function.',
    codeExample: `useEffect(() => {
  // Side effect code runs after render
  document.title = \`Count: \${count}\`;
  
  // Cleanup function (optional)
  return () => {
    document.title = 'React App';
  };
}, [count]); // Dependencies array

// Mount only (empty deps)
useEffect(() => {
  console.log('Component mounted');
}, []);

// No deps - runs on every render
useEffect(() => {
  console.log('Component rendered');
});`,
    useCases: [
      'Fetching data from APIs on component mount',
      'Setting up subscriptions and event listeners',
      'Synchronizing with external systems (localStorage, WebSocket)',
      'Updating document title or meta tags',
      'Starting timers and intervals'
    ],
    benefits: [
      'Declarative way to handle side effects',
      'Automatic cleanup prevents memory leaks',
      'Dependency array optimizes performance',
      'Replaces multiple lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount)'
    ],
    relatedConcepts: ['useLayoutEffect', 'useCallback', 'useMemo', 'Component Lifecycle']
  },

  useRef: {
    title: 'useRef Hook',
    brief: 'useRef returns a mutable ref object whose .current property persists across renders without causing re-renders when changed. Perfect for accessing DOM elements and storing mutable values.',
    implementation: 'In this example, useRef creates a reference to the input element. When the button is clicked, we can directly access and manipulate the DOM node using inputRef.current to focus the input programmatically.',
    codeExample: `const inputRef = useRef<HTMLInputElement>(null);

// Access DOM element
const focusInput = () => {
  inputRef.current?.focus();
};

// Store mutable value (doesn't cause re-render)
const countRef = useRef(0);
countRef.current += 1;

// JSX
<input ref={inputRef} type="text" />
<button onClick={focusInput}>Focus Input</button>`,
    useCases: [
      'Accessing and manipulating DOM elements directly',
      'Storing previous values for comparison',
      'Keeping mutable values that don\'t trigger re-renders',
      'Managing timers, intervals, and animation frames',
      'Integrating with third-party libraries'
    ],
    benefits: [
      'Direct DOM access when needed',
      'Persists values between renders',
      'Doesn\'t trigger re-renders when updated',
      'Useful for imperative operations',
      'Can store any mutable value'
    ],
    relatedConcepts: ['forwardRef', 'useImperativeHandle', 'useState', 'DOM Manipulation']
  },

  useMemo: {
    title: 'useMemo Hook',
    brief: 'useMemo memoizes expensive calculations, returning a cached result until dependencies change. It optimizes performance by preventing unnecessary recalculations on every render.',
    implementation: 'Here, useMemo caches the factorial calculation result. The expensive computation only runs when the input number changes, not on every render. Without useMemo, factorial would recalculate even if other state changes.',
    codeExample: `const expensiveValue = useMemo(() => {
  // Expensive calculation
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]); // Only recalculate when items change

// Example: Factorial calculation
const factorial = useMemo(() => {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}, [num]);

return <div>Result: {expensiveValue}</div>;`,
    useCases: [
      'Memoizing expensive calculations (sorting, filtering, mathematical operations)',
      'Optimizing derived state from props or state',
      'Preventing unnecessary object/array recreation',
      'Improving performance in complex lists or charts',
      'Optimizing context values to prevent consumer re-renders'
    ],
    benefits: [
      'Reduces unnecessary computations',
      'Improves render performance',
      'Maintains referential equality between renders',
      'Helps prevent child component re-renders'
    ],
    relatedConcepts: ['useCallback', 'React.memo', 'Performance Optimization', 'Memoization']
  },

  useCallback: {
    title: 'useCallback Hook',
    brief: 'useCallback returns a memoized callback function that only changes when dependencies change. Essential for optimizing child components that rely on reference equality.',
    implementation: 'In this demo, useCallback memoizes the handleClick function. Without it, a new function would be created on every render, causing child components using React.memo to re-render unnecessarily even when no data changed.',
    codeExample: `const handleClick = useCallback(() => {
  console.log('Clicked with value:', value);
}, [value]); // Only recreate when value changes

// Passing to child component
<ChildComponent onClick={handleClick} />

// Child component with React.memo
const ChildComponent = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click Me</button>;
});`,
    useCases: [
      'Passing callbacks to optimized child components (React.memo)',
      'Preventing unnecessary effect triggers that depend on functions',
      'Optimizing event handlers in lists',
      'Stabilizing function references for dependencies',
      'Integration with custom hooks'
    ],
    benefits: [
      'Prevents unnecessary child re-renders',
      'Maintains referential equality',
      'Optimizes components wrapped in React.memo',
      'Reduces memory allocation'
    ],
    relatedConcepts: ['useMemo', 'React.memo', 'Performance Optimization', 'Event Handlers']
  },

  useContext: {
    title: 'useContext Hook',
    brief: 'useContext accesses context values without prop drilling. It subscribes to context changes and re-renders when the context value updates.',
    implementation: 'In this demo, type in the input field to update a message that\'s shared through Context. The input and the ContextConsumer display component are separate - they share data through useContext without passing props! This demonstrates how Context eliminates prop drilling in React applications.',
    codeExample: `// 1. Create Context
const DemoContext = createContext(null);

// 2. Provider wraps the app
function App() {
  const [contextMessage, setContextMessage] = useState('Hello from Context!');
  
  return (
    <DemoContext.Provider 
      value={{ message: contextMessage, updateMessage: setContextMessage }}
    >
      <InputComponent />
      <DisplayComponent />
    </DemoContext.Provider>
  );
}

// 3. Any nested component can consume context
function ContextConsumer() {
  const context = useContext(DemoContext);
  if (!context) return null;
  
  return (
    <div>
      <strong>Message from Context:</strong>
      <p>{context.message}</p>
    </div>
  );
}

// 4. Update context from anywhere
function InputComponent() {
  const context = useContext(DemoContext);
  
  return (
    <input
      value={context.message}
      onChange={(e) => context.updateMessage(e.target.value)}
    />
  );
}`,
    useCases: [
      'Global state management (theme, user auth, language)',
      'Avoiding prop drilling in deep component trees',
      'Sharing data between distant components',
      'Configuration and settings management',
      'Multi-provider patterns for different concerns'
    ],
    benefits: [
      'Eliminates prop drilling',
      'Cleaner component interfaces',
      'Centralized state management',
      'Easy to test and maintain',
      'Works with multiple contexts'
    ],
    relatedConcepts: ['Context API', 'useReducer', 'State Management', 'Component Composition']
  },

  useReducer: {
    title: 'useReducer Hook',
    brief: 'useReducer is an alternative to useState for complex state logic. It uses a reducer function (like Redux) to handle state transitions based on action types.',
    implementation: 'In this example, useReducer manages todo list state with multiple action types (add, toggle, delete). It\'s more predictable than multiple useState calls and makes complex state updates easier to reason about and test.',
    codeExample: `const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });

// Usage
dispatch({ type: 'increment' });
dispatch({ type: 'reset' });`,
    useCases: [
      'Complex state objects with multiple sub-values',
      'State updates that depend on previous state',
      'Managing forms with multiple fields and validation',
      'Implementing undo/redo functionality',
      'State machines and workflows'
    ],
    benefits: [
      'Better for complex state logic',
      'Predictable state updates',
      'Easier to test reducer functions',
      'Better performance for deeply nested updates',
      'Familiar pattern from Redux'
    ],
    relatedConcepts: ['useState', 'Redux', 'State Management', 'Immutability']
  },

  useTransition: {
    title: 'useTransition Hook',
    brief: 'useTransition marks state updates as non-urgent, allowing React to keep the UI responsive during expensive operations. It provides a isPending flag to show loading states.',
    implementation: 'This demo renders 5,000 post components. The key test: Click "Load Posts" then IMMEDIATELY spam-click the counter button. Without useTransition, the counter freezes briefly - your clicks queue up. With useTransition, the counter increments smoothly because React prioritizes your urgent interactions over the rendering work.',
    codeExample: `const [isPending, startTransition] = useTransition();
const [count, setCount] = useState(0);
const [posts, setPosts] = useState([]);

const loadPosts = () => {
  startTransition(() => {
    // 5000 components marked as low-priority
    const newPosts = Array.from({ length: 5000 }, (_, i) => ({
      id: i,
      title: \`Post #\${i}\`
    }));
    setPosts(newPosts);
  });
};

return (
  <>
    {/* This stays responsive during transition */}
    <button onClick={() => setCount(c => c + 1)}>
      Counter: {count}
    </button>
    
    <button onClick={loadPosts}>Load Posts</button>
    
    {isPending && <span>Loading...</span>}
    
    {posts.map(post => (
      <div key={post.id}>{post.title}</div>
    ))}
  </>
);`,
    useCases: [
      'Filtering large lists without blocking input',
      'Expensive search and sort operations',
      'Complex calculations triggered by user input',
      'Navigation that requires data fetching',
      'Tab switching with data loading'
    ],
    benefits: [
      'Keeps UI responsive during heavy updates',
      'Built-in pending state for loading indicators',
      'Improves perceived performance',
      'Prevents UI freezing and jank',
      'Better user experience for slow operations'
    ],
    relatedConcepts: ['useDeferredValue', 'Concurrent Rendering', 'Performance Optimization', 'Suspense']
  },

  useDeferredValue: {
    title: 'useDeferredValue Hook',
    brief: 'useDeferredValue defers updating a value until more urgent updates complete. It\'s useful for keeping inputs responsive while expensive derived values update in the background.',
    implementation: 'In this example, useDeferredValue delays the search query used for filtering. The input field updates immediately (responsive), while the expensive list filtering uses the deferred value, preventing input lag.',
    codeExample: `const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// Input updates immediately
<input value={query} onChange={(e) => setQuery(e.target.value)} />

// Expensive operation uses deferred value
const results = useMemo(() => {
  return items.filter(item => 
    item.name.includes(deferredQuery)
  );
}, [deferredQuery, items]);

// Show stale indicator
const isStale = query !== deferredQuery;`,
    useCases: [
      'Real-time search with large datasets',
      'Live filtering and sorting',
      'Debouncing without external libraries',
      'Keeping form inputs responsive',
      'Updating charts and visualizations'
    ],
    benefits: [
      'Keeps inputs smooth and responsive',
      'Automatic handling of stale values',
      'Simpler than manual debouncing',
      'Works with Concurrent React features',
      'No need for useEffect or timers'
    ],
    relatedConcepts: ['useTransition', 'Debouncing', 'Performance Optimization', 'Concurrent Rendering']
  },

  // Custom Hooks
  useDebounce: {
    title: 'useDebounce Custom Hook',
    brief: 'useDebounce delays updating a value until the user stops typing for a specified time. It prevents excessive API calls and expensive operations during rapid input changes.',
    implementation: 'This custom hook uses useEffect and setTimeout to delay value updates. When typing, it cancels previous timers and only updates after 500ms of inactivity, reducing API calls from 10+ to just 1.',
    codeExample: `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  // Only called after 500ms of no typing
  fetchResults(debouncedSearch);
}, [debouncedSearch]);`,
    useCases: [
      'Search input with API calls',
      'Form validation with expensive checks',
      'Auto-save functionality',
      'Window resize event handling',
      'Scroll event optimization'
    ],
    benefits: [
      'Reduces API calls significantly',
      'Improves performance and reduces costs',
      'Better user experience (no flickering)',
      'Prevents race conditions',
      'Easy to implement and reuse'
    ],
    relatedConcepts: ['useThrottle', 'useDeferredValue', 'Performance Optimization', 'Event Handling']
  },

  useThrottle: {
    title: 'useThrottle Custom Hook',
    brief: 'useThrottle ensures a value updates at most once per specified interval, regardless of how often the source value changes. Different from debounce - it executes periodically during activity.',
    implementation: 'This hook uses useEffect with a flag to limit updates. Unlike debounce (waits for pause), throttle executes immediately and then blocks updates for the interval, perfect for scroll/resize events.',
    codeExample: `function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= interval) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, interval - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, interval]);

  return throttledValue;
}

// Usage
const [scrollY, setScrollY] = useState(0);
const throttledScrollY = useThrottle(scrollY, 100);

// Updates max once per 100ms
useEffect(() => {
  updateHeaderStyle(throttledScrollY);
}, [throttledScrollY]);`,
    useCases: [
      'Scroll position tracking',
      'Window resize handlers',
      'Mouse move tracking',
      'Game loop updates',
      'Real-time charts and analytics'
    ],
    benefits: [
      'Guarantees regular updates during activity',
      'Better for continuous events (scroll, resize)',
      'Prevents performance bottlenecks',
      'Predictable update frequency',
      'Maintains responsiveness'
    ],
    relatedConcepts: ['useDebounce', 'Performance Optimization', 'Event Handling', 'Rate Limiting']
  },

  useLocalStorage: {
    title: 'useLocalStorage Custom Hook',
    brief: 'useLocalStorage syncs state with localStorage, persisting data across page refreshes. It provides a useState-like API with automatic serialization and deserialization.',
    implementation: 'This hook wraps useState with localStorage sync. On mount, it reads the stored value. On updates, it saves to localStorage. Includes error handling for quota exceeded and invalid JSON.',
    codeExample: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');`,
    useCases: [
      'Persisting user preferences (theme, language)',
      'Saving form drafts',
      'Caching API responses',
      'Storing authentication tokens',
      'Maintaining shopping cart state'
    ],
    benefits: [
      'Data persists across sessions',
      'Simple useState-like API',
      'Automatic serialization',
      'Synchronizes across browser tabs',
      'Reduces backend storage needs'
    ],
    relatedConcepts: ['useState', 'Browser Storage', 'Data Persistence', 'State Management']
  },

  // JavaScript Concepts
  closures: {
    title: 'Closures',
    brief: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. It "closes over" these variables.',
    implementation: 'In this portfolio, the counter demo uses closures to maintain a private count variable. The createCounter() function returns an object with increment, decrement, and getCount methods that "close over" the private count variable. Click the + and - buttons to see the closure maintaining its private state across multiple calls.',
    codeExample: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = useMemo(() => createCounter(), []);

// In the UI buttons:
onClick={() => {
  counter.increment(); // Increases private count
  forceUpdate({});     // Re-render to show new count
}}

// Display the count:
{counter.getCount()} // Shows current count
// count variable is completely private!`,
    useCases: [
      'Data privacy and encapsulation',
      'Creating factory functions',
      'Event handlers with private state',
      'Module patterns',
      'Memoization and caching'
    ],
    benefits: [
      'Encapsulates private data',
      'Creates clean APIs',
      'Enables functional programming patterns',
      'Maintains state without classes',
      'Prevents global namespace pollution'
    ],
    relatedConcepts: ['Scope', 'Lexical Environment', 'IIFE', 'Module Pattern', 'Function Context']
  },

  debounce: {
    title: 'Debounce',
    brief: 'Debounce delays function execution until after a wait period has elapsed since the last call. It prevents excessive function calls during rapid events.',
    implementation: 'In this portfolio, the debounce demo delays updating the displayed text by 500ms after you stop typing. Type rapidly in the input field and notice the "Debounced" text only updates after you pause for 500ms. This prevents excessive updates and would save API calls in a real search scenario.',
    codeExample: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 500);

debouncedSearch('hello');
debouncedSearch('hello world');`,
    useCases: [
      'Search input with API calls',
      'Form validation that requires server checks',
      'Auto-save functionality',
      'Window resize event handling',
      'Input field onChange handlers'
    ],
    benefits: [
      'Reduces API calls dramatically',
      'Improves performance and reduces server load',
      'Prevents race conditions',
      'Better user experience (waits for user to finish)',
      'Simple to implement'
    ],
    relatedConcepts: ['Throttle', 'Closures', 'Higher-Order Functions', 'Event Handling']
  },

  throttle: {
    title: 'Throttle',
    brief: 'Throttle ensures a function is called at most once per specified interval, regardless of how many times the event fires. Unlike debounce, it executes immediately and then blocks subsequent calls.',
    implementation: 'This portfolio demonstrates throttling with a button click counter. Click the button rapidly and notice the regular count increases on every click, but the throttled count only updates once per second maximum. Perfect for rate-limiting user actions, scroll handlers, or resize events.',
    codeExample: `function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledLog = throttle(() => {
  console.log('Scrolling...');
}, 1000);

window.addEventListener('scroll', throttledLog);`,
    useCases: [
      'Scroll position tracking',
      'Window resize handlers',
      'Mouse move tracking',
      'Button click prevention (spam protection)',
      'Game loop updates and animations'
    ],
    benefits: [
      'Guarantees function runs during activity',
      'Better for continuous events than debounce',
      'Prevents performance bottlenecks',
      'Predictable execution frequency',
      'Maintains UI responsiveness'
    ],
    relatedConcepts: ['Debounce', 'Closures', 'Higher-Order Functions', 'Event Handling']
  },

  currying: {
    title: 'Currying',
    brief: 'Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. It enables partial application and creates more reusable function variants.',
    implementation: 'This portfolio demonstrates currying with an add function that takes 3 numbers. The curry utility transforms it so you can call it as add(2)(3)(4). Each call returns a function until all arguments are collected, then it executes. Click the button to see add(2)(3)(4) = 9.',
    codeExample: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    } else {
      return function (...args2) {
        return curried.apply(null, args.concat(args2));
      };
    }
  };
}

const add = curry((a, b, c) => a + b + c);

const result = add(2)(3)(4); // 9
const addTwo = add(2);
const addTwoAndThree = addTwo(3);
const final = addTwoAndThree(4); // 9`,
    useCases: [
      'Creating specialized function variants',
      'Partial application of arguments',
      'Function composition pipelines',
      'Reusable validation functions',
      'Event handler factories'
    ],
    benefits: [
      'Enhances function reusability',
      'Enables elegant partial application',
      'Improves code readability',
      'Reduces code duplication',
      'Facilitates functional composition'
    ],
    relatedConcepts: ['Partial Application', 'Function Composition', 'Higher-Order Functions', 'Closures']
  },

  generators: {
    title: 'Generator Functions',
    brief: 'Generators are functions that can pause execution and resume later, yielding multiple values over time. They use the function* syntax and yield keyword to produce values lazily.',
    implementation: 'This demo shows a Fibonacci generator that produces values one at a time. Click "Next Fibonacci" to call generator.next() and get the next value in the sequence. Each click resumes execution from the last yield, demonstrating how generators pause and resume.',
    codeExample: `function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  let count = 0;
  
  while (count < limit) {
    yield curr; // Pause here and return current value
    [prev, curr] = [curr, prev + curr];
    count++;
  }
}

// Create the generator
const fib = fibonacci(20);

// Call next() to get values one at a time
console.log(fib.next()); // {value: 1, done: false}
console.log(fib.next()); // {value: 1, done: false}
console.log(fib.next()); // {value: 2, done: false}
console.log(fib.next()); // {value: 3, done: false}
// ... continues until done: true

// Each next() call resumes from the last yield!`,
    useCases: [
      'Infinite sequences (Fibonacci, primes)',
      'Lazy data processing pipelines',
      'Custom iteration logic',
      'Async flow control (with co/redux-saga)',
      'State machines'
    ],
    benefits: [
      'Memory efficient (lazy evaluation)',
      'Clean iteration control',
      'Pausable execution',
      'Infinite sequences possible',
      'Elegant async flow control'
    ],
    relatedConcepts: ['Iterators', 'Async/Await', 'Lazy Evaluation', 'Iterables', 'Symbol.iterator']
  },

  promises: {
    title: 'Promises',
    brief: 'Promises represent the eventual completion or failure of an asynchronous operation. They provide a cleaner alternative to callbacks with methods like .then(), .catch(), and .finally().',
    implementation: 'This example shows Promise creation, chaining, error handling, and Promise.all for parallel operations. Promises eliminate callback hell and provide better error handling than nested callbacks.',
    codeExample: `// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({ data: 'Success!' });
      } else {
        reject(new Error('Failed to fetch'));
      }
    }, 1000);
  });
};

// Using Promises
fetchData()
  .then(result => {
    console.log(result.data);
    return processData(result);
  })
  .then(processed => console.log(processed))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Promise.all for parallel operations
Promise.all([fetch1(), fetch2(), fetch3()])
  .then(([result1, result2, result3]) => {
    // All resolved
  })
  .catch(error => {
    // Any rejected
  });`,
    useCases: [
      'API calls and HTTP requests',
      'File reading/writing operations',
      'Database queries',
      'Async data processing',
      'Parallel task execution'
    ],
    benefits: [
      'Cleaner than callbacks',
      'Built-in error handling',
      'Chainable operations',
      'Parallel execution (Promise.all)',
      'Better error propagation'
    ],
    relatedConcepts: ['Async/Await', 'Callbacks', 'Event Loop', 'Fetch API', 'Error Handling']
  },

  abortController: {
    title: 'AbortController',
    brief: 'AbortController provides the ability to abort asynchronous operations like fetch requests, event listeners, or any operation that supports the AbortSignal interface. Essential for preventing memory leaks, race conditions, and managing user interactions.',
    implementation: 'This demo shows two practical uses: (1) A long-running task that checks the signal.aborted flag periodically - when true, the task stops immediately. (2) A fetch request with the signal passed in options - calling abort() cancels the network request.',
    codeExample: `// Demo 1: Abort Long-Running Task
const controller = new AbortController();
const startTime = Date.now();

const checkAbort = () => {
  // Check if abort() was called
  if (controller.signal.aborted) {
    console.log('Task aborted!');
    return; // Stop the task
  }

  const elapsed = Date.now() - startTime;
  if (elapsed >= 5000) {
    console.log('Task completed!');
  } else {
    console.log(\`Running... \${(elapsed / 1000).toFixed(1)}s\`);
    setTimeout(checkAbort, 100); // Check again in 100ms
  }
};

checkAbort();

// To abort: controller.abort();

// Demo 2: Abort Fetch Request
const fetchController = new AbortController();

fetch('https://httpbin.org/delay/5', {
  signal: fetchController.signal // Pass signal to fetch
})
  .then(response => response.json())
  .then(data => {
    console.log('Fetch completed!', data);
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted!');
    } else {
      console.error('Error:', error);
    }
  });

// To abort: fetchController.abort();

// Additional: Timeout with AbortController
const timeoutController = new AbortController();
setTimeout(() => timeoutController.abort(), 3000);

fetch('https://api.example.com/data', {
  signal: timeoutController.signal
})
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request timed out');
    }
  });`,
    useCases: [
      'Canceling outdated API requests in search/autocomplete',
      'Aborting requests when user navigates away',
      'Implementing request timeouts',
      'Preventing race conditions in async operations',
      'Canceling long-running background tasks',
      'User cancellation (stop button functionality)'
    ],
    benefits: [
      'Prevents memory leaks from abandoned requests',
      'Avoids race conditions in UI updates',
      'Improves app performance by stopping unnecessary work',
      'Provides clean cleanup in React useEffect',
      'Standardized API across different async operations',
      'Better user experience with responsive cancellations'
    ],
    relatedConcepts: ['Promises', 'Fetch API', 'Event Loop', 'React useEffect', 'Memory Management', 'Race Conditions']
  },

  // React Patterns
  errorBoundaries: {
    title: 'Error Boundaries',
    brief: 'Error Boundaries are React components that catch JavaScript errors in their child component tree, log errors, and display fallback UI instead of crashing the entire app.',
    implementation: 'This ErrorBoundary class component implements componentDidCatch and getDerivedStateFromError to catch errors. It wraps child components and shows a fallback UI when errors occur, preventing app crashes.',
    codeExample: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`,
    useCases: [
      'Preventing entire app crashes',
      'Graceful error handling in production',
      'Error logging and monitoring',
      'Protecting critical UI sections',
      'User-friendly error messages'
    ],
    benefits: [
      'Prevents app crashes',
      'Isolated error handling',
      'Better user experience',
      'Error logging capability',
      'Granular error boundaries'
    ],
    relatedConcepts: ['Component Lifecycle', 'Error Handling', 'React Suspense', 'Try/Catch', 'Fallback UI']
  },

  suspense: {
    title: 'React Suspense',
    brief: 'Suspense lets components "wait" for asynchronous operations (like code splitting or data fetching) before rendering, showing a fallback UI during loading. Essential for React 18+ features.',
    implementation: 'This example wraps lazy-loaded components with Suspense. While the component code loads, React shows the fallback spinner. Works with React.lazy for code splitting and upcoming data fetching features.',
    codeExample: `import { Suspense, lazy } from 'react';

// Lazy load component
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Nested Suspense boundaries
<Suspense fallback={<PageLoader />}>
  <Header />
  <Suspense fallback={<Spinner />}>
    <Content />
  </Suspense>
  <Footer />
</Suspense>

// With data fetching (React 18+)
const resource = fetchData();

<Suspense fallback={<Skeleton />}>
  <DataComponent resource={resource} />
</Suspense>`,
    useCases: [
      'Code splitting and lazy loading',
      'Progressive data loading',
      'Streaming server-side rendering',
      'Optimizing bundle size',
      'Improving initial load time'
    ],
    benefits: [
      'Declarative loading states',
      'Better code organization',
      'Reduced bundle size',
      'Improved performance',
      'Granular loading UIs'
    ],
    relatedConcepts: ['React.lazy', 'Code Splitting', 'Error Boundaries', 'Concurrent Rendering', 'Streaming SSR']
  },

  portals: {
    title: 'React Portals',
    brief: 'Portals provide a way to render children into a DOM node outside the parent component hierarchy. Perfect for modals, tooltips, and overlays that need to escape CSS overflow or z-index constraints.',
    implementation: 'This modal uses createPortal to render directly into document.body, escaping the parent DOM tree. It overlays the entire viewport regardless of parent styling, perfect for modals and notifications.',
    codeExample: `import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black/50 absolute inset-0" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 relative z-10">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body  // Render outside parent DOM
  );
}

// Usage in any nested component
<div style={{ overflow: 'hidden' }}>
  <Modal isOpen={showModal} onClose={handleClose}>
    <h2>Portal Modal</h2>
  </Modal>
</div>`,
    useCases: [
      'Modals and dialogs',
      'Tooltips and popovers',
      'Notifications and toasts',
      'Dropdown menus',
      'Full-screen overlays'
    ],
    benefits: [
      'Escapes parent DOM constraints',
      'Avoids CSS overflow/z-index issues',
      'Maintains React event bubbling',
      'Clean component tree',
      'Flexible positioning'
    ],
    relatedConcepts: ['DOM Manipulation', 'Event Bubbling', 'Modal Patterns', 'Z-index Stacking']
  },

  virtualization: {
    title: 'React Virtualization',
    brief: 'Virtualization is a performance optimization technique that renders only visible items in large lists or grids. Instead of rendering thousands of DOM nodes, it renders only the 10-15 items currently in the viewport, dramatically reducing memory usage and improving performance.',
    implementation: 'This demo uses react-virtualized library to implement virtual scrolling. The List and Grid components calculate which items are visible based on scroll position and only render those items. AutoSizer automatically adjusts dimensions, and overscan rows ensure smooth scrolling.',
    codeExample: `import { List, Grid, AutoSizer } from 'react-virtualized';

// Virtual List - Only renders visible rows
<AutoSizer>
  {({ width, height }) => (
    <List
      width={width}
      height={height}
      rowCount={10000}           // Total items
      rowHeight={80}             // Height per row
      rowRenderer={rowRenderer}  // Render function
      overscanRowCount={3}       // Buffer for smooth scroll
    />
  )}
</AutoSizer>

// Row renderer - called only for visible items
const rowRenderer = ({ index, key, style }) => {
  const item = items[index];
  return (
    <div key={key} style={style}>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );
};

// Virtual Grid - 2D virtualization
<Grid
  width={800}
  height={600}
  columnCount={4}
  columnWidth={200}
  rowCount={Math.ceil(items.length / 4)}
  rowHeight={150}
  cellRenderer={cellRenderer}
/>`,
    useCases: [
      'Large data tables with thousands of rows',
      'Infinite scrolling feeds and social media timelines',
      'Image galleries with hundreds of photos',
      'Chat applications with long message histories',
      'E-commerce product catalogs',
      'Log viewers and monitoring dashboards'
    ],
    benefits: [
      'Renders only visible items (99%+ DOM reduction)',
      'Constant memory usage regardless of list size',
      'Smooth scrolling even with 50,000+ items',
      'Dramatically improves initial render time',
      'Better mobile performance with limited resources',
      'Maintains 60fps scrolling performance'
    ],
    relatedConcepts: ['Performance Optimization', 'Lazy Loading', 'Memoization', 'useMemo', 'React Window']
  },

  virtualList: {
    title: 'Virtual List',
    brief: 'Virtual lists are one-dimensional virtualized components that render only visible list items. They calculate which items are in view based on scroll position and item height, creating the illusion of a complete list while only rendering 10-15 DOM nodes.',
    implementation: 'The List component from react-virtualized tracks scroll position and calculates startIndex/endIndex to determine visible items. It uses a container with the full list height for accurate scrollbar, and positions visible items using absolute positioning.',
    codeExample: `import { List } from 'react-virtualized';

<List
  width={600}
  height={400}
  rowCount={items.length}
  rowHeight={80}
  rowRenderer={({ index, key, style }) => (
    <div key={key} style={style} className="list-item">
      <h4>{items[index].title}</h4>
      <p>{items[index].description}</p>
    </div>
  )}
  overscanRowCount={5}  // Render extra rows for smooth scrolling
/>

// Variable height rows using CellMeasurer
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 80,
});

<List
  rowHeight={cache.rowHeight}
  deferredMeasurementCache={cache}
  rowRenderer={({ index, key, parent, style }) => (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      <div style={style}>Dynamic height content</div>
    </CellMeasurer>
  )}
/>`,
    useCases: [
      'Message lists in chat applications',
      'Log viewers with thousands of entries',
      'Email inboxes with many messages',
      'File lists in file managers',
      'Search results with hundreds of items',
      'Activity feeds and timelines'
    ],
    benefits: [
      'Handles millions of items without lag',
      'Maintains smooth 60fps scrolling',
      'Minimal memory footprint',
      'Works on low-end devices',
      'Instant initial render',
      'Supports dynamic heights'
    ],
    relatedConcepts: ['Virtual Grid', 'Window Scroller', 'Infinite Scroll', 'AutoSizer']
  },

  virtualGrid: {
    title: 'Virtual Grid',
    brief: 'Virtual grids extend virtualization to two dimensions, rendering only visible cells in both horizontal and vertical directions. They calculate visible rows and columns based on scroll position, perfect for image galleries, spreadsheets, and data tables.',
    implementation: 'The Grid component from react-virtualized calculates which rows and columns are visible in the viewport. It positions items in a 2D layout while maintaining proper spacing, and handles both fixed and dynamic cell sizes efficiently.',
    codeExample: `import { Grid } from 'react-virtualized';

<Grid
  width={800}
  height={600}
  columnCount={10}
  columnWidth={150}
  rowCount={Math.ceil(items.length / 10)}
  rowHeight={120}
  cellRenderer={({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * 10 + columnIndex;
    if (index >= items.length) return null;
    
    return (
      <div key={key} style={style} className="grid-cell">
        <img src={items[index].image} />
        <span>{items[index].title}</span>
      </div>
    );
  }}
  overscanRowCount={2}
  overscanColumnCount={2}
/>

// Dynamic cell sizes
<Grid
  columnWidth={({ index }) => columnWidths[index]}
  rowHeight={({ index }) => rowHeights[index]}
  cellRenderer={cellRenderer}
/>

// Responsive grid with AutoSizer
<AutoSizer>
  {({ width, height }) => (
    <Grid
      width={width}
      height={height}
      columnCount={Math.floor(width / 200)}
      columnWidth={200}
      rowCount={rowCount}
      rowHeight={150}
      cellRenderer={cellRenderer}
    />
  )}
</AutoSizer>`,
    useCases: [
      'Image galleries with hundreds of photos',
      'Product catalogs in e-commerce',
      'Spreadsheets and data grids',
      'Video thumbnails in media libraries',
      'Icon pickers and emoji selectors',
      'Calendar views with many events'
    ],
    benefits: [
      'Handles large 2D datasets efficiently',
      'Supports responsive column layouts',
      'Smooth scrolling in both directions',
      'Works with variable cell sizes',
      'Minimal DOM nodes for maximum performance',
      'Great for touch devices'
    ],
    relatedConcepts: ['Virtual List', 'CSS Grid', 'Masonry Layout', 'Collection', 'MultiGrid']
  },

  hoc: {
    title: 'Higher-Order Components (HOC)',
    brief: 'HOCs are functions that take a component and return a new enhanced component. They enable code reuse, logic abstraction, and prop manipulation without modifying original components.',
    implementation: 'In this demo, the withLogging HOC wraps a SimpleCard component to automatically log its props to the console. The original SimpleCard component remains unchanged - the HOC adds logging functionality by wrapping it. Open your browser console (F12) to see the props being logged every time the component receives them.',
    codeExample: `// HOC definition - A function that takes a component
function withLogging(Component) {
  // Returns a new enhanced component
  return function WithLoggingComponent(props) {
    // Additional functionality: logging
    console.log('Props:', props);
    
    // Render the original component with all props
    return <Component {...props} />;
  };
}

// Original simple component
function SimpleCard({ title, content }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

// Enhanced component with logging
const LoggedCard = withLogging(SimpleCard);

// Usage - props are automatically logged
<LoggedCard 
  title="Enhanced Card" 
  content="Props are logged!" 
/>

// ✨ Composing multiple HOCs
const FinalComponent = withAuth(
  withTheme(
    withLogging(MyComponent)
  )
);`,
    useCases: [
      'Authentication and authorization checks',
      'Data fetching and caching',
      'Prop manipulation and injection',
      'Logging and analytics',
      'Theme and localization providers'
    ],
    benefits: [
      'Code reuse across components',
      'Separation of concerns',
      'Composable enhancements',
      'No component modification needed',
      'Testable in isolation'
    ],
    relatedConcepts: ['Render Props', 'Custom Hooks', 'Component Composition', 'Decorator Pattern']
  },

  renderProps: {
    title: 'Render Props Pattern',
    brief: 'Render props is a technique where a component receives a function prop that returns React elements. It enables sharing code between components using a prop whose value is a function.',
    implementation: 'The MouseTracker uses render props to share mouse position with any child component. The parent passes a function that receives mousePos and returns JSX, allowing flexible rendering.',
    codeExample: `// Render Props Component
function MouseTracker({ render }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(mousePos);
}

// Usage
<MouseTracker
  render={(mousePos) => (
    <div>
      <h1>Move the mouse!</h1>
      <p>X: {mousePos.x}, Y: {mousePos.y}</p>
    </div>
  )}
/>

// Alternative: children as function
function DataProvider({ children }) {
  const data = useFetchData();
  return children(data);
}

<DataProvider>
  {(data) => <Display data={data} />}
</DataProvider>`,
    useCases: [
      'Sharing component logic',
      'Dynamic component rendering',
      'Data providers and consumers',
      'Mouse/touch tracking',
      'Scroll position monitoring'
    ],
    benefits: [
      'Flexible rendering logic',
      'Easy to compose',
      'Clear data flow',
      'No naming collisions',
      'Type-safe with TypeScript'
    ],
    relatedConcepts: ['HOC', 'Custom Hooks', 'Component Composition', 'Children Props']
  },

  compoundComponents: {
    title: 'Compound Components Pattern',
    brief: 'Compound components work together to form a complete UI, sharing implicit state without prop drilling. Components are designed to be used together, like <select> and <option>.',
    implementation: 'In this demo, click any of the three tabs to see the content panel change automatically. The Tabs compound component uses React Context to share the active tab state between Tabs, Tabs.List, Tabs.Tab, and Tabs.Panel components - no props passed manually! Each component knows its role and coordinates with others seamlessly.',
    codeExample: `// Tabs Context - the "secret handshake"
const TabsContext = createContext();

// Parent component manages state
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Shares state via Context
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Child components consume Context
function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === id ? children : null;
}

// ✨ Compose them together
// Notice the dot notation and intuitive structure
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage - Clean, intuitive API!
<Tabs defaultTab="tab1">
  <Tabs.List>
    <Tabs.Tab id="tab1">React Hooks</Tabs.Tab>
    <Tabs.Tab id="tab2">Patterns</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="tab1">Hooks content</Tabs.Panel>
  <Tabs.Panel id="tab2">Patterns content</Tabs.Panel>
</Tabs>`,
    useCases: [
      'Complex UI components (tabs, accordions)',
      'Form builders with shared state',
      'Menu and navigation systems',
      'Step wizards and multi-step forms',
      'Custom select/dropdown components'
    ],
    benefits: [
      'Clean and intuitive API',
      'Flexible component composition',
      'Implicit state sharing',
      'Reduced prop drilling',
      'Better developer experience'
    ],
    relatedConcepts: ['Context API', 'Component Composition', 'Design Systems', 'State Sharing']
  },

  memoization: {
    title: 'Memoization',
    brief: 'Memoization is an optimization technique that caches function results based on input arguments. Subsequent calls with same arguments return cached results instead of recalculating.',
    implementation: 'This portfolio uses memoization to cache an expensive calculation that sums numbers from 0 to 5 million. Click "Sum 0 to 5 Million" button - the first click computes and logs "Computing..." to console, while subsequent clicks return the cached result instantly. Check your browser console!',
    codeExample: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveSum = memoize((n) => {
  console.log('Computing...');
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
});

expensiveSum(5); // Computing... (slow)
expensiveSum(5); // (instant, from cache)`,
    useCases: [
      'Expensive recursive calculations (Fibonacci, factorial)',
      'API response caching',
      'Complex data transformations',
      'Search and filter operations',
      'Heavy mathematical computations'
    ],
    benefits: [
      'Dramatically improves performance',
      'Reduces redundant calculations',
      'Lower CPU usage',
      'Faster response times',
      'Better user experience'
    ],
    relatedConcepts: ['Caching', 'Dynamic Programming', 'useMemo', 'Performance Optimization']
  },

  // React Patterns
  forwardRef: {
    title: 'forwardRef & useImperativeHandle',
    brief: 'forwardRef allows components to expose a ref to parent components. Combined with useImperativeHandle, you can customize what the ref exposes, providing controlled access to child component methods and properties.',
    implementation: 'This pattern uses forwardRef to pass refs through components and useImperativeHandle to define which methods/properties are exposed. Useful for accessing DOM elements or exposing custom APIs from child components.',
    codeExample: `const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Usage
const MyComponent = () => {
  const inputRef = useRef();
  
  return (
    <>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </>
  );
};`,
    useCases: [
      'Exposing imperative APIs from components',
      'Managing focus programmatically',
      'Integrating with third-party DOM libraries',
      'Building reusable input components',
      'Creating custom component APIs'
    ],
    benefits: [
      'Controlled access to child internals',
      'Maintains component encapsulation',
      'Enables imperative operations when needed',
      'Useful for accessibility features',
      'Better than direct DOM manipulation'
    ],
    relatedConcepts: ['useRef', 'Component Composition', 'Accessibility', 'Custom Hooks']
  },

  controlledComponent: {
    title: 'Controlled Components',
    brief: 'Controlled components are form elements whose values are controlled by React state. Every change goes through state updates, giving you full control and predictability over the input value.',
    implementation: 'In this pattern, form inputs receive their value from state and update state via onChange handlers. React is the single source of truth, making validation, formatting, and conditional logic straightforward.',
    codeExample: `const ControlledForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};`,
    useCases: [
      'Forms with validation',
      'Real-time input formatting (phone, credit card)',
      'Conditional field visibility',
      'Character counters and input limits',
      'Multi-step forms with state preservation'
    ],
    benefits: [
      'Single source of truth (React state)',
      'Easy to validate and transform input',
      'Predictable data flow',
      'Simple to implement conditional logic',
      'Better for dynamic forms'
    ],
    relatedConcepts: ['Uncontrolled Components', 'Form Handling', 'useState', 'Validation']
  },

  uncontrolledComponent: {
    title: 'Uncontrolled Components',
    brief: 'Uncontrolled components store their data in the DOM itself rather than React state. You access values using refs when needed, typically on form submission.',
    implementation: 'Instead of tracking every keystroke in state, uncontrolled components let the DOM handle the input state. Use refs to access values when needed, reducing re-renders and simplifying basic forms.',
    codeExample: `const UncontrolledForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={emailRef}
        type="email"
        defaultValue=""
        placeholder="Email"
      />
      <input
        ref={passwordRef}
        type="password"
        defaultValue=""
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};`,
    useCases: [
      'Simple forms without validation',
      'File upload inputs',
      'Integration with non-React code',
      'Performance-critical forms',
      'Quick prototypes and demos'
    ],
    benefits: [
      'Less code and boilerplate',
      'Fewer re-renders',
      'Simpler for basic forms',
      'Better performance for large forms',
      'Easier integration with legacy code'
    ],
    relatedConcepts: ['Controlled Components', 'useRef', 'Form Handling', 'Performance']
  },

  // JavaScript Advanced Concepts
  iterators: {
    title: 'Iterators',
    brief: 'Iterators are objects that define a sequence and provide a next() method to access values one at a time. They implement the iteration protocol, making objects iterable with for...of loops.',
    implementation: 'This demo creates a range iterator (1 to 10, step 2) that returns values one at a time. Click "Next Value" to call iterator.next() and get the next value in the sequence: 1, 3, 5, 7, 9. Each click demonstrates the iteration protocol in action.',
    codeExample: `function createRangeIterator(start, end, step = 1) {
  let current = start;
  
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (current <= end) {
        const value = current;
        current += step;
        return { value, done: false };
      }
      return { done: true };
    },
  };
}

// Create the iterator
const range = createRangeIterator(1, 10, 2);

// Call next() manually to get values one at a time
console.log(range.next()); // {value: 1, done: false}
console.log(range.next()); // {value: 3, done: false}
console.log(range.next()); // {value: 5, done: false}
console.log(range.next()); // {value: 7, done: false}
console.log(range.next()); // {value: 9, done: false}
console.log(range.next()); // {done: true}

// Or use with for...of
for (const num of createRangeIterator(1, 5, 1)) {
  console.log(num); // 1, 2, 3, 4, 5
}`,
    useCases: [
      'Custom data structure traversal',
      'Lazy evaluation of sequences',
      'Streaming data processing',
      'Implementing custom collections',
      'Memory-efficient iteration'
    ],
    benefits: [
      'Standardized iteration protocol',
      'Works with for...of loops',
      'Lazy evaluation possible',
      'Memory efficient for large sequences',
      'Enables custom iteration logic'
    ],
    relatedConcepts: ['Generators', 'for...of loops', 'Symbol.iterator', 'Lazy Evaluation']
  },

  // Design Patterns
  singleton: {
    title: 'Singleton Pattern',
    brief: 'Singleton ensures a class has only one instance and provides a global access point to it. Useful for managing shared resources like configuration, caching, or logging.',
    implementation: 'This demo tests the Singleton pattern by calling getInstance() twice. Both calls must return the exact same instance (same memory reference), proving only one instance exists. Click "Test getInstance() Twice" to verify.',
    codeExample: `class Singleton {
  static instance = null;
  
  constructor() {
    // Prevent direct instantiation
    if (Singleton.instance) {
      throw new Error('Use Singleton.getInstance()');
    }
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// Testing in the demo
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true - Same instance!

// Both variables point to the exact same object in memory
// Only ONE instance exists throughout the application`,
    useCases: [
      'Configuration management',
      'Database connections',
      'Logger instances',
      'Cache management',
      'Application state management'
    ],
    benefits: [
      'Single point of access',
      'Controlled instantiation',
      'Reduces memory footprint',
      'Global state management',
      'Lazy initialization'
    ],
    relatedConcepts: ['Module Pattern', 'Factory Pattern', 'State Management', 'Closures']
  },

  observer: {
    title: 'Observer Pattern',
    brief: 'Observer pattern defines a one-to-many dependency where multiple observers are notified when a subject changes state. Essential for event-driven systems and reactive programming.',
    implementation: 'This demo shows an Observable that notifies all subscribers when an event occurs. Click "Notify Observers" to broadcast a message. All subscribed observers (like the UI component) receive and display the notification in real-time.',
    codeExample: `class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(callback) {
    this.observers.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback);
    };
  }
  
  notify(data) {
    // Notify all subscribers
    this.observers.forEach(observer => observer(data));
  }
}

// Using in the demo
const observable = new Observable();

// Subscribe to notifications
const unsubscribe = observable.subscribe((data) => {
  console.log('Received:', data);
  displayInUI(data); // Update UI
});

// Trigger notification - all observers get notified
observable.notify('Event 1: Action triggered');
observable.notify('Event 2: Data updated');

// Clean up when done
unsubscribe();`,
    useCases: [
      'Event handling systems',
      'Real-time data updates',
      'State management libraries (Redux, MobX)',
      'UI component updates',
      'Notification systems'
    ],
    benefits: [
      'Loose coupling between components',
      'Easy to add/remove observers',
      'Supports reactive programming',
      'Scalable event handling',
      'Promotes separation of concerns'
    ],
    relatedConcepts: ['Pub/Sub Pattern', 'Event Emitters', 'Reactive Programming', 'State Management']
  },

  factory: {
    title: 'Factory Pattern',
    brief: 'Factory pattern provides an interface for creating objects without specifying their exact class. It encapsulates object creation logic, promoting loose coupling and flexibility.',
    implementation: 'This demo uses a Factory to create different product types (A or B) without exposing creation logic. Click "Create Product A" or "Create Product B" to see the factory instantiate different objects based on the type parameter.',
    codeExample: `// Product interface
class Product {
  operation() {
    throw new Error('Must implement operation()');
  }
}

// Concrete products
class ProductA extends Product {
  operation() {
    return 'Product A: Performing operation A';
  }
}

class ProductB extends Product {
  operation() {
    return 'Product B: Performing operation B';
  }
}

// Factory
class Factory {
  static createProduct(type) {
    switch (type) {
      case 'A':
        return new ProductA();
      case 'B':
        return new ProductB();
      default:
        throw new Error('Unknown product type');
    }
  }
}

// Using in the demo
const productA = Factory.createProduct('A');
console.log(productA.operation()); // "Product A: Performing operation A"

const productB = Factory.createProduct('B');
console.log(productB.operation()); // "Product B: Performing operation B"

// Client code doesn't know about concrete classes!`,
    useCases: [
      'Creating UI components dynamically',
      'Managing different object types',
      'Plugin systems',
      'Database connection factories',
      'API client creation'
    ],
    benefits: [
      'Encapsulates object creation',
      'Reduces code duplication',
      'Easy to extend with new types',
      'Promotes loose coupling',
      'Centralized creation logic'
    ],
    relatedConcepts: ['Abstract Factory', 'Builder Pattern', 'Singleton', 'Dependency Injection']
  },

  pipeCompose: {
    title: 'Pipe & Compose',
    brief: 'Pipe and compose are functional programming techniques for combining functions. Pipe executes left-to-right, compose right-to-left. Both create clean, reusable function chains.',
    implementation: 'This demo chains three functions: double (×2), increment (+1), and square (²). Click the button to see how pipe applies them left-to-right: 5 → 10 → 11 → 121. Both pipe and compose produce the same result but with different execution order.',
    codeExample: `// Pipe (left to right)
const pipe = (...fns) => (x) =>
  fns.reduce((acc, fn) => fn(acc), x);

// Compose (right to left)
const compose = (...fns) => (x) =>
  fns.reduceRight((acc, fn) => fn(acc), x);

// Simple transformation functions
const double = (x) => x * 2;
const increment = (x) => x + 1;
const square = (x) => x * x;

// Using in the demo with input value 5
const pipeResult = pipe(double, increment, square)(5);
// Step-by-step execution:
// 5 -> double -> 10 -> increment -> 11 -> square -> 121

const composeResult = compose(square, increment, double)(5);
// Same result, different order of function application
// 5 -> double -> 10 -> increment -> 11 -> square -> 121

// Both equal 121 in this example!`,
    useCases: [
      'Data transformation pipelines',
      'Middleware chains',
      'Form validation sequences',
      'String processing',
      'API response transformations'
    ],
    benefits: [
      'Clean, readable code',
      'Easy to test individual functions',
      'Promotes reusability',
      'Declarative programming style',
      'Easy to add/remove steps'
    ],
    relatedConcepts: ['Function Composition', 'Higher-Order Functions', 'Reduce', 'Functional Programming']
  },

  es6Features: {
    title: 'ES6+ Features',
    brief: 'ES6 (ES2015) and beyond introduced major JavaScript enhancements: arrow functions, destructuring, spread/rest operators, template literals, promises, classes, modules, and more.',
    implementation: 'This demo showcases key ES6+ features in action: destructuring objects, using spread operators for arrays, template literals for string interpolation, arrow functions for concise syntax, and default parameters. Click the button to see these features in action!',
    codeExample: `// The demonstration function
const demonstrateES6 = () => {
  // Destructuring with rest operator
  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...rest } = obj;
  // rest = { b: 2, c: 3 }

  // Spread operator for arrays
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5];
  // arr2 = [1, 2, 3, 4, 5]

  // Template literals
  const name = 'Developer';
  const greeting = \`Hello, \${name}!\`;
  // greeting = "Hello, Developer!"

  // Arrow functions
  const double = (x) => x * 2;
  // Concise syntax for functions

  // Default parameters
  const greet = (name = 'Guest') => \`Hello, \${name}\`;
  // greet() returns "Hello, Guest!"

  return { 
    rest, 
    arr2, 
    greeting, 
    doubled: double(5), 
    greetResult: greet() 
  };
};

// Output:
// {
//   rest: { b: 2, c: 3 },
//   arr2: [1, 2, 3, 4, 5],
//   greeting: "Hello, Developer!",
//   doubled: 10,
//   greetResult: "Hello, Guest!"
// }`,
    useCases: [
      'Modern JavaScript development',
      'Cleaner, more maintainable code',
      'Functional programming patterns',
      'Asynchronous programming',
      'Module-based architecture'
    ],
    benefits: [
      'Improved code readability',
      'Less boilerplate code',
      'Better error handling',
      'Native module system',
      'Enhanced object manipulation',
      'Powerful array methods'
    ],
    relatedConcepts: ['Arrow Functions', 'Promises', 'Async/Await', 'Modules', 'Classes']
  },

  eventLoop: {
    title: 'JavaScript Event Loop',
    brief: 'The Event Loop is JavaScript\'s secret to handling thousands of async operations without multi-threading! It orchestrates a priority-based queue system: Call Stack executes first, then ALL Microtasks (Promises), then Event Handlers (DOM events), finally ONE Macrotask (setTimeout). This makes JavaScript single-threaded yet non-blocking - perfect for web applications.',
    implementation: 'This live visualization reveals the hidden choreography of JavaScript execution! Watch how the Event Loop continuously checks: "Is Call Stack empty? → Process ALL Microtasks → Process Event Handlers → Process ONE Macrotask → Repeat". Click any log entry to freeze and inspect the exact state of all queues at that moment. Notice how promises always jump ahead of setTimeout, even with 0ms delay - this explains many "timing bugs" developers encounter!',
    codeExample: `// ⚠️ COMMON MISTAKE: Why does this NOT print in order?
console.log('1');
setTimeout(() => console.log('2'), 0);  // 0ms delay!
Promise.resolve().then(() => console.log('3'));
console.log('4');

// OUTPUT: 1, 4, 3, 2  ← Why?!
// Event Loop Priority: Sync Code → Microtasks → Macrotasks
// Even with 0ms, setTimeout is a Macrotask (lowest priority)


// =====================================
// 🔥 FULL EVENT LOOP VISUALIZATION DEMO
// =====================================

console.log('🚀 Start');  // ← Call Stack: Runs immediately

// Register button click (Event Handler Queue)
const button = document.querySelector('#btn');
button.addEventListener('click', () => {
  console.log('🖱️ Button clicked!');
});

// setTimeout (Macrotask Queue - lowest priority)
setTimeout(() => {
  console.log('⏰ setTimeout 0ms');
  
  // Microtasks inside Macrotasks run before NEXT Macrotask
  Promise.resolve().then(() => {
    console.log('⚡ Promise in setTimeout');
  });
}, 0);

setTimeout(() => {
  console.log('⏰ setTimeout 10ms');
}, 10);

// Promises (Microtask Queue - highest async priority)
Promise.resolve()
  .then(() => {
    console.log('⚡ Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('⚡ Chained Promise');
  });

// queueMicrotask (also Microtask Queue)
queueMicrotask(() => {
  console.log('⚡ queueMicrotask');
});

console.log('🔄 Middle');  // ← Call Stack: Runs immediately

// 🖱️ User clicks button (moves to ready state in Event Handler Queue)
button.click();

Promise.resolve().then(() => {
  console.log('⚡ Promise 2');
});

console.log('🏁 End');  // ← Call Stack: Runs immediately


/* ✅ ACTUAL EXECUTION ORDER:
1. 🚀 Start              ← Call Stack (sync)
2. 🔄 Middle             ← Call Stack (sync)
3. 🏁 End                ← Call Stack (sync)
   ─────────────────────── Call Stack empty!
4. ⚡ Promise 1          ← Microtask Queue
5. ⚡ Chained Promise    ← Microtask Queue
6. ⚡ queueMicrotask     ← Microtask Queue
7. ⚡ Promise 2          ← Microtask Queue
   ─────────────────────── ALL Microtasks done!
8. 🖱️ Button clicked!    ← Event Handler Queue
   ─────────────────────── Event Handlers done!
9. ⏰ setTimeout 0ms     ← Macrotask Queue (ONE task)
10. ⚡ Promise in setTimeout ← Microtask (created by #9)
   ─────────────────────── Check queues again...
11. ⏰ setTimeout 10ms   ← Macrotask Queue (NEXT task)

🎯 KEY INSIGHTS:
• Synchronous code ALWAYS finishes first (Call Stack)
• ALL Microtasks run before ANY Macrotask
• Event Handlers run after Microtasks, before Macrotasks  
• Only ONE Macrotask per Event Loop cycle
• Microtasks created during Macrotask execution run immediately

📊 PRIORITY ORDER (High → Low):
   Call Stack → Microtasks → Event Handlers → Macrotasks
*/

// 📚 CALL STACK DEMO (LIFO - Last In, First Out)
function firstFunction() {
  console.log('1. firstFunction() - Added to Call Stack');
  secondFunction();
  console.log('5. firstFunction() - Resumed after secondFunction()');
}

function secondFunction() {
  console.log('2. secondFunction() - Added to Call Stack');
  thirdFunction();
  console.log('4. secondFunction() - Resumed after thirdFunction()');
}

function thirdFunction() {
  console.log('3. thirdFunction() - Executed and Removed');
}

console.log('0. Start - Global Execution Context');
firstFunction();
console.log('6. End - All functions completed');

/* CALL STACK EXECUTION:
Stack grows: [] → [firstFunction] → [firstFunction, secondFunction] 
             → [firstFunction, secondFunction, thirdFunction]
Stack shrinks: [firstFunction, secondFunction] → [firstFunction] → []
*/

// ⚡ MICROTASK vs MACROTASK PRIORITY DEMO
console.log('1. Sync: Start');

setTimeout(() => {
  console.log('5. Macrotask: setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask: Promise 1');
});

queueMicrotask(() => {
  console.log('4. Microtask: queueMicrotask');
});

console.log('2. Sync: End');

/* OUTPUT ORDER:
1. Sync: Start
2. Sync: End
3. Microtask: Promise 1
4. Microtask: queueMicrotask
5. Macrotask: setTimeout

KEY INSIGHT: Microtasks ALWAYS execute before Macrotasks,
even when setTimeout has 0ms delay!

Event Loop Cycle:
1. Execute ALL synchronous code (Call Stack empty)
2. Process ALL Microtasks (Promise, queueMicrotask)
3. Process ONE Macrotask (setTimeout, setInterval)
4. Repeat from step 2
*/`,
    useCases: [
      'Debugging "timing bugs" where code runs in unexpected order',
      'Understanding why setTimeout(fn, 0) doesn\'t run immediately',
      'Optimizing React renders with queueMicrotask for batching',
      'Building robust async workflows (API calls, data processing)',
      'Implementing task schedulers and background job queues',
      'Creating smooth animations without blocking user input',
      'Understanding frameworks like React, Vue (they leverage Microtasks!)'
    ],
    benefits: [
      'Non-blocking I/O - UI stays responsive during heavy operations',
      'Predictable execution order once you know the priority rules',
      'Single-threaded = no race conditions or deadlocks to debug',
      'Efficient for I/O-bound tasks (better than multi-threading)',
      'Enables building real-time apps (chat, notifications, live updates)',
      'Foundation for modern async/await patterns and Promises'
    ],
    relatedConcepts: ['Promises', 'Async/Await', 'Callbacks', 'setTimeout', 'setInterval', 'Web APIs', 'queueMicrotask']
  },
};

// Helper function to get concept details
export function getConceptDetails(key: string): ConceptDetails | undefined {
  return conceptDetailsLibrary[key];
}

// Helper to get all available concept keys
export function getAllConceptKeys(): string[] {
  return Object.keys(conceptDetailsLibrary);
}
