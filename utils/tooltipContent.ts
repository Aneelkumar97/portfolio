// Tooltip Content Library
// Centralized descriptions for all concepts used throughout the portfolio

export const tooltipContent = {
  // React Hooks
  hooks: {
    useState: "useState is a Hook that lets you add state to functional components. It returns the current state and a function to update it. State updates trigger re-renders, making your UI reactive to user interactions.",
    useEffect: "useEffect handles side effects in functional components - data fetching, subscriptions, DOM manipulation, etc. The dependency array controls when effects run, and cleanup functions prevent memory leaks.",
    useContext: "useContext lets you read and subscribe to context from your component. It eliminates prop drilling by providing a way to share values across the component tree without passing props manually.",
    useReducer: "useReducer is an alternative to useState for complex state logic. It uses a reducer function to manage state transitions, similar to Redux. Best for state with multiple sub-values or complex update logic.",
    useMemo: "useMemo caches the result of expensive calculations between re-renders. It only recalculates when dependencies change, improving performance by avoiding unnecessary computations.",
    useCallback: "useCallback returns a memoized callback function. It prevents function recreation on every render, which is crucial when passing callbacks to optimized child components that rely on reference equality.",
    useRef: "useRef returns a mutable ref object that persists across renders without causing re-renders. Commonly used for accessing DOM elements directly or storing values that shouldn't trigger updates.",
    useImperativeHandle: "useImperativeHandle customizes the instance value exposed when using ref with forwardRef. It allows parent components to call specific methods on child components imperatively.",
    useLayoutEffect: "useLayoutEffect fires synchronously after DOM mutations but before the browser paints. Use it when you need to read layout or perform DOM mutations that users shouldn't see.",
    useTransition: "useTransition marks state updates as non-urgent transitions. It keeps the UI responsive during expensive updates by allowing React to interrupt rendering, prioritizing user interactions over heavy computations.",
    useDeferredValue: "useDeferredValue defers updating a value until more urgent updates are processed. It helps keep input responsive while rendering expensive lists or heavy components by allowing React to prioritize user input.",
    useId: "useId generates unique IDs that are stable across server and client rendering. Perfect for accessibility attributes like aria-describedby without causing hydration mismatches.",
  },

  // Custom Hooks
  customHooks: {
    useDebounce: "useDebounce delays updating a value until after a specified time has passed since the last change. Perfect for search inputs - reduces API calls by waiting for the user to stop typing.",
    useThrottle: "useThrottle limits how often a value updates by ensuring it only changes at most once per specified interval. Ideal for scroll handlers and resize events to improve performance.",
    useLocalStorage: "useLocalStorage syncs state with browser's localStorage. Data persists across page refreshes and browser sessions, perfect for user preferences, form data, or any state that should survive page reloads.",
    useIntersectionObserver: "useIntersectionObserver tracks when elements enter or leave the viewport. Essential for lazy loading images, infinite scroll, animations on scroll, and performance optimization.",
    useMediaQuery: "useMediaQuery responds to CSS media queries in JavaScript. Enables responsive behavior based on screen size, color scheme preference, or other media features. Updates automatically when conditions change.",
    useEventListener: "useEventListener adds event listeners declaratively with automatic cleanup. Handles edge cases like component unmounting and changing handlers, making event management safer and easier.",
    useOnClickOutside: "useOnClickOutside detects clicks outside a referenced element. Common for closing dropdowns, modals, and popups when users click elsewhere. Improves UX by providing intuitive dismissal behavior.",
    usePrevious: "usePrevious stores the previous value of a prop or state. Useful for comparing current vs previous values, animations, or implementing undo functionality.",
    useToggle: "useToggle simplifies boolean state management by providing a clean toggle function. Eliminates the need to write (prev => !prev) repeatedly - common for modals, dropdowns, and visibility toggles.",
  },

  // Advanced Patterns
  patterns: {
    errorBoundaries: "Error Boundaries are class components that catch JavaScript errors in their child component tree. They provide graceful error handling, displaying fallback UI instead of crashing the entire app. Essential for production apps.",
    suspense: "Suspense lets components 'wait' for something before rendering. Combined with React.lazy, it enables code-splitting by loading components dynamically. Shows fallback UI during loading, improving initial page load times.",
    reactLazy: "React.lazy enables dynamic imports for code-splitting. Components are loaded only when needed, reducing initial bundle size. Must be wrapped in Suspense to show loading state.",
    reactMemo: "React.memo is a higher-order component that prevents re-renders when props haven't changed. It performs shallow comparison of props and skips rendering if they're the same, improving performance.",
    portals: "Portals let you render children into a DOM node outside the parent component's hierarchy. Perfect for modals, tooltips, and overlays that need to break out of overflow:hidden or z-index stacking contexts.",
    hoc: "HOC is a function that takes a component and returns a new enhanced component. It's used for cross-cutting concerns like authentication, logging, or error handling. Think of it as wrapping components with additional functionality.",
    renderProps: "Render Props is a technique for sharing code where a component receives a function as a prop that returns React elements. It provides flexibility in deciding what to render while keeping logic reusable.",
    compoundComponents: "Compound Components work together as a group, sharing implicit state through context. Like HTML's select and option tags, they provide a flexible and expressive API. Great for complex UI components like tabs, accordions, or dropdowns.",
    controlledComponents: "Controlled components have their form data controlled by React state. Every change goes through state, giving you full control over the input value. Perfect for validation, formatting, or conditional logic.",
    uncontrolledComponents: "Uncontrolled components store their data in the DOM itself, not React state. You access values using refs when needed. Simpler for basic forms but offers less control than controlled components.",
    forwardRef: "forwardRef passes refs to child components. useImperativeHandle customizes the ref value exposed to parent, allowing you to expose specific methods while keeping internal state private. Great for reusable input libraries.",
  },

  // JavaScript Concepts
  javascript: {
    callStack: "Call Stack is a LIFO (Last In, First Out) data structure that tracks function execution. When a function is called, it's pushed onto the stack; when it returns, it's popped off. JavaScript is single-threaded, so only one function executes at a time. The stack grows with nested function calls and shrinks as they complete.",
    microtaskQueue: "Microtask Queue (Job Queue) holds high-priority async tasks like Promise callbacks, queueMicrotask, and MutationObserver. After each task from the Call Stack completes, ALL microtasks are processed before moving to the next macrotask. This ensures promises resolve as soon as possible, making them faster than setTimeout.",
    eventHandlerQueue: "Event Handler Queue holds user interaction callbacks like click, scroll, keyboard events. These are processed as macrotasks. When an event fires (e.g., button click), its handler is queued and executed when the Call Stack is empty and all microtasks are processed. Essential for responsive user interfaces.",
    macrotaskQueue: "Macrotask Queue (Task Queue) holds lower-priority async operations like setTimeout, setInterval, I/O operations, and UI rendering. The Event Loop processes ONE macrotask at a time, then checks microtasks. This prioritization ensures UI stays responsive while handling background tasks efficiently.",
    closures: "Closures are functions that remember variables from their outer scope even after that scope has closed. They enable data privacy and function factories. Essential for creating private variables in JavaScript.",
    currying: "Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. It enables partial application and creates specialized functions from general ones.",
    memoization: "Memoization caches function results based on input arguments. If called again with same inputs, it returns the cached result instead of recalculating. Dramatically improves performance for expensive computations.",
    debounce: "Debounce delays function execution until after a wait period since the last call. Perfect for search inputs - instead of calling API on every keystroke, wait until user stops typing. Reduces unnecessary operations.",
    throttle: "Throttle ensures a function executes at most once per specified time period, regardless of how many times it's called. Ideal for scroll or resize handlers. Unlike debounce, it executes immediately then blocks further calls.",
    generators: "Generators are functions that can pause execution and resume later using yield. They enable lazy evaluation, infinite sequences, and cooperative multitasking. Perfect for iterating over large datasets efficiently.",
    iterators: "Iterators define how to iterate over custom objects using the iteration protocol. They implement a next() method returning {value, done}. Enables for...of loops on custom data structures.",
    promises: "Promises represent eventual completion of async operations. Async/await is syntactic sugar making promise-based code look synchronous. Essential for API calls, file operations, and any asynchronous JavaScript.",
    singleton: "Singleton pattern ensures a class has only one instance and provides global access to it. Useful for managing shared resources like database connections, configuration, or logging services.",
    observer: "Observer pattern establishes one-to-many relationship where observers subscribe to a subject and get notified of changes. Foundation of event systems, reactive programming, and state management (like Redux).",
    factory: "Factory pattern creates objects without specifying their exact class. It encapsulates object creation logic, making code more flexible and easier to maintain. Used extensively in frameworks and libraries.",
    proxy: "Proxy wraps objects to intercept and customize operations like property access, assignment, enumeration. Powers Vue's reactivity, validation, logging, and performance monitoring.",
    reflect: "Reflect provides methods for interceptable JavaScript operations. Works with Proxy to perform default behavior. Makes meta-programming more readable and provides better error handling.",
    symbols: "Symbols are unique, immutable primitive values used as object property keys. They prevent name collisions and enable creating private object properties. Essential for defining protocols and hidden properties.",
    mapSet: "Map stores key-value pairs with any type as key (unlike objects). Set stores unique values. Both offer better performance for large collections and useful methods like has(), delete(). Essential for efficient data management.",
    weakMapSet: "WeakMap/WeakSet hold weak references to objects, allowing them to be garbage collected. Perfect for storing metadata about objects without preventing cleanup. Commonly used in caching and private data patterns.",
    pipe: "Pipe executes functions left-to-right, compose right-to-left. Both enable function composition for clean, readable data transformations. Core to functional programming - build complex operations from simple functions.",
    es6Plus: "ES6+ introduced arrow functions, destructuring, spread/rest operators, template literals, classes, modules, and more. These features make JavaScript more expressive, concise, and powerful for modern development.",
  },

  // Performance & Optimization
  performance: {
    codeSplitting: "Divides bundles into smaller chunks loaded on demand, improving initial load time. Users only download code they need, when they need it.",
    lazyLoading: "Defer loading of components/resources until needed. Images load as they enter viewport, routes load when navigated to. Dramatically improves perceived performance.",
    virtualization: "Virtual scrolling renders only visible items in large lists/grids by calculating which items are in viewport. Instead of 10,000 DOM nodes, render only 10-15 visible ones. Reduces memory by 99%+ and prevents UI freezing. Essential for data tables, feeds, and any list with hundreds of items. Libraries like react-virtualized implement this pattern efficiently.",
    virtualList: "Virtual lists render only visible items in the scrollable container plus a small buffer for smooth scrolling. As you scroll, items are dynamically added/removed from DOM while maintaining the illusion of a complete list. Handles lists with millions of items without performance degradation.",
    virtualGrid: "Virtual grids extend virtualization to 2D layouts, rendering only visible cells in both directions. Perfect for image galleries, data tables, or any grid with many items. Calculates visible rows/columns based on scroll position and container dimensions.",
    optimisticUpdates: "Update UI immediately before server confirmation for snappy user experience. Rollback if server rejects. Makes apps feel instant even with slow networks.",
    caching: "Store data to reduce redundant network requests and improve performance. Can be memory cache, localStorage, or service workers. Balance freshness with speed.",
    imageOptimization: "Compress, resize, and lazy-load images for faster page loads. Use modern formats (WebP, AVIF), responsive images, and blur-up placeholders.",
  },

  // Architecture & Patterns
  architecture: {
    ssr: "Server-Side Rendering generates HTML on server for better SEO and initial load performance. Next.js makes this easy with automatic optimization.",
    serverComponents: "React components that render on the server, reducing client bundle size. Zero JavaScript sent for static content, improving performance and SEO.",
    contextAPI: "Global state management without external libraries. Provides data to components without prop drilling. Perfect for themes, user data, and app-wide state.",
    websockets: "Real-time bidirectional communication between client and server for live updates. Essential for chat, notifications, collaborative editing, and live data.",
    dnd: "Drag and Drop functionality for intuitive UI interactions. Libraries like react-beautiful-dnd or dnd-kit provide smooth, accessible drag experiences.",
    infiniteScroll: "Automatically load more content as user scrolls, improving UX for long lists. Detect scroll position and fetch next page when near bottom.",
    videoAPIs: "Browser APIs for controlling video playback, quality, and streaming. Handle formats, subtitles, quality switching, and custom controls.",
  }
};

// Helper function to get tooltip content by key
export function getTooltip(category: keyof typeof tooltipContent, key: string): string {
  const categoryContent = tooltipContent[category];
  if (categoryContent && key in categoryContent) {
    return (categoryContent as any)[key];
  }
  return "Learn more about this concept by exploring the interactive demo!";
}
